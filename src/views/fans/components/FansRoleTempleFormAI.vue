<template>
  <a-spin :spinning="confirmLoading">
    

    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
   <!--
         <a-descriptions size="small"  :column="1">
          <a-descriptions-item label="仿照此模版生成新人设"> {{formData.roleTempleName}} </a-descriptions-item>
        </a-descriptions>
-->

 <a-row >
        <a-col :span="12">
          
           <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 19}" label="模版名称" v-bind="validateInfos.roleTempleName">
            <a-input v-model:value="formData.roleTempleName" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <div style="background: #ececec; padding: 10px">
      <a-card title="基本信息" :bordered="false" style="margin-bottom:10px">
        <!--
        <template #extra>
            <a-button type="primary" :loading="aiProfileLoading" preIcon="ant-design:plus-outlined" @click="aiProfile">开始AI生头像</a-button>
        </template> 
        -->
      <a-row >
         <a-col :span="6">
          <a-form-item label="国家"  :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.country">
	          <j-dict-select-tag  v-model:value="formData.country" dictCode="country" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="年龄" :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.ages">
	          <j-dict-select-tag v-model:value="formData.ages" dictCode="ages" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="性别" :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.sex">
	          <j-dict-select-tag v-model:value="formData.sex" dictCode="sex" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
       
        <a-col :span="6">
          <a-form-item label="发色" :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.hairColor">
	          <j-dict-select-tag v-model:value="formData.hairColor" dictCode="hair_color" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
          </a-row >  
 <a-row >  
             <a-col :span="12">
          <a-form-item label="年收入" :label-col="{span: 4}" :wrapper-col="{span: 18}" v-bind="validateInfos.income">
	          <j-dict-select-tag v-model:value="formData.income" dictCode="income" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
           <a-col :span="12">
          <a-form-item label="行业" :label-col="{span: 4}" :wrapper-col="{span: 18}" v-bind="validateInfos.ability">
	          <j-dict-select-tag v-model:value="formData.ability" dictCode="ability" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
         </a-row >  
          <!--
            <a-row >
        <a-col :span="12">
           <a-form-item label="其他需求" :label-col="{span:5}" :wrapper-col="{span: 17}" v-bind="validateInfos.profileDesc">
            <a-textarea v-model:value="formData.profileDesc" :rows="5" placeholder="请输入英文" :disabled="disabled"/>
          </a-form-item>
        </a-col> 
       
          <a-col :span="12">
           <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}" label="头像预览" v-bind="validateInfos.path">
	           <ImagePreview :imageList="aiImgList" />
             <a-empty v-if="!aiImgListValue" :description="null"/>
          </a-form-item>
        </a-col>
       
      </a-row>
       -->
        </a-card>
       
         <a-card title="定制需求" :bordered="false" style="margin-bottom:10px">
         <a-row >
         
            <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"  label="个人介绍" v-bind="validateInfos.introReq">
            <a-input v-model:value="formData.introReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"  label="性格需求" v-bind="validateInfos.natureReq">
            <a-input v-model:value="formData.natureReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"  label="爱好需求" v-bind="validateInfos.interestReq">
            <a-input v-model:value="formData.interestReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
              <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"   label="工作内容" v-bind="validateInfos.abilityReq">
            <a-input v-model:value="formData.abilityReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"   label="工作经历" v-bind="validateInfos.professionReq">
            <a-input v-model:value="formData.professionReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"   label="教育经历" v-bind="validateInfos.educationReq">
            <a-input v-model:value="formData.educationReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 18}"  label="感情经历" v-bind="validateInfos.loveReq">
            <a-input v-model:value="formData.loveReq" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
         </a-row>
          <a-row>
        <a-col :span="24">
           <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 22}" label="其他需求" v-bind="validateInfos.desc">
            <a-textarea v-model:value="formData.desc" :rows="4" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>
        </a-card>
        
         <a-card title="人设原始生成内容" :bordered="false" style="margin-bottom:10px">
   <template #extra>
            <a-button type="primary" :loading="aiRoleLoading" preIcon="ant-design:plus-outlined" @click="aiRole">开始AI生人设</a-button>
        </template> 
      <a-row>
        <a-col :span="24">
            <a-textarea v-model:value="formData.roleRaw" :auto-size="{ minRows:3, maxRows: 100 }" placeholder="" :disabled="disabled"/>
         
        </a-col> 
      </a-row>
           </a-card>
       </div>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { getValueType } from '/@/utils';
  import { aiRoleGenarete } from '../FansRoleTemple.api';
    import { headPhoto,role_key,gptChat,gptAssistants } from './AI.api';
  import { Form } from 'ant-design-vue';
  import { CollapseContainer } from '/@/components/Container';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { ImageProps } from '/@/components/Preview/src/typing';
import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
import { useGlobSetting } from '/@/hooks/setting';
const globSetting = useGlobSetting();
const baseApiUrl = globSetting.domainUrl;
  import { isEmpty, isArray } from '/@/utils/is';

  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: ()=>{} },
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok','validate']);
  const formData = reactive<Record<string, any>>({
    id: '',
    roleTempleName: '',   
     country: '',  
     ages:'',
     sex:'',
     hairColor:'',
     num:1,
     profileDesc:'',
     income:'',
     ability:'',
     introReq:'',
     natureReq:'',
     interestReq:'',
     abilityReq:'',
     professionReq:'',
     educationReq:'',
     loveReq:'',
     desc:'',
     roleRaw:'',
     leaderThreadId:'',
  });
  
    
  const aiProfileLoading = ref<boolean>(false);
  const aiRoleLoading = ref<boolean>(false);
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    roleTempleName: [{ required: true, message: '请填写模版名称!'},],
    country: [{ required: true, message: '请选择国家!'},],
    ages: [{ required: true, message: '请选择年龄!'},],
    sex: [{ required: true, message: '请选择性别!'},],
    hairColor: [{ required: true, message: '请选择发色!'},],
     income: [{ required: true, message: '请选择年收入!'},],
      ability: [{ required: true, message: '请选择行业!'},],
    roleRaw: [{ required: true, message: '请操作AI生文，生成原始人设信息!'},],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

  const aiImgList= ref<ImageProps[]>();//ai生成的图预览
  const aiImgListValue = ref(false);

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
      aiProfileLoading.value=false
      //赋值
      aiImgList.value=[]
      Object.assign(formData, record);
  
      if(formData.profile){
        aiImgList.value.push({src:getFileAccessHttpUrl(formData.profile), height:128 , width:80,spinning:false,btn:false,btnFace:false});
        aiImgListValue.value=true
      }
       
    });
  }
  //ai生成头像
 async  function aiProfile(){
   if(!formData.country){
    createMessage.error("请选择国家！");
    return;
 }
 if(!formData.ages){
    createMessage.error("请选择年龄!");
    return;
 }
 if(!formData.sex){
    createMessage.error("请选择性别!");
    return;
 }
 if(!formData.hairColor){
    createMessage.error("请选择发色!");
    return;
 }

     let params={}
     aiProfileLoading.value=true
     params.nationality=formData.country
     params.age=formData.ages
     params.hairColor=formData.hairColor
     params.nums=1
     params.prompt=formData.profileDesc
     if(formData.sex=='female'){
        //女
        if(formData.ages<=18){
            params.gender='girl'
        }else if(formData.ages>18 && formData.ages<35){
            params.gender='woman'
        }else{
            params.gender='mature woman'
        }
     }else{
       if(formData.ages<=18){
            params.gender='boy'
        }else if(formData.ages>18 && formData.ages<35){
            params.gender='man'
        }else{
            params.gender='mature man'
        }
     }
     aiImgList.value=[]
     await headPhoto(params)
      .then((res) => {
        if(res && res.code==200 && res.data && res.data.outputImages){
            createMessage.success("人设头像生成成功！");
            aiImgList.value.push({src:res.data.outputImages, height:128 , width:80,spinning:false,btn:false,btnFace:false});
            aiImgListValue.value=true
            formData.profile=res.data.outputImages
        }else{
          createMessage.error("人设头像生成异常！");
        }
      }).catch((err) => {
          createMessage.error("人设内人设头像生成异常！"+err);
      })
      .finally(() => {
        confirmLoading.value = false;
        aiProfileLoading.value=false;
      });
       

   }

   //ai生成人设
   
   async  function aiRole(){
     //1、拼文本，发往写死的助手id，获取整段文本，和线程id（重新发帖用）。
      //2、后台保存时，将提示词发到第二个机器人，获取人设助手id
      //并尝试首次发帖，发往设助手id，获取贴子线程id
      //3、再发帖，发往 人设助手id+ 贴子线程id
     let params={question:''}
     //拼接文字需求文字
     if(formData.country){
        params.question=params.question+'国家:'+formData.country+' '
     }
     if(formData.sex){
        params.question=params.question+'性别:'+formData.sex+' '
     }
     if(formData.ages){
        params.question=params.question+'年龄:'+formData.ages+' '
     }
     if(formData.hairColor){
        params.question=params.question+'头发颜色:'+formData.hairColor+' '
     }
     if(formData.ability){
        params.question=params.question+'从事行业:'+formData.ability+' '
     }
      if(formData.income){
        params.question=params.question+'年收入:'+formData.income+' '
     }
     if(formData.abilityReq){
        params.question=params.question+'工作内容要求:'+formData.abilityReq+' '
     }
     if(formData.introReq){
        params.question=params.question+'个人介绍要求:'+formData.introReq+' '
     }
     if(formData.professionReq){
        params.question=params.question+'工作经历要求:'+formData.professionReq+' '
     }
     if(formData.natureReq){
        params.question=params.question+'性格要求:'+formData.natureReq+' '
     }
    if(formData.interestReq){
        params.question=params.question+'爱好要求:'+formData.interestReq+' '
     }
     if(formData.loveReq){
        params.question=params.question+'感情经历要求:'+formData.loveReq+' '
     }
     if(formData.educationReq){
        params.question=params.question+'教育经历要求:'+formData.educationReq+' '
     }
     let urlSuffix=''
      
     if(formData.id && formData.leaderThreadId){
      //重新生成的人设需要加leaderThreadId
      urlSuffix=role_key+"/"+formData.leaderThreadId
     }else{
        //新增人设
        urlSuffix=role_key
     }
   
     aiRoleLoading.value=true
     await gptChat(urlSuffix,params)
      .then((res) => {
        if(res && res.response){
            createMessage.success("人设内容生成成功！");
            formData.roleRaw=res.response
            formData.leaderThreadId=res.threadId
        }else{
          createMessage.error("人设内容生成异常！");
        }
       
      }).catch((err) => {
          createMessage.error("人设内容生成异常！"+err);
      }).finally(() => {
         aiRoleLoading.value=false
      });
       

   }
  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
   // await validate();
 if(!formData.roleTempleName){
    createMessage.error("请填写模版名称！");
    emit('validate');
    return;
 }
 if(!formData.country){
    createMessage.error("请选择国家！");
    emit('validate');
    return;
 }
 if(!formData.ages){
    createMessage.error("请选择年龄!");
    emit('validate');
    return;
 }
 if(!formData.sex){
    createMessage.error("请选择性别!");
    emit('validate');
    return;
 }
 if(!formData.hairColor){
    createMessage.error("请选择发色!");
    emit('validate');
    return;
 }
 
 if(!formData.roleRaw){
    createMessage.error("请操作AI生文，生成原始人设信息!");
    emit('validate');
    return;
 }
 //头像预览转头像地址
 if(aiImgList.value?.length>0){
   let obj=aiImgList.value[0];
   let prefix = `${baseApiUrl}/sys/common/static/`;
    //console.log(obj.src)
    let src=obj.src
    if(isArray(obj.src) && obj.src.length>0){
      src=obj.src[0]
    }
    //如果是老图去掉http前缀。ai生成的新图由于需要下载到服务器，保留http绝对路径
    if(src.startsWith(prefix)){
        formData.profile=src.substring(prefix.length)
    }else{
         formData.profile=src
    }
     //   console.log(obj.src.substring(prefix.length))
        
      //  console.log(formData.profile)
      //  return;
 }
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
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
  //保存时，必须有 GPT Prompt Format文字
  if(!formData.roleRaw){
     createMessage.error("人设内容尚未生成！");
     confirmLoading.value = false;
     return;
  }
  //if(formData.roleRaw.indexOf('prompt')==-1 && formData.roleRaw.indexOf('GPT-3 Formatted Character Information')==-1 &&  formData.roleRaw.indexOf('Prompt')==-1 && formData.roleRaw.indexOf('prompts')==-1 && formData.roleRaw.indexOf('Format')==-1 && formData.roleRaw.indexOf('format')==-1 && formData.roleRaw.indexOf('GPT-Compatible Character Information:')==-1  && formData.roleRaw.indexOf('GPT-3 Compatible Character:')==-1){ 
    if(formData.roleRaw.indexOf('Character Prompt')==-1 && formData.roleRaw.indexOf('Facial Prompt')==-1){ 
  
     createMessage.error("人设内容缺少“Prompt”文字，请尝试重新生成！");
     confirmLoading.value = false;
     return;
  }
     confirmLoading.value = true;
    await aiRoleGenarete(model)
      .then((res) => {
        if (res.success) {
          createMessage.success(res.message);
          emit('ok');
        } else {
          createMessage.warning(res.message);
        }
      }).catch((err) => {
          createMessage.error("人设内容保存异常！"+err);
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
    height: 510px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
