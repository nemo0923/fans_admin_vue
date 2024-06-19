<template>
  <div class="p-2">
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="6">
            <a-form-item name="searchUrl">
              <template #label><span title="搜粉计划">搜粉计划</span></template>
              <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.searchUrl" dictCode="fans_search,name,url"/>
            </a-form-item>
          </a-col>
          <a-col :lg="3">
            <a-form-item name="cg">
              <template #label><span title="客群">客群</span></template>
              <j-dict-select-tag placeholder="请选择" v-model:value="queryParam.cg" dictCode="cg"/>
            </a-form-item>
          </a-col>
         <!--
            <a-col :lg="6">
              <a-form-item name="name">
                <template #label><span title="姓名">姓名</span></template>
                <a-input placeholder="请输入姓名" v-model:value="queryParam.name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item>
                 <template #label><span title="采集时间">采集时间</span></template>
                 <div style="display: flex">
                   <a-form-item name="crawtime_begin" style="margin-bottom: 0;">
                     <a-date-picker showTime value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" v-model:value="queryParam.crawtime_begin" class="query-group-cust" />
                   </a-form-item>
                   <span class="query-group-split-cust">~</span>
                   <a-form-item name="crawtime_end" style="margin-bottom: 0;">
                     <a-date-picker showTime value-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" v-model:value="queryParam.crawtime_end" class="query-group-cust" />
                   </a-form-item>
                 </div>
              </a-form-item>
            </a-col>
            <a-col :lg="6">
              <a-form-item name="searchState">
                <template #label><span title="状态">状态</span></template>
                <j-dict-select-tag placeholder="请选择状态" v-model:value="queryParam.searchState" dictCode="search_state"/>
              </a-form-item>
            </a-col>
         -->
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="6">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button type="primary" preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                
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
              <a-radio-group @change="reload" v-model:value="searchState" button-style="solid" :style="{ marginBottom: '0px'}">
      <a-radio-button value="init">待筛选</a-radio-button>
      <a-radio-button value="ready">已确认</a-radio-button>
      <a-radio-button value="out">已淘汰</a-radio-button>
      <a-radio-button value="f0">正在加粉</a-radio-button>
      <a-radio-button value="f1">已加粉</a-radio-button>
      <a-radio-button value="">全部</a-radio-button>
    </a-radio-group>
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
        <Avatar v-if="column.dataIndex==='name'" :size="100" :src="record.profile" />
        <template v-if="column.dataIndex==='name'">
            <a style="margin-left:10px" :href="record.link" target="_blank" v-text="record.name"></a>
        </template>
        <template v-if="column.dataIndex==='info'">
            <div v-html="record.info"></div>
        </template>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <FansLibModal ref="registerModal" @success="handleSuccess"></FansLibModal>
  </div>
</template>

<script lang="ts" name="market-fansLib" setup>
  import { ref, reactive } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useListPage } from '/@/hooks/system/useListPage';
    import { Tag, Avatar } from 'ant-design-vue';
  import { columns, superQuerySchema } from './FansLib.data';
  import { list,changeSearchState, deleteOne, batchDelete, getImportUrl, getExportUrl } from './FansLib.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansLibModal from './components/FansLibModal.vue'
  import { useUserStore } from '/@/store/modules/user';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';

  const formRef = ref();
  const searchState=ref('init');
  const queryParam = reactive<any>({});
  const toggleSearchStatus = ref<boolean>(false);
  const registerModal = ref();
  const userStore = useUserStore();
  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '搜粉名单',
      api: list,
      columns,
      canResize:false,
      useSearchForm: false,
      showActionColumn:true,
      searchInfo:{searchState:searchState},
      actionColumn: {
        width: 60,
        fixed: 'right',
      },
      beforeFetch: (params) => {
        return Object.assign(params, queryParam);
      },
    },
    exportConfig: {
      name: "搜粉确认",
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
   async function handleChangeSearchState(record,newState) {
    await changeSearchState({ id: record.id,searchState: newState }, handleSuccess);
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '确认',
        onClick: handleChangeSearchState.bind(null, record,'ready'),
        ifShow:record.searchState=='init'
      },
       {
        label: '淘汰',
        onClick: handleChangeSearchState.bind(null, record,'out'),
         ifShow:record.searchState=='init'
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
