<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
           <a-col :lg="4">
            <a-form-item name="title">
              <template #label><span title="标题">标题</span></template>
              <a-input placeholder="请输入" v-model:value="queryParam.title"></a-input>
            </a-form-item>
          </a-col>
          
            <a-col :lg="4">
              <a-form-item name="roleTempleId">
                <template #label><span title="人设">人设</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.roleId" dictCode="fans_role_temple,role_temple_name,id"/>
              </a-form-item>
            </a-col>
            <a-col :lg="3">
              <a-form-item name="onlineStatus">
                <template #label><span title="状态">状态</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.isFinish" dictCode="yn"/>
              </a-form-item>
            </a-col>
             <a-col :lg="8">
            <a-form-item name="fansCtrlNodeId" >
              <template #label><span title="帖子标签">帖子标签</span></template>
              <j-select-multiple placeholder="请选择" v-model:value="queryParam.features" dictCode="fans_aigc_feature where scene like '%帖%' or scene like '%文%',tag_name,tag_name"/>
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
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> AI生成新帖子</a-button>
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
        <template v-if="column.dataIndex==='features'">
          <div>{{makeSimpleFeatures(record.features)}}</div>
        </template>
        <template v-if="column.dataIndex==='imgPath'">
          <span v-if="record.imgPath!=null && record.imgPath!=''" >有图</span>
        </template>
       
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <FansPostModal ref="registerModal" @success="handleSuccess"></FansPostModal>
  </div>
</template>

<script lang="ts" name="content-fansPost" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './FansPost.data';
  import { list, finishOne,unFinishOne,deleteOne, batchDelete, getImportUrl, getExportUrl } from './FansPost.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansPostModal from './components/FansPostModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { isEmpty, isArray } from '/@/utils/is';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '帖子库',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 110,
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
      name: "帖子库",
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
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
   
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
  }
  //完成修改
  async function handleFinsh(record: Recordable) {
    await finishOne({ id: record.id }, handleSuccess);
  }
  //重新修改
  async function handleUnFinsh(record: Recordable) {
    await unFinishOne({ id: record.id }, handleSuccess);
  }
  
  function makeSimpleFeatures(features){
    if(features==null || features==''){
      return ''
    }
    let str=''
    let obj = eval('(' + features + ')')
      if(isArray(obj)){
         for(var i=0;i<obj.length;i++){
            str=str+' '+obj[i].tagName
         }
      }
      return str
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, handleSuccess);
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
        label: '修改',
        onClick: handleEdit.bind(null, record),
        ifShow:record.isFinish==0
      },
     
      {
        label: '生效',
        popConfirm: {
          title: '生效后，经过自动换脸，帖子将陆续进入待发布（可调整）状态，是否确认？',
          confirm: handleFinsh.bind(null, record),
          placement: 'topLeft',
        },
         ifShow:record.isFinish==0
      },
      /*
       {
        label: '确认重新调整',
        popConfirm: {
          title: '是否确认重新调整',
          confirm: handleUnFinsh.bind(null, record),
          placement: 'topLeft',
        },
         ifShow:record.isFinish==1
      },
     */
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
       {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        }
      }
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
     queryParam.title=null
     queryParam.isFinish=null
     queryParam.roleId=null
    queryParam.features=null
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
