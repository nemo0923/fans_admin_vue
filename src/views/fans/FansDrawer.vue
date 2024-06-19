<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    :width="700"
    :showFooter="false"
    destroyOnClose
  >
   <BasicTable
      @register="registerTable"
      :canResize="false"
      :loading="loading"
      :striped="true"
      :bordered="false"
      :showTableSetting="false"
    >
    <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <template v-slot:bodyCell="{ column, record, index, text }">
        <div v-if="column.key === 'fansNickname' ">
        <Avatar :size="30" :src="getFileAccessHttpUrl(record.fansProfile)" />
        <template v-if="column.dataIndex==='fansNickname'">
            <a style="margin-left:10px" :href="record.fansLink" target="_blank" v-text="record.fansNickname"></a>
        </template>
        </div>
        <div v-if="column.dataIndex === 'joinWay' ">
         <span v-text="record.fansStatus_dictText"/>
         <span style="margin-left:10px" v-text="record.joinWay_dictText"/>
        </div>
        <div v-if="column.dataIndex === 'msgNum' ">
         <span  v-if="record.undealMsgNum>0" style="color:red" v-text="record.msgNum"/>
          <span v-else  v-text="record.msgNum"/>
        </div>
      </template>
    </BasicTable>
       <FansMsgBoxModal ref="registerModal" @success="handleSuccess"></FansMsgBoxModal>
  </BasicDrawer>
</template>
<script lang="ts" setup>
import { defineComponent, ref, computed, unref, useAttrs } from 'vue';
 import { Tag, Avatar } from 'ant-design-vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
 import { BasicTable, useTable, TableAction } from '/@/components/Table';
   import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
import { columns } from './FansList.data';
import {addFriend,list } from './FansList.api';
  import FansMsgBoxModal from './components/FansMsgBoxModal.vue'

const loading = ref(false);
const pagination = ref<any>(false);
const emit = defineEmits(['success', 'register']);
const attrs = useAttrs();
const account = ref();

const searchInfo = { username: '' };

const registerModal = ref();

const [registerTable, { reload }] = useTable({
        api: list,
        columns:columns,
        pagination: { pageSize: 10 },
        searchInfo:searchInfo,
        showActionColumn:false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, showFooter:false});
    loading.value = true;
    account.value = data.record;
    searchInfo.username = account.value.username;
    //reload();
  });
   const getTitle = computed(() => (unref(account) ? account.value.name+"的好友列表" : '好友列表'));
   
  function handleMsg(record: Recordable) {
    registerModal.value.handleMsg(record,account);
  }
  async function handleAddFriend(record: Recordable) {
    await addFriend(record, handleSuccess,handleFail);
  }
  function handleSuccess() {
    reload();
  }
   function handleFail() {
   reload();
  }
   function getTableAction(record) {
    return [
      {
          label: '加好友',
          ifShow:record.fansStatus!='friend' && record.fansStatus!='toFriend',
          popConfirm: {
          title: '是否发送加好友请求',
          confirm: handleAddFriend.bind(null, record),
          placement: 'topLeft',
        },
         },
     {
           label: '私信',
          onClick: handleMsg.bind(null, record),
         },
        
    ];
  }
</script>