<template>
  <a-spin :spinning="confirmLoading">
    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <div style="background: #ececec; padding: 10px">
      <a-card title="图片信息" :bordered="false">
        
     
     
     <a-row>
        <a-col :span="24">
          <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}"  label="图片标签"  v-bind="validateInfos.features">
	          <TagLib v-model:value="formData.features" scene="图片"></TagLib>
          </a-form-item>
        </a-col>
     </a-row>
   <a-row>
      <a-col :span="24">
           <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 21}" label="上传图片" v-bind="validateInfos.paths">
	          <j-image-upload :fileMax="formData.id==''?100:1" v-model:value="formData.paths" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>
    </a-row>
    <a-row>
      <span v-if="formData.id==''" style="margin-left:85px">可上传多张图片，共同使用同一套标签</span>
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
  import { manuaUpload } from '../FansContentImg.api';
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
    paths: '',   
    features:[{featureName:'',tagName:''}]
  });
 
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);
  //表单验证
  const validatorRules = {
    features: [{ required: true, message: '请填写图片标签!'},],
    paths: [{ required: true, message: '请上传图片!'},],
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
    edit({ features:[{featureName:'',tagName:''}]});
  }

  /**
   * 编辑
   */
  function edit(record) {
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
      formData.paths=record.imgPath
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    await validate();
   
     let obj = eval('(' + formData.features + ')')
   if(!obj || obj.length==0){
        createMessage.error('请将图片标签填写完整！');
        return;
    }else{
        for(var i=0;i<obj.length;i++){
          if(obj[i].featureName==null ||obj[i].tagName==null || obj[i].featureName=='' || obj[i].tagName==''){
              createMessage.error('请将图片标签填写完整！');
              return;
          }
        }
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
     confirmLoading.value = true;
    await manuaUpload(model, isUpdate.value)
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