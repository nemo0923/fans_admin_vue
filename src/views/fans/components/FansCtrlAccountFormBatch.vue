<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div style="background: #ececec; padding: 10px">
      <a-card title="账号信息" :bordered="false" style="margin-bottom:10px">
        <a-row>
        <a-col :span="12">
          <a-form-item label="运营平台" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.fansDomain">
	          <j-dict-select-tag v-model:value="formData.fansDomain" dictCode="fans_domain" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
           </a-col>
           <a-col :span="12">
          <a-form-item  label="IP代理" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.proxyId">
            <j-dict-select-tag placeholder="请选择" v-model:value="formData.proxyId" dictCode="fans_proxy,proxy_name,id"/>
          </a-form-item>
        </a-col>
          <a-col :span="24">
          <a-form-item label="号源文本" :label-col="{span: 3}" :wrapper-col="{span: 21}" v-bind="validateInfos.txt">
            <a-textarea v-model:value="formData.txt" :rows="3" :auto-size="{ minRows: 3, maxRows:20 }" placeholder="每行只限三列，格式：账号----密码----2FA 举例：
447387437718----8fjT8waq----KVLV 5IWP 3EQQ PYWZ 2TIX RKBO Y6SF Y4NT
447949753842----MWsLjjpB----PY4K 5NSG 3VNA EPYW HVMC JNKC TBCE KWCK" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        
       
         <a-col :span="12">
          <a-form-item label="本国号源" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.localSrc">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.localSrc" dictCode="yn"/>
          </a-form-item>
        </a-col>
         <a-col :span="12">
          <a-form-item label="目标客群" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.cg">
            <j-dict-select-tag  placeholder="请选择" v-model:value="formData.cg" dictCode="fans_cg,code,code"/>
          </a-form-item>
        </a-col>
        
       
        </a-row>
       </a-card>
        <a-card title="人设信息" :bordered="false" style="margin-bottom:10px">
          
           <a-row>
             <a-col :span="12">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="人设模版" v-bind="validateInfos.roleTempleId">
	          <j-dict-select-tag v-model:value="formData.roleTempleId" dictCode="fans_role_temple,role_temple_name,id"  placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
  
        <a-col :span="12">
          <a-form-item label="所属国家"  :label-col="{span: 6}" :wrapper-col="{span: 18}"  v-bind="validateInfos.country">
	          <j-dict-select-tag  v-model:value="formData.country" dictCode="country" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
       <a-col :span="12">
          <a-form-item label="自动头像" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.autoProfile">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.autoProfile" dictCode="yn"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="自动改名" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.autoName">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.autoName" dictCode="yn"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="自动发帖" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.autoPost">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.autoPost" dictCode="yn"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="自动加粉" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.autoFriend">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.autoFriend" dictCode="yn"/>
          </a-form-item>
        </a-col>
      </a-row >  
      </a-card>
       </div>
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
  import { batchSave } from '../FansCtrlAccount.api';
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
    fansDomain: '',   
    proxyId: '',   
    txt:'',
    autoFriend:'1',
    autoName:'1',
    autoPost:'1',
    autoProfile:'1',
    localSrc:'1',
    cg:'',
    roleTempleId:'',
    country: '',
  });

  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
     fansDomain: [{ required: true, message: '请选择运营平台!'},],
     proxyId: [{ required: true, message: '请选择IP代理!'},],
     txt: [{ required: true, message: '请粘贴号源文本!'},],
     localSrc: [{ required: true, message: '请选择是否本国号源!'},],
     cg: [{ required: true, message: '请选择目标客群!'},],
     roleTempleId:[{ required: true, message: '请选择人设模版!'},],
     country: [{ required: true, message: '请选择国家!'},],
     autoFriend:[{ required: true, message: '请选择是否自动加粉!'},],
     autoName: [{ required: true, message: '请选择是否自动改名!'},],
     autoPost: [{ required: true, message: '请选择是否自动发帖!'},],
     autoProfile: [{ required: true, message: '请选择是否自动头像!'},],
     
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });

  // 表单禁用
  const disabled = computed(()=>{
    if(props.formBpm === true){
      if(props.formData.disabled === false){
        return false;
      }else{
        return true;
      }
    }
    return props.formDisabled;
  });

  
  /**
   * 新增
   */
  function add() {
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
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
    let model = formData;

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
    await batchSave(model)
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
    height: 550px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
