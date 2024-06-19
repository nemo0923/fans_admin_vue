<template>
  <a-modal :confirmLoading="okLoading" :maskClosable="false" :title="title" :width="width" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel" cancelText="关闭">
    <FansRoleTempleForm ref="registerForm" @validate="handelValidate" @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false"></FansRoleTempleForm>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, nextTick, defineExpose } from 'vue';
  import FansRoleTempleForm from './FansRoleTempleForm.vue'
        const okLoading = ref<boolean>(false);
  const title = ref<string>('');
  const width = ref<number>(900);
  const visible = ref<boolean>(false);
  const disableSubmit = ref<boolean>(false);
  const registerForm = ref();
  const emit = defineEmits(['register', 'success']);

  /**
   * 新增
   */
  function add() {
    title.value = '人工建立人设';
    visible.value = true;
    nextTick(() => {
      registerForm.value.add();
    });
  }
  
  /**
   * 编辑
   * @param record
   */
  function edit(record) {
    title.value = disableSubmit.value ? '详情' : '人工完善';
    visible.value = true;
    nextTick(() => {
      registerForm.value.edit(record);
    });
  }
  
  /**
   * 确定按钮点击事件
   */
  function handleOk() {
          okLoading.value=true
    registerForm.value.submitForm();
  }

  /**
   * form保存回调事件
   */
  function submitCallback() {
      okLoading.value=false
    handleCancel();
    emit('success');
  }
/**
   * 校验不通过事件
   */
  function handelValidate() {
    okLoading.value=false
  }
  /**
   * 取消按钮回调事件
   */
  function handleCancel() {
    visible.value = false;
  }

  defineExpose({
    add,
    edit,
    disableSubmit,
  });
</script>

<style>
  /**隐藏样式-modal确定按钮 */
  .jee-hidden {
    display: none !important;
  }
</style>
