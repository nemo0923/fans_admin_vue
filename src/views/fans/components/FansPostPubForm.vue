<template>
  <a-spin :spinning="confirmLoading">
    <!--预览帖子-->
    <a-card  :hoverable="true" :title="formData.postTitle" :bordered="true" style="width:100%">
      <div v-html="formData.content"></div>
      <a-divider/>
      <div>
       <ImagePreview :imageList="imgLibPathArray" />
       </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JSearchSelect from '/@/components/Form/src/jeecg/components/JSearchSelect.vue';
  import JImageUpload from '/@/components/Form/src/jeecg/components/JImageUpload.vue';
  import JEditor from '/@/components/Form/src/jeecg/components/JEditor.vue';
  import { isEmpty, isArray } from '/@/utils/is';
  import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { ImageProps } from '/@/components/Preview/src/typing';
  import { queryPostById } from '../FansPost.api';
  import { getValueType } from '/@/utils';
  import { saveOrUpdate } from '../FansPostPub.api';
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
    postId: '',   
    postTitle: '',   
    content: '',   
    imgPath:'',
  });
    const imgLibPathArray= reactive<ImageProps>([]);//图片库中的图预览
              
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
    edit({});
  }

  /**
   * 编辑
   */
  function edit(record) {
    confirmLoading.value = true;
    nextTick(() => {
      resetFields();
          queryPostById({id:record.postId})
            .then((res) => {
            //赋值 
            let obj={}
            obj.id=record.id
            obj.postId=record.postId
            obj.postTitle=record.postTitle
            obj.content=res.content
            obj.imgPath=res.imgPath
            Object.assign(formData, obj);
            dbImgPath2ImagePreview(formData.imgPath);
            confirmLoading.value = false;
      }).finally(() => {
        confirmLoading.value = false;
      });
    });
}
//数据库中图片库存储路径转成专用格式
function dbImgPath2ImagePreview(imgPath){
   imgLibPathArray.splice(0);//先清空，再重新赋值覆盖
  if(imgPath){
      let paths=imgPath.split(',');
      for(var i=0;i<paths.length;i++){
          let obj={src: getFileAccessHttpUrl(paths[i]), width: 120,spinning:false,btn:false,btnFace:false}
          imgLibPathArray.push(obj);
      }
  }
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
    height: 500px !important;
    overflow-y: auto;
    padding: 14px;
  }
</style>
