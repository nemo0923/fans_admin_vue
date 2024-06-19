<template>
  <a-spin :spinning="confirmLoading">
    

    <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol">

 <a-row >
        <a-col :span="12">
          
           <a-form-item :label-col="{span: 5}" :wrapper-col="{span: 19}" label="模版名称" v-bind="validateInfos.roleTempleName">
            <a-input v-model:value="formData.roleTempleName" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <div style="background: #ececec; padding: 10px">
      <a-card title="基本人设内容" :bordered="false" style="margin-bottom:10px">
       
      <a-row >
         <a-col :span="6">
          <a-form-item label="姓名" :label-col="{span: 8}" :wrapper-col="{span: 12}" v-bind="validateInfos.name">
            <a-input v-model:value="formData.name" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
         <a-col :span="6">
          <a-form-item label="国家"  :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.country">
	          <j-dict-select-tag  v-model:value="formData.country" dictCode="country" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="性别" :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.sex">
	          <j-dict-select-tag v-model:value="formData.sex" dictCode="sex" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="年龄" :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.ages">
	          <j-dict-select-tag v-model:value="formData.ages" dictCode="ages" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
         </a-row>

            <a-row>
        
        <a-col :span="6">
          <a-form-item label="发色" :label-col="{span: 8}" :wrapper-col="{span: 12}"  v-bind="validateInfos.hairColor">
	          <j-dict-select-tag v-model:value="formData.hairColor" dictCode="hair_color" placeholder="请选择" :disabled="disabled"/>
          </a-form-item>
        </a-col>
       
       <a-col :span="4">
          <a-form-item label="身高"  :label-col="{span: 12}" :wrapper-col="{span: 4}"  v-bind="validateInfos.height">
	          <a-input-number v-model:value="formData.height" addonAfter="cm" placeholder="请输入" style="width:50%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="体重" :label-col="{span: 12}" :wrapper-col="{span: 4}"  v-bind="validateInfos.weight">
	          <a-input-number v-model:value="formData.weight" addonAfter="kg"  placeholder="请输入" style="width: 50%" :disabled="disabled"/>
          </a-form-item>
        </a-col>
 </a-row>
        <!--
        <a-col :span="8">
              <a-row>
          <a-col :span="24">
           <a-form-item :label-col="{span: 8}" :wrapper-col="{span: 16}" label="头像" v-bind="validateInfos.path">
	           <j-image-upload  v-model:value="formData.profile" :disabled="disabled"></j-image-upload>
          </a-form-item>
        </a-col>

      </a-row>

        </a-col>
        -->
 
          <a-row>
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
         </a-row>
          
        </a-card>
       
         <a-card title="高级人设内容" :bordered="false" style="margin-bottom:10px">
          <a-row>
         <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}" label="简介" v-bind="validateInfos.intro">
	          <a-textarea v-model:value="formData.intro" :rows="2" :auto-size="{ minRows: 2, maxRows: 6 }" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        
        
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="性格特点" v-bind="validateInfos.nature">
	          <a-input v-model:value="formData.nature" :rows="3" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="兴趣爱好" v-bind="validateInfos.interest">
            <a-input v-model:value="formData.interest" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
       <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="住址环境" v-bind="validateInfos.addrEnvironment">
            <a-input v-model:value="formData.addrEnvironment" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="常去餐厅" v-bind="validateInfos.restaurant">
            <a-input v-model:value="formData.restaurant" placeholder="请输入" :disabled="disabled"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="家庭成员"  v-bind="validateInfos.family">
	          <a-textarea v-model:value="formData.family" :rows="2" :auto-size="{ minRows: 2, maxRows: 6 }" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="工作经历" v-bind="validateInfos.profession">
	          <a-textarea v-model:value="formData.profession" :rows="2" :auto-size="{ minRows: 2, maxRows: 6 }" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="教育经历" v-bind="validateInfos.education">
	          <a-textarea v-model:value="formData.education" :rows="2" :auto-size="{ minRows: 2, maxRows: 6 }" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item :label-col="{span: 2}" :wrapper-col="{span: 21}"  label="感情经历" v-bind="validateInfos.love">
	          <a-textarea v-model:value="formData.love" :rows="2" :auto-size="{ minRows: 2, maxRows: 6 }" placeholder="请输入" :disabled="disabled"/>
          </a-form-item>
        </a-col>
              
      </a-row>
        </a-card>
        
         <a-card title="概括内容（prompt）" :bordered="false" style="margin-bottom:10px">
   
      <a-row>
        <a-col :span="24">
            <a-textarea v-model:value="formData.prompt" :auto-size="{ minRows:3, maxRows: 100 }" placeholder="" :disabled="disabled"/>
         
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
  import { saveOrUpdate } from '../FansRoleTemple.api';
  import { Form } from 'ant-design-vue';
     import { CollapseContainer } from '/@/components/Container';
import JMarkdownEditor from '/@/components/Form/src/jeecg/components/JMarkdownEditor.vue';

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
   
    sex: '',   
    religion: '',   
    ages: '',   
    income:'',
    bloodType: '',   
    constellation: '',   
    name: '',   
    englishName: '',   
    profile: '',   
    birthYm: '',   
    height: undefined,
    weight: undefined,
    chest: undefined,
    waistline: undefined,
    hipline: undefined,
    intro: '',   
    family: '',   
    nature: '',   
    interest: '',   
    ability: '',   
    profession: '',   
    love: '',   
    education: '',   
    addrEnvironment:'',
    restaurant:'',
    prompt:'',
  });
  const { createMessage } = useMessage();
  const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
  const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
  const confirmLoading = ref<boolean>(false);

   const validatorRules = {
    roleTempleName: [{ required: true, message: '请填写模版名称!'},],
    name: [{ required: true, message: '请填写姓名!'},],
    country: [{ required: true, message: '请选择国家!'},],
    ages: [{ required: true, message: '请选择年龄!'},],
    sex: [{ required: true, message: '请选择性别!'},],
    hairColor: [{ required: true, message: '请选择发色!'},],
     income: [{ required: true, message: '请选择年收入!'},],
      ability: [{ required: true, message: '请选择行业!'},],
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
    nextTick(() => {
      resetFields();
      //赋值
      Object.assign(formData, record);
    });
  }

  /**
   * 提交数据
   */
  async function submitForm() {
    // 触发表单验证
    //await validate();
    if(!formData.roleTempleName){
    createMessage.error("请填写模版名称！");
    emit('validate');
    return;
 }
   if(!formData.name){
    createMessage.error("请填写姓名！");
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
