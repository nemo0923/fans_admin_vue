<template>
  <a-modal :confirmLoading="okLoading" :maskClosable="false" :title="title" :width="width" :visible="visible" @ok="handleOk" :okButtonProps="{ class: { 'jee-hidden': disableSubmit } }" @cancel="handleCancel" cancelText="关闭">
    <FansPostForm ref="registerForm"  @ok="submitCallback" :formDisabled="disableSubmit" :formBpm="false"></FansPostForm>
  </a-modal>
</template>

<script lang="ts" setup>
  import { createFalse } from 'typescript';
import { ref, nextTick, defineExpose } from 'vue';
  import FansPostForm from './FansPostForm.vue'
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
    title.value = 'AI生成新帖子';
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
    title.value = disableSubmit.value ? '预览' : '调整';
    visible.value = true;
    nextTick(() => {
      registerForm.value.edit(record);
    });
  }
  
  /**
   * 确定按钮点击事件
   */
  function handleOk() {
     //      okLoading.value=true
    registerForm.value.submitForm();
  }
 /**
   * 确定按钮点击后检验不通过
  
  function handleValidate() {
           okLoading.value=false
  }
 */
  /**
   * form保存回调事件
   */
  function submitCallback() {
   //       okLoading.value=false
    handleCancel();
    emit('success');
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
