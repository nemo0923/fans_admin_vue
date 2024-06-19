<template>
  <div :class="prefixCls">
    <PreviewGroup >
      <slot v-if="!imageList || $slots.default"></slot>
      <template v-else>
        <template  v-for="item in getImageList" :key="item.src">
          <div style="display: inline-block;">
          <a-spin :spinning="item.spinning">
          <Image v-bind="item">
            <template #placeholder v-if="item.placeholder">
              <Image v-bind="item" :src="item.placeholder" :preview="false" />
            </template>
          </Image>
          <div  style="display: flex;flex-direction: row">
            <a-popconfirm v-if="item.btn" title="是否确定删除"  @confirm="deleteImg(item.src)">
                <template #icon><question-circle-outlined style="color: red" /></template>
                <CloseSquareFilled :style="{color:'#0096c7',fontSize:'25px',marginLeft:'40px',marginRight:'10px',marginTop:'2px'}"/>
              </a-popconfirm>
            <a-popconfirm v-if="item.btnFace" title="是否确定换脸"  @confirm="changeFaceImg(item.src)">
                <template #icon><question-circle-outlined style="color: red" /></template>
                <PictureFilled :style="{color:'#0096c7',fontSize:'25px',marginTop:'2px'}" />
              </a-popconfirm>
             
          </div>
           </a-spin>
          </div>
        </template>
      </template>
    </PreviewGroup>
  </div>
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, defineEmits,computed } from 'vue';
  import { CloseSquareFilled,PictureFilled } from '@ant-design/icons-vue';
  import { Image } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  import { isString } from '/@/utils/is';
  interface ImageProps {
    alt?: string;
    fallback?: string;
    src: string;
    width: string | number;
    height?: string | number;
    spinning?: boolean;
    btn?: boolean;
    btnFace?: boolean;
    placeholder?: string | boolean;
    preview?:
      | boolean
      | {
          visible?: boolean;
          onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
          getContainer: string | HTMLElement | (() => HTMLElement);
        };
  }

  type ImageItem = string | ImageProps;

  export default defineComponent({
    name: 'ImagePreview',
    components: {
      Image,
      CloseSquareFilled,
      PictureFilled,
      PreviewGroup: Image.PreviewGroup,
    },
    props: {
      functional: propTypes.bool,
      imageList: {
        type: Array as PropType<ImageItem[]>,
      },
    },
    setup(props,{ emit }) {
      const { prefixCls } = useDesign('image-preview');
     // const emit = defineEmits(['toDeleteImg']);

      const deleteImg = function (src) {
             emit('toDeleteImg',src);
        };
      const changeFaceImg = function (src) {
             emit('toChangeFaceImg',src);
        };
        
      const getImageList = computed((): any[] => {
        const { imageList } = props;
        if (!imageList) {
          return [];
        }
        return imageList.map((item) => {
          if (isString(item)) {
            return {
              src: item,
              placeholder: true,
              spinning:false,
              btn:false,
              btnFace:false,
            };
          }
          return item;
        });
      });

      return {
        deleteImg,
        changeFaceImg,
        prefixCls,
        getImageList,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-image-preview';

  .@{prefix-cls} {
    .ant-image {
      margin-right: 5px;
      margin-left: 5px;
    }

    .ant-image-preview-operations {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
</style>
