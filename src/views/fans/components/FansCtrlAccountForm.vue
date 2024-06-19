<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div style="background: #ececec; padding: 10px">
      <a-card title="账号信息" :bordered="false" style="margin-bottom:10px">
        <a-row>
        <a-col :span="12">
          <a-form-item label="运营平台" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.fansDomain">
	          <j-dict-select-tag v-model:value="formData.fansDomain" dictCode="fans_domain" placeholder="请选择" :disabled="true"/>
          </a-form-item>
           </a-col>
          <a-col :span="12">
          <a-form-item label="登录账号" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.username">
            <a-input v-model:value="formData.username" placeholder="请输入" :disabled="true"></a-input>
          </a-form-item>
        </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
          <a-form-item  label="IP代理" :label-col="{span: 3}" :wrapper-col="{span: 21}" v-bind="validateInfos.proxyId">
            <j-dict-select-tag placeholder="请选择" v-model:value="formData.proxyId" dictCode="fans_proxy,proxy_name,id"/>
          </a-form-item>
        </a-col>
        </a-row>
       <a-row>
         <a-col :span="12">
          <a-form-item label="账号类型" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.accountType">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.accountType" dictCode="account_type"/>
          </a-form-item>
        </a-col>
         <a-col :span="12">
          <a-form-item label="目标客群" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.cg">
            <j-dict-select-tag type="radioButton" placeholder="请选择" v-model:value="formData.cg" dictCode="fans_cg,code,code"/>
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
        <!--
        <a-col :span="12">
          <a-form-item  label="关联爬虫" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.accountSmall">
            <j-dict-select-tag placeholder="请选择" v-model:value="formData.accountSmall" dictCode="fans_ctrl_account where account_type='small',username,username"/>
          </a-form-item>
        </a-col>
        -->
        <!--
          <a-col :span="12">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="注册日期" v-bind="validateInfos.beginDate">
            <a-date-picker placeholder="请选择" v-model:value="formData.beginDate"  style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        -->
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}" label="主页链接" v-bind="validateInfos.link">
            <a-input v-model:value="formData.link" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        </a-row>
       </a-card>
        <a-card title="个性化人设" :bordered="false" style="margin-bottom:10px">
          <template #extra>
            <a-button type="primary" :loading="aiProfileLoading" preIcon="ant-design:plus-outlined" @click="aiProfile">AI生头像</a-button>
        </template> 
           <a-row>
             <a-col :span="12">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="人设模版" v-bind="validateInfos.roleTempleId">
	          <j-dict-select-tag v-model:value="formData.roleTempleId" dictCode="fans_role_temple,role_temple_name,id"  placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="姓名" :label-col="{span: 6}" :wrapper-col="{span: 18}" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="国家"  :label-col="{span: 12}" :wrapper-col="{span: 12}"  v-bind="validateInfos.country">
	          <j-dict-select-tag  v-model:value="formData.country" dictCode="country" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
       
        <a-col :span="6">
          <a-form-item label="性别" :label-col="{span: 12}" :wrapper-col="{span: 12}"  v-bind="validateInfos.sex">
	          <j-dict-select-tag v-model:value="formData.sex" dictCode="sex" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="年龄" :label-col="{span: 12}" :wrapper-col="{span: 12}"  v-bind="validateInfos.ages">
	          <j-dict-select-tag v-model:value="formData.ages" dictCode="ages" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="发色" :label-col="{span: 12}" :wrapper-col="{span: 12}"  v-bind="validateInfos.hairColor">
	          <j-dict-select-tag v-model:value="formData.hairColor" dictCode="hair_color" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
          </a-row >  
            <a-row >
        <a-col :span="24">
           <a-form-item label="其他生成要求" :label-col="{span: 3}" :wrapper-col="{span: 21}"  v-bind="validateInfos.profileDesc">
            <a-textarea v-model:value="formData.profileDesc" :rows="2" placeholder="请输入英文" :disabled="disabled"/>
          </a-form-item>
        </a-col> 
        </a-row >  
            <a-row >
       <a-col :span="12">
           <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="头像生成预览" v-bind="validateInfos.path">
	           <ImagePreview :imageList="aiImgList" />
             <a-empty v-if="!aiImgListValue" :description="null"/>
          </a-form-item>
        </a-col>
        
       <a-col :span="12">
           <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="人工上传头像" v-bind="validateInfos.profile">
	           <j-image-upload :fileMax="1" v-model:value="formData.profile" @change="handleProfileChange" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>
         </a-row >  
            <!--
            <a-row >
           
         <a-col :span="12">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="个人简介" v-bind="validateInfos.intro">
	          <a-textarea v-model:value="formData.intro" :rows="4"  placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        
         <a-col :span="12">
           <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 20}" label="封面照" v-bind="validateInfos.cover">
	             <j-image-upload  v-model:value="formData.cover" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>
         
            </a-row>
             -->
            <!--
            <a-divider/>
          <a-row >
             <a-col :span="8">
          <a-form-item label="个人信息状态" :label-col="{span: 12}" :wrapper-col="{span: 12}"  v-bind="validateInfos.syncStatusInfo">
	          <j-dict-select-tag v-model:value="formData.syncStatusInfo" dictCode="sync_status" placeholder="请选择" :disabled="true"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
           <a-button style="margin-left:30px" :loading="handelSyncStatusInfoLoading" :disabled="formData.syncStatusInfo=='start'"  @click="handelSyncStatusInfo" type="primary" >同步到平台</a-button>
        </a-col>
        <a-col :span="8">
           <span>仅同步头像、封面照、简介(姓名信息不同步)，目前暂不可用。</span>
        </a-col>
      </a-row>
      -->
       </a-card>
       </div>
     
         
        
        <!--
        <a-col :span="24">
          <a-form-item label="养号设备" v-bind="validateInfos.fansCtrlNodeId">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.fansCtrlNodeId" dictCode="fans_ctrl_node,ip,ip" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="浏览器序号" v-bind="validateInfos.browserNo">
            <a-input v-model:value="formData.browserNo" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        -->
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
    fansCtrlNodeId: '',   
    browserNo: '',   
    fansDomain: '',   
    username: '',   
    name:'',
    link:'',
    beginDate:'',
    accountType:'main',
    accountSmall:'',
    roleTempleId:'',
    autoFriend:'1',
    autoName:'1',
    autoPost:'1',
    autoProfile:'1',
     country: '',  
     ages:'',
     sex:'',
     hairColor:'',
     profileDesc:'',
     proxyId:'',
     cover:'',
     profile:'',
     intro:'',
     cg:'',
     syncStatusInfo:'',
  });
  const aiProfileLoading = ref<boolean>(false);
  const aiImgList= ref<ImageProps[]>();//ai生成的图预览
  const aiImgListValue = ref(false);
  const handelSyncStatusInfoLoading = ref<boolean>(false);

  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
     fansDomain: [{ required: true, message: '请选择养号平台!'},],
     username: [{ required: true, message: '请填写登录账号!'},],
     name: [{ required: true, message: '请填写姓名!'},],
     accountType: [{ required: true, message: '请选择账号类型!'},],
     accountSmall: [{ required: true, message: '请选择爬虫小号!'},],
     roleTempleId:[{ required: true, message: '请选择人设模版!'},],
     link:[{ required: true, message: '请填写主页链接!'},],
     country: [{ required: true, message: '请选择国家!'},],
    ages: [{ required: true, message: '请选择年龄!'},],
    sex: [{ required: true, message: '请选择性别!'},],
    cg: [{ required: true, message: '请选择客群!'},],
    proxyId: [{ required: true, message: '请选择IP代理!'},],
    hairColor: [{ required: true, message: '请选择发色!'},],
     
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
    edit({ autoFriend:'0'});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      //var r=Math.floor(Math.random() * 3) + 0;
      /*
      var link="https://www.facebook.com/profile.php/61559158493792";
      var ret=null;
      var pos=link.indexOf("?id=");
      if(link && pos>0){
          ret=link.substring(pos+4);
          var pos2=ret.indexOf("&");
          if(pos2>0){
            ret=ret.substring(0,pos2);
          }
      }else{
          var arr =link.split('/');
          if(arr && arr.length>0){
            ret=arr[arr.length-1];
          }
      }
      console.log(ret)
      */
      resetFields();
      aiProfileLoading.value=false
      //赋值
      aiImgList.value=[]
      console.log(record)
      record.autoFriend=record.autoFriend+''
      record.autoName=record.autoName+''
      record.autoPost=record.autoPost+''
      record.autoProfile=record.autoProfile+''
      Object.assign(formData, record);
  
      if(formData.profile){
        aiImgList.value.push({src:getFileAccessHttpUrl(formData.profile), height:128 , width:90,spinning:false,btn:false,btnFace:false});
        aiImgListValue.value=true
      }
      
    });
  }
 /**
   * 头像人工上传事件,取消ai头像
   */
  function handleProfileChange(e) {
      if(e){
           aiImgList.value=[]
      }
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
            aiImgList.value.push({src:res.data.outputImages, height:128 , width:90,spinning:false,btn:false,btnFace:false});
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
//信息同步到平台
  async function handelSyncStatusInfo() {
    if(formData.profile){
      handelSyncStatusInfoLoading.value=true
         await syncInfo(formData,handelSyncStart)
         .catch((err) => {
          createMessage.error("个人信息同步异常！"+err);
          handelSyncStatusInfoLoading.value=false
      })
      .finally(() => {
        handelSyncStatusInfoLoading.value=false
      });
    }else{
      handelSyncStatusInfoLoading.value=false
      createMessage.error("个人信息同步到平台错误！请检查头像是否生成！");
    }
   
  }
    function handelSyncStart(res) {
   // createMessage.success(res);
   formData.syncStatusInfo='start'
   handelSyncStatusInfoLoading.value=false
  }
  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
    if(!formData.profile){
    createMessage.error("请AI生成或人工上传头像!");
    emit('fail');
    return;
 }
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
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
    height: 550px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
