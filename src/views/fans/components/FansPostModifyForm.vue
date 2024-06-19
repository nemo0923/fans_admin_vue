<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div v-if="!disabled" style="background: #ececec; padding: 10px">
      <a-card v-if="!disabled" title="账号信息" :bordered="false" >
       
         <a-descriptions size="small" :column="2" style="margin-left:60px">
            <a-descriptions-item label="账号"> {{formData.domainAccount}} </a-descriptions-item>
            <a-descriptions-item label="姓名"> {{formData.name}} </a-descriptions-item>
            <a-descriptions-item label="国家"> {{formData.country_dictText}} </a-descriptions-item>
            <a-descriptions-item label="人设"> {{formData.roleId_dictText}} </a-descriptions-item>
        </a-descriptions>
      

      </a-card>
      
    <a-card v-if="!disabled" title="帖子信息" :bordered="false" style="margin-top:10px">  
        <a-row >      
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}" label="标题" v-bind="validateInfos.postTitle">
            <a-input v-model:value="formData.postTitle" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      
        <a-col :span="24">
             <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}"  label="内容"  v-bind="validateInfos.content">
             <a-textarea v-model:value="formData.content" :auto-size="{ minRows: 3, maxRows: 100 }" placeholder="帖子文本" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      </a-row>
     
      </a-card>

      <a-card v-if="!disabled" :bordered="false" style="margin-top:10px">
 <a-row>
       <a-col :span="7">
        
<a-card title="账号头像" :bordered="true" >
      <j-image-upload v-model:value="formData.profile" :fileMax="1" :disabled="true"></j-image-upload>
    </a-card>
        </a-col>
          
     <a-col :span="17">
           <a-card title="帖子配图" :bordered="true" >
              <template #extra>
            <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleImgSelect">检索图片库</a-button>

        </template>  
       <ImagePreview @toDeleteImg="handleTotoDeleteImg"  @toChangeFaceImg="handleChangeFaceImg" :imageList="imgLibPathArray" />
       <a-empty v-if="imgLibPathArray.length==0" :description="null"/>
    </a-card>
        </a-col>
        <!--
       <a-row>
        </a-row>      
        <a-col :span="24">
           <a-form-item :label-col="{span: 8}" :wrapper-col="{span: 16}" label="决定" v-bind="validateInfos.path">
	          <j-dict-select-tag type="radio" placeholder="请选择" v-model:value="formData.imgChoose" dictCode="img_choose"/>
          </a-form-item>
        </a-col>
         -->
       </a-row>
      
    </a-card>
      </div>
    <!--预览帖子-->
    <a-card v-if="disabled" :hoverable="true" :title="formData.postTitle" :bordered="true" style="width:100%">
      <div v-html="formData.content"></div>
      <a-divider/>
      <div>
       <ImagePreview :imageList="readOnlyimgLibPathArray" />
       </div>
    </a-card>
    </a-form>
  </a-spin>
   <FansImgDrawer @register="registerDrawer" @imgSelected="handleImgSelected" @success="handleSuccess" />
</template>

<script lang="ts" setup>
  import { ref,unref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import FansImgDrawer from './FansImgDrawer.vue'
  import { ImageProps } from '/@/components/Preview/src/typing';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import { PageWrapper } from '/@/components/Page';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../FansPostPub.api';
  import { queryRoleTempleById } from '../FansRoleTemple.api';
  import { faceSwap,headPhoto,role_key,gptChat,gptAssistants } from './AI.api';
  import { Form } from 'ant-design-vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { useDrawer } from '/@/components/Drawer';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
  import TagLib from '/@/components/fans/TagLib.vue';
  import { isEmpty, isArray } from '/@/utils/is';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const aiPostLoading = ref<boolean>(false);
  const aiFaceLoading = ref<boolean>(false);
  const currProfile= ref<String>('');//当前人设头像
  const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: ()=>{} },
    formBpm: { type: Boolean, default: true }
  });
  const formRef = ref();
  const useForm = Form.useForm;
  const emit = defineEmits(['register', 'ok']);
  const formData = reactive<Record<string, any>>({
    id: '',
    postTitle:'',
    profile:'',
    roleId:'', 
    content:'',
    imgPath:'',
    features:[{featureName:'',tagName:''}]
  });
 
  const imgLibPathArray= reactive<ImageProps>([]);//图片库中的图预览
              
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    postTitle: [{ required: true, message: '请填写帖子标题!'},],
    content: [{ required: true, message: '请填写帖子标题!'},],
  };
  const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: true });

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

// 只读图片库
  const readOnlyimgLibPathArray = computed(()=>{
    let array=imgLibPathArray.filter(function(item) {
         item.btn=false
        return item
      })
      return array
  });

  function handleImgSelect(record: Recordable) {
    openDrawer(true, {
      record
    });
  }
  //删除图片库中图片
  function handleTotoDeleteImg(src){
    let array=imgLibPathArray.filter(function(item) {
        return item.src != src
      })
       imgLibPathArray.splice(0);

     Object.assign(imgLibPathArray,array );
  }
  /**
   * 新增
   */
  function add() {
     edit({ features:[{featureName:'',tagName:''}]});
  }

  /**
   * 编辑
   */
 async function edit(record) {
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
      dbImgPath2ImagePreview(formData.imgPath)
    });
  }

//替换人脸
async function handleChangeFaceImg(src){
   

if(!formData.profile){
     createMessage.error("换脸所需人设头像不存在!");
    return;
  }
if(!imgLibPathArray || imgLibPathArray.length==0){
     createMessage.error("换脸所需目标图片不存在!");
    return;
  }
  let face=getFileAccessHttpUrl(formData.profile)
if(isArray(src) && src.length>0){
  src=src[0]
}
changeFaceImgSpinning(src,true);
  console.log(face)
  console.log(src)
 // face="http://52.76.246.31:39003/files/demo/2.jpg"
 // src="http://52.76.246.31:39003/files/demo/1.jpeg"
  
       await faceSwap({ "inputImage":face,"inputImage2":src})
            .then((res) => {
               //更换数组里的元素，发送到后台需要下载重新替换
               if(res && res.data && res.data.outputImages){
                  let url=res.data.outputImages
                  console.log(url)
                  for(var i=0;i<imgLibPathArray.length;i++){
                    if(imgLibPathArray[i].src==src){
                      imgLibPathArray[i].src=url
                      imgLibPathArray[i].spinning=false
                        break;
                    }
                  }
                  createMessage.success("换脸成功！");
               }else{
                   createMessage.error("换脸失败！");
                    for(var i=0;i<imgLibPathArray.length;i++){
                    if(imgLibPathArray[i].src==src){
                      imgLibPathArray[i].spinning=false
                        break;
                    }
                  }
               }
               
          }).catch((err) => {
              createMessage.error("换脸失败！"+err);
              changeFaceImgSpinning(src,false);
          }).finally(() => {
              //
          });
}
//换脸加载中状态改变
function changeFaceImgSpinning(src,status){
  for(var i=0;i<imgLibPathArray.length;i++){
                    if(imgLibPathArray[i].src==src){
                      imgLibPathArray[i].spinning=status
                        break;
                    }
   }
}
//选择图片库图片后的触发事件
function handleImgSelected(record){
  let obj={src: getFileAccessHttpUrl(record.imgPath),width:120,spinning:false,btn:true,btnFace:true}
  let isExist=false
  for(var i=0;i<imgLibPathArray.length;i++){
      if(imgLibPathArray[i].src==getFileAccessHttpUrl(record.imgPath)){
          isExist=true
          break;
      }
  }
  if(!isExist){
      imgLibPathArray.push(obj);
      /*
      if(formData.imgPath){
          formData.imgPath= formData.imgPath+','+record.imgPath
      }else{
          formData.imgPath= record.imgPath
      }
      */
       
  }
}
//数据库中图片库存储路径转成专用格式
function dbImgPath2ImagePreview(imgPath){
   imgLibPathArray.splice(0);//先清空，再重新赋值覆盖
  if(imgPath){
      let paths=imgPath.split(',');
      for(var i=0;i<paths.length;i++){
          let obj={src: getFileAccessHttpUrl(paths[i]), width: 120,spinning:false,btn:true,btnFace:true}
          imgLibPathArray.push(obj);
      }
  }
}
//数据库中最终库存储路径转成专用格式
/*
function dbImgPath2ImagePreview(imgPath){
   imgPathArray.splice(0);//先清空，再重新赋值覆盖
  if(imgPath){
      let paths=imgPath.split(',');
      for(var i=0;i<paths.length;i++){
          let obj={src: getFileAccessHttpUrl(paths[i]), width: 120}
          imgPathArray.push(obj);
      }
  }
}
*/
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
 
  
   //图片数组转逗号字符串
   if(imgLibPathArray && imgLibPathArray.length>0){
     formData.imgPath=''
     for(var i=0;i<imgLibPathArray.length;i++){
        if(i==0){
            formData.imgPath=imgLibPathArray[i].src
        }else{
            formData.imgPath=formData.imgPath +','+imgLibPathArray[i].src
        }
     }
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
<style lang="less" >
  .ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item-container{
    width: 180px!important;
    height: 180px!important;
    border:0px;
  }
  :where(.css-dev-only-do-not-override-1rytsjn).ant-upload-wrapper .ant-upload-list.ant-upload-list-picture .ant-upload-list-item, :where(.css-dev-only-do-not-override-1rytsjn).ant-upload-wrapper .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item{
    padding: 0px!important;
    border: 0px!important;
  }
</style>