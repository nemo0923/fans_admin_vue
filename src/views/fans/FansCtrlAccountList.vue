<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          
          <a-col :lg="4">
            <a-form-item name="username">
              <template #label><span title="登录账号">账号</span></template>
              <a-input placeholder="请输入" v-model:value="queryParam.username"></a-input>
            </a-form-item>
          </a-col>
         
            <a-col :lg="4">
              <a-form-item name="roleTempleId">
                <template #label><span title="关联人设">人设</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.roleTempleId" dictCode="fans_role_temple,role_temple_name,id"/>
              </a-form-item>
            </a-col>
             
            
            <a-col :lg="4">
              <a-form-item name="onlineStatus">
                <template #label><span title="在线状态">状态</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.onlineStatus" dictCode="online_status"/>
              </a-form-item>
            </a-col>
          <a-col :lg="6">
              <a-form-item name="proxyId">
                <template #label><span title="IP代理">代理</span></template>
                <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.proxyId" dictCode="fans_proxy,proxy_name,id"/>
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
         <a-button type="primary" @click="handleAddBatch" preIcon="ant-design:plus-outlined">批量导入账号</a-button>
    <!--
    <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 登记养号信息</a-button>
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
        <TableAction :actions="getTableAction(record)" more="互动"  :dropDownActions="getDropDownAction(record)"/>
      </template>
       <template v-slot:bodyCell="{ column, record, index, text }">
   
        <Avatar v-if="column.dataIndex==='name'" :size="30" :src="getFileAccessHttpUrl(record.profile)" />
        <template v-if="column.dataIndex==='name'">
            <a style="margin-left:10px" :href="record.link" target="_blank" v-text="record.name"></a>
  
            <span style="margin-left:10px" v-text="record.country_dictText"/>
            <span style="margin-left:10px" v-text="record.roleTempleId_dictText"/>
        </template>
        <template v-if="column.dataIndex==='activetime'">
            <span v-if="record.undealMsgNum>0" style="color:red" v-text="record.activetime"/>
            <span v-else  v-text="record.activetime"/>
        </template>
       
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <FansCtrlAccountModal ref="registerModal" @success="handleSuccess"></FansCtrlAccountModal>
    <FansCtrlAccountModalBatch ref="registerModalBatch" @success="handleSuccess"></FansCtrlAccountModalBatch>
    <FansCtrlAccountModalRole ref="registerModalRole" @success="handleSuccess"></FansCtrlAccountModalRole>
    <FansCtrlAccountModalErr ref="registerModalErr" @success="handleSuccess"></FansCtrlAccountModalErr>
    <FansDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" name="interact-fansCtrlAccount" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Tag, Avatar } from 'ant-design-vue';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
  import { useListPage } from '/@/hooks/system/useListPage';
  import { columns, superQuerySchema } from './FansCtrlAccount.data';

  import { list, deleteOne, updateAds1,batchDelete, getImportUrl, getExportUrl } from './FansCtrlAccount.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansCtrlAccountModal from './components/FansCtrlAccountModal.vue'
  import FansCtrlAccountModalBatch from './components/FansCtrlAccountModalBatch.vue'
  import FansCtrlAccountModalRole from './components/FansCtrlAccountModalRole.vue'
   import FansCtrlAccountModalErr from './components/FansCtrlAccountModalErr.vue'
  import FansDrawer from './FansDrawer.vue'
  
  import { useUserStore } from '/@/store/modules/user';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
 import { useDrawer } from '/@/components/Drawer';

const [registerDrawer, { openDrawer }] = useDrawer();
  const formRef = ref();
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const registerModalRole = ref();
  const registerModalBatch = ref();
  const registerModalErr = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '平台账号',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      actionColumn: {
         width: 120,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        let o= Object.assign(params, queryParam);
        if(params.username){
            o.username='*'+params.username+'*'
        }
        return o
      },
    },
    exportConfig: {
      name: "平台账号",
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
   function handleAddBatch() {
    registerModalBatch.value.disableSubmit = false;
    registerModalBatch.value.add();
  }
  
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
  function handleEditRole(record: Recordable) {
    registerModalRole.value.disableSubmit = false;
    registerModalRole.value.edit(record);
  }
  function handleErr(record: Recordable) {
    registerModalErr.value.disableSubmit = false;
    registerModalErr.value.edit(record);
  }
  
   function handleFans(record: Recordable) {
    openDrawer(true, {
      record
    });
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
   async function handleAds1(record) {
    await updateAds1({ id: record.id }, handleSuccess);
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
           label: '个性配置',
           onClick: handleEdit.bind(null, record),
           ifShow:record.onlineStatus=='ok',
           
         },
         {
           label: '异常处理',
           onClick: handleErr.bind(null, record),
           ifShow:record.onlineStatus=='error' && record.accountErr==null,
           
         },
         {
           label: '好友',
           onClick: handleFans.bind(null, record),
           ifShow:record.mountState=='ok',
         },
           {
           label: '确认ADS调整完毕',
           ifShow:record.mountState=='un_ads1',
           popConfirm: {
            title: '是否确认ADS已调整完毕',
            confirm: handleAds1.bind(null, record),
            placement: 'topLeft',
        }
         },
         /*
         {
           label: '人设详情',
           onClick: handleEditRole.bind(null, record),
         }
         */
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
