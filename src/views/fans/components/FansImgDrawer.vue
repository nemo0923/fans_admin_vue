<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="getTitle"
    :width="600"
    :showFooter="false"
    destroyOnClose
  >
   <!--查询区域-->
    <div class="jeecg-basic-table-form-container" style="margin-top:20px;margin-left:20px">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <a-col :lg="15">
            <a-form-item :label-col="{span: 3}" :wrapper-col="{span: 20}" name="features" >
              <template #label><span title="标签">标签</span></template>
             <j-select-multiple placeholder="请选择" v-model:value="queryParam.features" dictCode="fans_aigc_feature where scene like '%图%' or scene like '%像%' or scene like '%照%',tag_name,tag_name"/>
            </a-form-item>
          </a-col>
          <a-col :lg="4">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="4">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button  preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

<a-divider style="margin:5px!important"/>
     <div class="list-card__content">
        <LazyContainer transitionName="imgList">
      <a-list :bordered="true">
          <template #loadMore>
      <div
        v-if="!initLoading && !loading"
        :style="{ textAlign: 'center', marginTop: '12px',  marginBottom: '12px', height: '32px', lineHeight: '32px' }"
      >
        <a-button  type="primary" @click="onLoadMore">加载更多</a-button>
      </div>
    </template>
        <a-row :gutter="16">
          <template v-for="item in imgList" :key="item.id">
            <a-col :span="6">
              <a-list-item>
                <a-card size="small" @click="handleSelect(item)" :hoverable="true" class="list-card__card" >
                   <template #cover>
                    <div class="imgbox">
                      <img  :src="getFileAccessHttpUrl(item.imgPath)" />
                     </div>
                   </template>
                   <a-card-meta >
                       <template #description>{{makeSimpleFeatures(item.features)}}</template>
                   </a-card-meta>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
        </LazyContainer>
    </div>
 
       
  </BasicDrawer>
</template>
<script lang="ts" setup>
 import { Tag, Avatar } from 'ant-design-vue';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
 import { columns } from '../FansContentImg.data';
  import { list,listAll } from '../FansContentImg.api';
  import { onMounted, ref, reactive,nextTick,computed } from 'vue';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansContentImgModal from './components/FansContentImgModal.vue'
  import { useUserStore } from '/@/store/modules/user';
    import { LazyContainer } from '/@/components/Container/index';

  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
  import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { PageWrapper } from '/@/components/Page';
  import { ImageProps } from '/@/components/Preview/src/typing';
   import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
import { isEmpty, isArray } from '/@/utils/is';

const currpage = ref(1);
  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();
  const userStore = useUserStore();
  
  const initLoading = ref(true);
  const loading = ref(false);

  const labelCol = reactive({
    xs:24,
    sm:4,
    xl:6,
    xxl:4
  });
  const wrapperCol = reactive({
    xs: 24,
    sm: 20,
  });

const emit = defineEmits(['success', 'register']);
const imgList= reactive<any>([]);

const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, showFooter:false});
    loading.value = true;
    //account.value = data.record;
    //searchInfo.username = account.value.username;
    //reload();
    searchReset();
  });
const getTitle = computed(() => ('检索图片库'));

function handleSuccess() {
    query();
  }
function handleSelect(record: Recordable){
  // 已经选择的回传给弹出框
  emit('imgSelected',record);
  //closeDrawer();
  
}
onMounted(() => {
    initLoading.value = false;
    imgList.splice(0,imgList.length);
    query();
  });
    const onLoadMore = () => {
  loading.value = true;
  currpage.value++;
  query();

};
  /**
   * 查询
   */
  function searchQuery() {
       imgList.splice(0,imgList.length);
   query();
  }
  
  /**
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    queryParam.features=null
       imgList.splice(0,imgList.length);
    query();
  }
  function query() {
    queryParam.pageSize=32
    queryParam.pageNo=currpage.value
    list(queryParam)
      .then((res) => {
       
       if(res && res.records && res.records.length>0){
         nextTick(() => {
           // Object.assign(imgList, res.records);
            const newData = imgList.concat(res.records);
     
            Object.assign(imgList, newData);
         //   for(var i=0;i<res.records.length;i++){
               // imgList.push(res.records[i])
         //   }
           //console.log(imgList)
            loading.value = false;
         })
       }else{
          loading.value = true;
       }

      })
   
  }
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
</script>

<style lang="less" scoped>
.imgbox img {
  width: 150px; 
  height: 200px;
  object-fit: contain; 
}

  .jeecg-basic-table-form-container {
    padding: 0;
    .table-page-search-submitButtons {
      display: block;
      margin-bottom: 24px;
      white-space: nowrap;
    }
    .query-group-cust{
      min-width: 100px !important;
    }
    .query-group-split-cust{
      width: 30px;
      display: inline-block;
      text-align: center
    }
  }
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: 500;
        color: @text-color;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color-secondary;
      }
    }
  }
</style>