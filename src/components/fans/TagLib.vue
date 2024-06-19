<template>
  <template v-for="(item, index) in tagList['items']" :key="index">
    <div class="tagBox">
        <j-dict-select-tag v-model:value="item['featureName']" dictCode="feature_name" placeholder="选择标签主题" @change="emitChange" style="width:150px;margin-right:20px;" :disabled="disabled"/>
      <a-input v-model:value="item['tagName']" placeholder="填写标签名称"  style="width:190px;"
        @input="emitChange" />
       

      <div :span="4" >
        <Button v-if="index === 0" @click="add" type="primary" ghost>+</Button>
        <Button v-else @click="del(item)" type="primary" ghost>-</Button>
      </div>
    </div>
  </template>
</template>
<script lang="ts" setup name="TagLib">
import { watch, watchEffect, reactive, ref, toRefs, unref, UnwrapRef } from 'vue';
import { Button, Input, Select } from 'ant-design-vue';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { isEmpty, isArray } from '/@/utils/is';
import { useMessage } from '/@/hooks/web/useMessage';

interface Tag {
  featureName: string;
  tagName: string;
}

const emit = defineEmits(['change', 'update:value']);
  const { createMessage } = useMessage();
const props = defineProps({
  value: { type: String, default: '' },
  scene: { type: String, default: '' },
  isUpdate:{ type: Boolean, default: false },
});
const { scene, value,isUpdate} = toRefs(props);

const loading = ref(false);
const n = ref(1);
const tagList: UnwrapRef<{ items: Tag[] }> = reactive({ items: [] });

/*
watch(
  () => props.id,
  (newValue) => {
    if (newValue) {
      if (unref(isLook) || unref(isUpdate)) {
        handleGetDetail();
      }
    }
  }
);
*/

/**
 * 监听props值
 */
watchEffect(() => {
  initValue();
});
watch(
  () => value,
  (newValue) => {
    if (newValue !== null && unref(newValue) !== '') {
      const stepArray = isArray(newValue) ? newValue : JSON.parse(unref(newValue));
      if (stepArray != null && stepArray.length > 0) {
        tagList.items = stepArray
      } else {
        add();
      }
    } else {
      //新加载的，初始化为空
      clear();
    }
  },
);
/**
 * 数据初始化
 */
function initValue() {
    if (props.value) {
      const stepArray = isArray(unref(value)) ? unref(value) : JSON.parse(unref(value));
      tagList.items = stepArray;
    }else{
      addValue();
    }
}
//addValue();
async function handleGetDetail() {
  loading.value = true;
  const res = [];//await queryPvBizFixStepByMainId({ id: unref(id) });
  tagList.items = res;
  loading.value = false;
};

function clear() {
  tagList.items = [];
};
function addValue(){
  //校验上一个是否为空
  let obj=tagList.items[n.value-1]
  if( (obj && n.value>1 && (obj.featureName=='' || obj.tagName=='' || obj.featureName==null || obj.tagName==null))){
      createMessage.error('请完整填写标签信息');
      return
  }

  const item2 = {
    featureName: '',
    tagName: ''
  }
  tagList.items.push(item2);
  n.value++;
}
function add() {
  addValue();
  emitChange();
}

function del(item: Tag) {
  const index = tagList.items.indexOf(item);
  if (index !== -1) {
    tagList.items.splice(index, 1);
  }
  emitChange();
  n.value--;
}

function emitChange() {
  // let obj = {};
  // if (dynamicList.items.length > 0) {
  //   dynamicList.items.forEach((item) => {
  //     obj[item['label']] = item['value'];
  //   });
  // }

  console.log('tagList.items', tagList.items);

  emit('change', isEmpty(tagList.items) ? '' : JSON.stringify(tagList.items));
  emit('update:value', isEmpty(tagList.items) ? '' : JSON.stringify(tagList.items));
}
</script>
<style lang="less" scoped>
.tagBox {
  background: #ffffff;
  position: relative;
  display: flex;
  margin-bottom:8px;

  .count {
    background: #1890ff;
    border-radius: 8px 0px 8px 0px;
    width: 50px;
    height: 30px;
    line-height: 30px;
    color: #ffffff;
    position: absolute;
    left: 0;
    text-align: center;
  }

  .status {
    background: #afb4ba;
    border-radius: 0px 8px 0px 8px;
    width: 60px;
    height: 30px;
    position: absolute;
    right: 0;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
  }
}

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #1890ff;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #1890ff;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>