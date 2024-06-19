<template>
  <a-modal :maskClosable="false" :title="title" :width="width" :height="height" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': true } }" @cancel="handleCancel" cancelText="关闭">
  
    <div class="scroll-wrap">
      <ScrollContainer ref="scrollContainer" class="mt-4">
        <ul class="p-3">
          <template v-for="item in msgList" :key="item.id">
            <li v-if="item.isFans==1" class="p-2" >
              <p>{{ item.msgTime}}</p>
              <p><Avatar :size="30" :src="getFileAccessHttpUrl(fansProfile)"/>:{{ item.msg}}</p>
            </li>
            <li v-else class="p-2" style="text-align:right">
              <p>{{ item.msgTime}}</p>
              <p><Avatar :size="30" :src="getFileAccessHttpUrl(profile)"/>:{{ item.msg}}</p>
            </li>
          </template>
        </ul>
      </ScrollContainer>
    </div>
          <a-divider style="margin:2px" />
    <div class="sendmsg">
    <a-card size="small" title="发私信" :bordered="false" >
      <a-row>
        <a-col :span="19">
           <a-textarea v-model:value="currMsg" :rows="3" placeholder="请输入" />
        </a-col>
        <a-divider type="vertical"/>
        <a-col :span="2">
             <a-button @click="sendMsg" :loading="sendMsgLoading" style="width:78px;height:56px;margin-top:10px" type="primary" preIcon="mdi:page-next-outline"> 发送 </a-button>
        </a-col>
      </a-row>
    </a-card>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref,reactive, nextTick, defineExpose } from 'vue';
  import { ScrollContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { saveMsg,listall } from '../FansMsg.api';
  import { Avatar } from 'ant-design-vue';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';

  const { createMessage } = useMessage();
  const scrollContainer=ref();
  const sendMsgLoading = ref<boolean>(false);

       const okLoading = ref<boolean>(false);
  const title = ref<string>('');
  const width = ref<number>(500);
  const height = ref<number>(600);
  
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  
  const emit = defineEmits(['register', 'success']);
 
 const username = ref<string>('');
  const profile = ref<string>('');
 const fansNickname = ref<string>('');
 const fansProfile = ref<string>('');
 const currMsg = ref<string>('');
 const msgList= reactive<any>([]);
  /**
   *加载对话框
   * @param record
   */
  function handleMsg(record,account) {
    title.value ='与'+record.fansNickname+'私信';
    fansNickname.value=record.fansNickname;
    fansProfile.value=record.fansProfile;
    username.value=account.value.username;
    profile.value=account.value.profile;
    visible.value = true;
    loadMsg();
    setInterval(() => {
      loadMsg();
    }, 60000)
  }

//加载私信
function loadMsg(){
  listall({fansCtrlAccountId:username.value,fansName:fansNickname.value})
      .then((res) => {
       if(res && res.length>0){
         nextTick(() => {
            Object.assign(msgList, res);
            scrollContainer.value.scrollBottom()
         //   for(var i=0;i<res.records.length;i++){
               // imgList.push(res.records[i])
         //   }
           //console.log(imgList)
         })
       }
  })
}
  /**
   * 发送私信
   * @param record
   */
  async function sendMsg() {
      let obj={fansCtrlAccountId:username.value,fansName:fansNickname.value,msg:currMsg.value,isFans:0}
      //发送消息保存数据库
      sendMsgLoading.value = true;
      await saveMsg(obj)
      .then((res) => {
        if (res.success) {
          msgList.push(obj)
          currMsg.value=''
          scrollContainer.value.scrollBottom()
        } else {
          createMessage.warning(res.message);
        }
      }).finally(() => {
        sendMsgLoading.value = false;
      });

  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
    handleCancel();
    emit('success');
  }

  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    handleMsg
  });
</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
  .scroll-wrap {
    width: 100%;
    height:300px;
  }
   .sendmsg {
    width: 100%;
    height:150px;
  }
  
</style>
