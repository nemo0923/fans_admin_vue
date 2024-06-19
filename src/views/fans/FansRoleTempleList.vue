<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="roleTempleName">
              <template #label><span title="人设名称">人设名称</span></template>
              <a-input placeholder="请输入" v-model:value="queryParam.roleTempleName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="6">
            <a-form-item name="country">
              <template #label><span title="国家">国家</span></template>
              <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.country" dictCode="country"/>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
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
                <a-button  type="primary" @click="handleAddAI" preIcon="ant-design:plus-outlined"> AI生成新人设</a-button>
        <!--
        <a-button type="primary" style="margin-left:20px" @click="handleAdd" preIcon="ant-design:plus-outlined"> 人工录入新人设</a-button>
        -->

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
        
        </template>
    </BasicTable>
    <!-- 表单区域 -->
    <FansRoleTempleModal ref="registerModal" @success="handleSuccess"></FansRoleTempleModal>
    <FansRoleTempleModalAI ref="registerModalAI" @success="handleSuccess"></FansRoleTempleModalAI>
  </div>
</template>

<script lang="ts" name="content-fansRoleTemple" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './FansRoleTemple.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './FansRoleTemple.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansRoleTempleModal from './components/FansRoleTempleModal.vue'
    import FansRoleTempleModalAI from './components/FansRoleTempleModalAI.vue'
  import { useUserStore } from '/@/store/modules/user';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const registerModalAI = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '人设模版',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
        width: 150,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        let o= Object.assign(params, queryParam);
        if(params.roleTempleName){
            o.roleTempleName='*'+params.roleTempleName+'*'
        }
        return o
      },
    },
    exportConfig: {
      name: "人设模版",
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
  function handleAddAI() {
    registerModalAI.value.disableSubmit = false;
    registerModalAI.value.add();
  }
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
   function handleEditAI(record: Recordable) {
    registerModalAI.value.disableSubmit = false;
    registerModalAI.value.edit(record);
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    registerModal.value.disableSubmit = true;
    registerModal.value.edit(record);
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
        label: 'AI重生人设',
        onClick: handleEditAI.bind(null, record),
      },
  
      {
        label: '人工完善',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      
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
