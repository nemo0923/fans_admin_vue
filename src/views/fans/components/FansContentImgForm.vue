<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <div style="background: #ececec; padding: 10px">
      <a-card title="图片摘要" :bordered="false">
        <a-row>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}" label="图片标题" v-bind="validateInfos.imgName">
            <a-input v-model:value="formData.imgName" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
       
         </a-row>
         <a-row>
       <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="人设模版" v-bind="validateInfos.roleId">
	          <j-dict-select-tag v-model:value="formData.roleId" dictCode="fans_role_temple,role_temple_name,id" @change="handleRoleTempleIdChange" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
         </a-row>
     
     <a-row>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="图片标签"  v-bind="validateInfos.features">
	          <TagLib v-model:value="formData.features" scene="图片"></TagLib>
          </a-form-item>
        </a-col>
     </a-row>
       <a-row>
         <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="图片分类" v-bind="validateInfos.imgType">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.imgType" dictCode="img_type"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="风格" v-bind="validateInfos.imgStyle">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.imgStyle" dictCode="img_style"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 14}" label="比例" v-bind="validateInfos.ratio">
	          <j-dict-select-tag placeholder="请选择" v-model:value="formData.ratio" dictCode="ratio"/>
          </a-form-item>
        </a-col>
       
         </a-row>
          </a-card>
  <a-card title="生成要求" :bordered="false" style="margin-top:10px">
      
      <a-row>
         <a-col :span="16">
                
                 <a-row>
       
        
          <a-col :span="24">
              <a-form-item :label-col="{span:3}" :wrapper-col="{span: 19}" label="辅助描述" v-bind="validateInfos.imgDesc">
	             <a-textarea v-model:value="formData.imgDesc" :rows="3" placeholder="请输入" :disabled="disabled"/>
               </a-form-item>
             </a-col>
         <a-col :span="24">
          <a-form-item :label-col="{span:3}" :wrapper-col="{span: 19}" label="生成数量" v-bind="validateInfos.reqNum">
	          <a-input-number v-model:value="formData.reqNum" placeholder="请输入" style="width: 100%" :disabled="disabled"/>
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
      
    <a-card title="AI生图" :bordered="false" style="margin-top:10px">  
      <template #extra>
           <a-button type="primary" style="margin-left:50px;margin-top:0px;" preIcon="ant-design:plus-outlined" @click="aiImg">开始AI生图</a-button>
        </template>      
          <a-row>
             
        <a-col :span="12">
           <a-form-item :label-col="{span: 6}" :wrapper-col="{span: 18}" label="人工传图" v-bind="validateInfos.path">
	          <j-image-upload v-model:value="formData.path" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>
     
          <a-col :span="12">
           <a-form-item :label-col="{span: 4}" :wrapper-col="{span: 20}" label="AI生图" v-bind="validateInfos.path">
	           <ImagePreview :imageList="aiImgList" />
             <a-empty v-if="!aiImgListValue" :description="null"/>
          </a-form-item>
        </a-col>
      </a-row>
       <a-row>
             
        <a-col :span="24">
           <a-form-item :label-col="{span: 8}" :wrapper-col="{span: 16}" label="决定" v-bind="validateInfos.path">
	          <j-dict-select-tag type="radio" placeholder="请选择" v-model:value="formData.imgChoose" dictCode="img_choose"/>
          </a-form-item>
        </a-col>
       </a-row>
    </a-card>
    </div>
    </a-form>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref,unref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
    import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';

  import { ImageProps } from '/@/components/Preview/src/typing';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
    import TagLib from '/@/components/fans/TagLib.vue';
  import { PageWrapper } from '/@/components/Page';
 
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../FansContentImg.api';
  import { Form } from 'ant-design-vue';
  
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
    imgName:'',
    imgDesc:'',
    roleId:'',
    imgStyle:'',
    path: '',   
    ratio: '',   
    refImg: '',   
    reqNum:1,
    imgType:'',
    imgPath:'',
    imgChoose:'manual',
    features:[{featureName:'',tagName:''}]
  });
  const aiImgList= ref<ImageProps[]>();
  const aiImgListValue = ref(false);
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
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

  
  /**
   * 新增
   */
  function add() {
    edit({ imgChoose:'manual',features:[{featureName:'',tagName:''}]});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
  }

function aiImg(){
  aiImgList.value=[]
  aiImgList.value.push({src:'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png', width:150 });
  aiImgListValue.value=true
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
    //ai还是人工
    if(model.imgChoose=='ai' && unref(aiImgList) && unref(aiImgList).length>0){
        model.imgPath=unref(aiImgList)[0].src
    }else{
        model.imgPath=model.path
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
  :where(.css-dev-only-do-not-override-1rytsjn).ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload-list.ant-upload-list-picture-card .ant-upload-list-item-container{
    width: 150px!important;
    height: 150px!important;
  }
</style>