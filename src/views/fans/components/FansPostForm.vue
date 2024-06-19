<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div v-if="!disabled" style="background: #ececec; padding: 10px">
      <a-card v-if="!disabled" title="帖子摘要" :bordered="false" >
        <a-row>
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}" label="帖子标题" v-bind="validateInfos.title">
            <a-input v-model:value="formData.title" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}"  label="人设模版" v-bind="validateInfos.roleId">
	          <j-dict-select-tag v-model:value="formData.roleId" dictCode="fans_role_temple,role_temple_name,id" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
         </a-row>

          <a-row>
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}"  label="帖子标签"  v-bind="validateInfos.features">
	          <TagLib v-model:value="formData.features" scene="帖子"></TagLib>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 9}" :wrapper-col="{span: 14}"  label="字数限制"  v-bind="validateInfos.wordcount">
	          	<a-input-number addon-after="字" v-model:value="formData.wordcount" placeholder="请输入" :disabled="disabled"></a-input-number>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 12}"  label="语言"  v-bind="validateInfos.lang">
	          	<j-dict-select-tag v-model:value="formData.lang" dictCode="lang" placeholder="选择语言" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 12}"  label="表情"  v-bind="validateInfos.emoji">
	          	<j-dict-select-tag v-model:value="formData.emoji" dictCode="yn" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}"  label="其他生成要求"  v-bind="validateInfos.postDesc">
	          <a-textarea v-model:value="formData.postDesc" :auto-size="{ minRows: 2, maxRows: 5 }"  placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
     </a-row>

      </a-card>
      <!--
         <a-card v-if="!disabled" title="文本生成要求" :bordered="false" style="margin-top:10px">

         <a-row>
            <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="生成数量" v-bind="validateInfos.reqNum">
	          <a-input-number v-model:value="formData.reqNum" placeholder="请输入" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        
        
       
         </a-row>
           </a-card>
           -->
           <!--
           <a-card v-if="!disabled" title="图片生成要求" :bordered="false" style="margin-top:10px">   
              <a-row>
         <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="图片分类" v-bind="validateInfos.imgType">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.imgType" dictCode="img_type"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="图片风格" v-bind="validateInfos.imgStyle">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.imgStyle" dictCode="img_style"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="图片比例" v-bind="validateInfos.ratio">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.ratio" dictCode="ratio"/>
          </a-form-item>
        </a-col>
       
         </a-row>
         
      <a-row>
         <a-col :span="16">
                
                 <a-row>
       
        
          <a-col :span="24">
              <a-form-item :label-col="{span:3}" :wrapper-col="{span: 19}" label="辅助描述" v-bind="validateInfos.imgDesc">
	             <a-textarea v-model:value="formData.imgDesc" :rows="3" placeholder="请输入" :disabled="disabled"/>
               </a-form-item>
             </a-col>
         <a-col :span="24">
          <a-form-item :label-col="{span:4}" :wrapper-col="{span: 18}" label="单帖配图数" v-bind="validateInfos.imgReqNum">
	          <a-input-number v-model:value="formData.imgReqNum" placeholder="请输入" style="width: 100%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
         </a-row>
         
       </a-col>
        <a-col :span="8">
             <a-row >
              <a-col :span="24">
                <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 16}" label="参考图" v-bind="validateInfos.refImg">
	                <j-image-upload v-model:value="formData.refImg" :disabled="disabled"></j-image-upload>
                </a-form-item>
              </a-col>
             
            </a-row>
        </a-col>
  </a-row>
  
        </a-card>
        -->
    <a-card v-if="!disabled" title="AI生文" :bordered="false" style="margin-top:10px">        
        <template #extra>
            <a-button type="primary" preIcon="ant-design:plus-outlined" :loading="aiPostLoading" @click="aiPost">开始AI生文</a-button>
        </template>  
        <a-row >
        <a-col :span="24">
             <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}"  label="帖子内容"  v-bind="validateInfos.content">
             <a-textarea v-model:value="formData.content" :auto-size="{ minRows: 3, maxRows: 100 }" placeholder="帖子文本" :disabled="disabled"/>
          </a-form-item>
        </a-col>
      
      </a-row>
      <!--
        <a-row>
          <a-col :span="12">
           <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="AI生图" v-bind="validateInfos.path">
	           <ImagePreview :imageList="aiImgList" />
             <a-empty v-if="!aiImgListValue" :description="null"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-divider />
      -->
      </a-card>

      <a-card title="帖子配图" v-if="!disabled" :bordered="false" style="margin-top:10px">
          <template #extra>
            <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleImgSelect">检索图片库</a-button>
           
        </template>  
        <div style="display:inline!important">
          <span>是否换脸</span>
          <JSwitch v-model:value="formData.isFace" :options="['1', '0']"></JSwitch>
        </div>
       <ImagePreview @toDeleteImg="handleTotoDeleteImg" :imageList="imgLibPathArray" />
       <a-empty v-if="imgLibPathArray.length==0" :description="null"/>
    </a-card>
      </div>
    <!--预览帖子-->
    <a-card v-if="disabled" :hoverable="true" :title="formData.title" :bordered="true" style="width:100%">
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
  import { saveOrUpdate } from '../FansPost.api';
  import { queryRoleTempleById } from '../FansRoleTemple.api';
  import { faceSwap,headPhoto,role_key,gptChat,gptAssistants } from './AI.api';
  import { Form } from 'ant-design-vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { useDrawer } from '/@/components/Drawer';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
  import TagLib from '/@/components/fans/TagLib.vue';
  import JSwitch from '/@/components/Form/src/jeecg/components/JSwitch.vue';
  import { isEmpty, isArray } from '/@/utils/is';

  const [registerDrawer, { openDrawer }] = useDrawer();
  const aiPostLoading = ref<boolean>(false);
  const aiFaceLoading = ref<boolean>(false);
  //const currProfile= ref<String>('');//当前人设头像
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
    title:'',
    postDesc:'',
    roleId:'', 
    reqNum:1,
    imgReqNum:2,
    content:'',
    imgType:'',
    imgStyle:'',
    ratio:'',
    imgDesc:'',
    refImg:'',
    imgChoose:'manual',
    imgLibPath:'',
    path:'',
    imgPath:'',
    lang:'日语',
    emoji:'1',
    wordcount:100,
    isFace:'0',
    features:[{featureName:'',tagName:''}]
  });
  const aiImgList= ref<ImageProps[]>();//ai生成的图预览
  const aiImgListValue = ref(false);
  const imgLibPathArray= reactive<ImageProps>([]);//图片库中的图预览
              
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    title: [{ required: true, message: '请填写帖子标题!'},],
    roleId: [{ required: true, message: '请选择人设模版!'},],
    features:[{ required: true, message: '请填写帖子标签!'},],
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
    /*
    const date = new Date(); 
var year = date.getFullYear();
   var month = ('0' + (date.getMonth() + 1)).slice(-2);
   var day = ('0' + date.getDate()).slice(-2);
   var hours = ('0' + date.getHours()).slice(-2);
   var minutes = ('0' + date.getMinutes()).slice(-2);
   var seconds = ('0' + date.getSeconds()).slice(-2);
   var datetime= year +'-'+ month +'-'+ day +' '+ hours +':'+ minutes +':'+ seconds;
   console.log(datetime)
   */
     edit({ imgChoose:'manual',imgReqNum:2,reqNum:1,features:[{featureName:'',tagName:''}]});
  }

  /**
   * 编辑
   */
 async function edit(record) {
    nextTick(() => {
      //currProfile.value=''
      aiPostLoading.value=false
      resetFields();
      //赋值
      Object.assign(formData, record);
      
       //imgPath和formData.imgPathArray数据类型不一致，需要转换
      dbImgPath2ImagePreview(formData.imgPath)
      //currProfile
    });
  }
  //人设改变时的触发
  /*
function handleRoleTempleIdChange(e){
     //获取人设头像
     //console.log(e)
      if(e){
          queryRoleTempleById({id:e})
            .then((res) => {
                currProfile.value=res.profile
      })
      }
}
*/
//替换人脸
/*
async function handleChangeFaceImg(src){
   for(var i=0;i<imgLibPathArray.length;i++){
                    if(imgLibPathArray[i].src==src){
                      imgLibPathArray[i].spinning=true
                        break;
                    }
   }

if(!currProfile.value){
     createMessage.error("换脸所需人设头像不存在!");
    return;
  }
if(!imgLibPathArray || imgLibPathArray.length==0){
     createMessage.error("换脸所需目标图片不存在!");
    return;
  }
  let face=getFileAccessHttpUrl(currProfile.value)
if(isArray(src) && src.length>0){
  src=src[0]
}
  console.log(face)
  console.log(src)
  //face="http://52.76.246.31:39003/files/demo/2.jpg"
  //let src1="http://52.76.246.31:39003/files/demo/1.jpeg"
  
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
              for(var i=0;i<imgLibPathArray.length;i++){
                    if(imgLibPathArray[i].src==src){
                      imgLibPathArray[i].spinning=false
                        break;
                    }
                  }
          }).finally(() => {
          });
}
*/
//生成帖子
async function aiPost(){
  if(!formData.roleId){
     createMessage.error("AI生文前，请先选择人设模版！");
    return;
  }
  let obj = eval('(' + formData.features + ')')
   if(!obj || obj.length==0){
        createMessage.error('请将帖子标签填写完整！');
        return;
    }else{
        for(var i=0;i<obj.length;i++){
          if(obj[i].featureName==null ||obj[i].tagName==null || obj[i].featureName=='' || obj[i].tagName==''){
              createMessage.error('请将帖子标签填写完整！');
              return;
          }
        }
    }
  aiPostLoading.value=true
//获取人设对象，取得助手id和会话id
  await queryRoleTempleById({id:formData.roleId})
            .then((res) => {
               let params={}
               let str=''
               if(formData.wordcount>0){
                 str=str+'字数限制:'+formData.wordcount+'以内。'
               }
               if(formData.lang){
                 str=str+'语言输出:'+formData.lang+'。'
               }
               if(formData.emoji=='1'){
                 str=str+'文章内嵌入emoji表情。'
               }else{
                 str=str+'文章内不要嵌入emoji表情。'
               }
               if(formData.wordcount>0){
                 str=str+'字数限制:'+formData.wordcount+'以内。'
               }
               params.question='请写一遍文章。要求:'+makeSimpleFeatures(formData.features)+","+str+formData.postDesc

              let urlSuffix=res.assistantId+"/"+res.threadId
               gptChat(urlSuffix,params)
              .then((res) => {
              if(res && res.response){
                  createMessage.success("帖子内容生成成功！");
                  formData.content=res.response
               }else{
                  createMessage.error("帖子内容生成异常！");
                }
      }).catch((err) => {
          createMessage.error("帖子内容生成异常！"+err);
      }).finally(() => {
         aiPostLoading.value=false
      });

        })

  
   
}
//选择图片库图片后的触发事件
function handleImgSelected(record){
  let obj={src: getFileAccessHttpUrl(record.imgPath),width:120,spinning:false,btn:true,btnFace:false}
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
          let obj={src: getFileAccessHttpUrl(paths[i]), width: 120,spinning:false,btn:true,btnFace:false}
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
function makeSimpleFeatures(features){
    if(features==null || features==''){
      return ''
    }
    let str=''
    let obj = eval('(' + features + ')')
      if(isArray(obj)){
         for(var i=0;i<obj.length;i++){
            str=str+' '+obj[i].tagName
         }
      }
      return str
  }
  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
   /*
    if(!formData.title){
        createMessage.error('请填写帖子标题！');
         emit('validate');
        return;
    }
    if(!formData.roleId){
        createMessage.error('请选择人设模版！');
         emit('validate');
        return;
    }
    */
    let obj = eval('(' + formData.features + ')')
   if(!obj || obj.length==0){
        createMessage.error('请将帖子标签填写完整！');
        return;
    }else{
        for(var i=0;i<obj.length;i++){
          if(obj[i].featureName==null ||obj[i].tagName==null || obj[i].featureName=='' || obj[i].tagName==''){
              createMessage.error('请将帖子标签填写完整！');
              return;
          }
        }
    }
    
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
      isUpdate.value = true;
    }
 
     //ai还是人工
    //if(model.imgChoose=='ai' && unref(aiImgList) && unref(aiImgList).length>0){
      //  model.imgPath=unref(aiImgList)[0].src
    //}else{
     //   if(model.path && model.imgLibPath){
     //     model.imgPath=model.path + ','+model.imgLibPath
      //  }else if(model.path && !model.imgLibPath){
        //  model.imgPath=model.path
      //  }else if(!model.path && model.imgLibPath){
         // model.imgPath=model.imgLibPath
       // }
   // }
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
    }else{
      //配图全删除了
      formData.imgPath=''
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
  }
</style>