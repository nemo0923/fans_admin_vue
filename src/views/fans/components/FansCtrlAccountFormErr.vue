<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
     
        <a-row>
       
         <a-col :span="24">
          <a-form-item label="异常处理措施" :label-col="{span: 4}" :wrapper-col="{span: 20}" v-bind="validateInfos.accountErr">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.accountErr" dictCode="account_Err"/>
          </a-form-item>
        </a-col>
        </a-row>
       
     
           <a-row>
              
          <a-col :span="12">
          <a-form-item label="登录账号" :label-col="{span: 8}" :wrapper-col="{span: 16}" v-bind="validateInfos.username">
            <a-input v-model:value="formData.username" placeholder="请输入" :disabled="true"></a-input>
          </a-form-item>
          </a-col>
          <a-col :span="12">
          <a-form-item label="登录密码" :label-col="{span: 8}" :wrapper-col="{span: 16}" v-bind="validateInfos.password">
            <a-input v-model:value="formData.password" placeholder="请输入" :disabled="true"></a-input>
          </a-form-item>
          </a-col>
          <a-col :span="24">
          <a-form-item label="2FA" :label-col="{span: 4}" :wrapper-col="{span: 20}" v-bind="validateInfos.fakey">
            <a-input v-model:value="formData.fakey" placeholder="请输入" :disabled="true"></a-input>
          </a-form-item>
          </a-col>
         </a-row>
          <a-row>
            <a-col :span="12">
          <a-form-item label="运营平台" :label-col="{span: 8}" :wrapper-col="{span: 16}" v-bind="validateInfos.fansDomain">
	          <j-dict-select-tag v-model:value="formData.fansDomain" dictCode="fans_domain" placeholder="请选择" :disabled="true"/>
          </a-form-item>
           </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 4}" :wrapper-col="{span: 20}" label="主页链接" v-bind="validateInfos.link">
            <a-input v-model:value="formData.link" placeholder="请输入" :disabled="disabled_link"></a-input>
          </a-form-item>
        </a-col>
        </a-row>
     
     
         
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive,unref, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { headPhoto,role_key,gptChat,gptAssistants } from './AI.api';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate,syncInfo } from '../FansCtrlAccount.api';
  import { Form } from 'ant-design-vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { ImageProps } from '/@/components/Preview/src/typing';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
  import { useGlobSetting } from '/@/hooks/setting';
  import { isEmpty, isArray } from '/@/utils/is';

  const globSetting = useGlobSetting();
  const baseApiUrl = globSetting.domainUrl;
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: ()=>{} },
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok','fail']);
  const formData = reactive<Record<string, any>>({
    id: '',
    accountErr: 'die',   
    fansDomain: '',   
    username: '',   
    password:'',
    link:'',
    fakey:'',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
    const disabled = computed(()=>{
     if(unref(formData).accountErr!='err'){
          return true;
        }else{
          return false;
        }
  });
  const disabled_link = computed(()=>{
     if(unref(formData).accountErr=='die'){
          return true;
        }else{
          return false;
        }
  });

  //表单验证
  const validatorRules = {
     accountErr: [{ required: true, message: '请选择异常处理措施!'},],
     username: [{ required:true, message: '请填写登录账号!'},],
     password: [{ required: true, message: '请填写密码!'},],
     fakey: [{ required: true, message: '请填写2FA!'},],
     fansDomain: [{ required:true,message: '请选择运营平台!'},],
     link: [{ required: true, message: '请填写主页链接!'},],
     
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });




  
  /**
   * 新增
   */
  function add() {
    edit({ autoFriend:'0'});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
  
      resetFields();
      if(!record.accountErr){
          record.accountErr='die'
      }
      
      Object.assign(formData, record);
  
     
      
    });
  }

  
  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
  
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }

     //其他原因，已确认手工上号。- 手工改状态。
    if(formData.accountErr=='manual'){
        formData.onlineStatus='ok'
        formData.mountState='ok'
    }

    //循环数据
    for (let data in model) {
      //如果该数据是数组并且是字符串类型
      if (model[data] instanceof Array) {
        let valueType = getValueType(formRef.value.getProps, data);
        //如果是字符串类型的需要变成以逗号分割的字符串
        if (valueType === 'string') {
          model[data] = model[data].join(',');
        }
      }
    }
    await saveOrUpdate(model, isUpdate.value)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => {
        confirmLoading.value = false;
      });
  }


  defineExpose({
    add,
    edit,
    submitForm,
  });
</script>

<style lang="less" scoped>
  .antd-modal-form {
    height: 320px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
