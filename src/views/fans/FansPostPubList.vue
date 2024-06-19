<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
           <a-col :lg="5">
            <a-form-item name="username">
              <template #label><span title="帖子标题">帖子标题</span></template>
              <a-input placeholder="请输入" v-model:value="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
            <a-col :lg="5">
              <a-form-item name="roleTempleId">
                <template #label><span title="关联人设">关联人设</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.roleId" dictCode="fans_role_temple,role_temple_name,id"/>
              </a-form-item>
            </a-col>
            <a-col :lg="5">
              <a-form-item name="onlineStatus">
                <template #label><span title="发布状态">发布状态</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.isPublish" dictCode="yn"/>
              </a-form-item>
            </a-col>
             <a-col :lg="4">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="4">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button  preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
        <template v-if="column.dataIndex==='imgPath'">
          <span v-if="record.imgPath!=null && record.imgPath!=''" >有图</span>
        </template>
          <Avatar v-if="column.dataIndex==='roleId'" :size="30" :src="getFileAccessHttpUrl(record.profile)" />
        <template v-if="column.dataIndex==='roleId'">
                 <a style="margin-left:10px" :href="record.link" target="_blank" v-text="record.name"></a>
  
            <span style="margin-left:10px" v-text="record.roleId_dictText"/>
        </template>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <FansPostPubModal ref="registerModal" @success="handleSuccess"></FansPostPubModal>
    <FansPostModifyModal ref="registerModifyModal" @success="handleSuccess"></FansPostModifyModal>
    
  </div>
</template>

<script lang="ts" name="content-fansPostPub" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './FansPostPub.data';
  import { list,publishOne, deleteOne, batchDelete, getImportUrl, getExportUrl } from './FansPostPub.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansPostPubModal from './components/FansPostPubModal.vue'
   import FansPostModifyModal from './components/FansPostModifyModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
  import { Tag, Avatar } from 'ant-design-vue';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
   const registerModifyModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '帖子发布',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 135,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        let o= Object.assign(params, queryParam);
        if(params.title){
            o.title='*'+params.title+'*'
        }
        return o
      },
    },
    exportConfig: {
      name: "帖子发布",
      url: getExportUrl,
      params: queryParam,
    },
	  importConfig: {
	    url: getImportUrl,
	    success: handleSuccess
	  },
  });
  const [registerTable, { reload, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource }, { rowSelection, selectedRowKeys }] = tableContext;
  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    searchQuery();
  }

  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }
  
  /**
   * 修改帖子
   */
  function handleModify(record: Recordable) {
    registerModifyModal.value.disableSubmit = false;
    registerModifyModal.value.edit(record);
  }
   
  /**
   * 发布预览信息
   */
  function handleDetail(record: Recordable) {
    registerModifyModal.value.disableSubmit = true;
    registerModifyModal.value.edit(record);
  }
  /**
   * 查看发布平台帖子链接信息
   */
  function handleSee(record: Recordable) {
    window.open(record.postUrl, '_blank');
  }
   
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
  }
   async function handlePublish(record) {
    await publishOne({ id: record.id }, handleSuccess,handleFail);
  }
   
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
  }
   
  /**
   * 成功回调
   */
  function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }
   function handleFail() {
    (selectedRowKeys.value = []) && reload();
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
        {
        label: '预览',
        onClick: handleDetail.bind(null, record),
      },
       {
        label: '内容调整',
        onClick: handleModify.bind(null, record),
        ifShow:record.isPublish=='none' || record.isPublish=='error'
      },
      
      {
        label: '确认发布',
          popConfirm: {
          title: '是否确认发布',
          confirm: handlePublish.bind(null, record),
          placement: 'topLeft',
        },
        ifShow:record.isPublish=='none' || record.isPublish=='error'
      },
       {
        label: '官网链接',
        onClick: handleSee.bind(null, record),
        ifShow:record.isPublish=='ok'
      },
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      /*
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        }
      }
      */
    ]
  }

  /**
   * 查询
   */
  function searchQuery() {
    reload();
  }
  
  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    selectedRowKeys.value = [];
    //刷新数据
    reload();
  }
  



</script>

<style lang="less" scoped>
  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
  }
</style>
