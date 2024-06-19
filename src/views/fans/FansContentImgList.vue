<template>
   
    <!--查询区域-->
    <div class="jeecg-basic-table-form-container" style="margin-top:20px;margin-left:20px">
      <a-form ref="formRef" @keyup.enter.native="searchQuery" :model="queryParam" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row :gutter="24">
          <!--
          <a-col :lg="5">
            <a-form-item name="fansCtrlNodeId" >
              <template #label><span title="图片标题">图片标题</span></template>
               <a-input v-model:value="queryParam.imgName" placeholder="请输入" ></a-input>
            </a-form-item>
          </a-col>
          -->
          <a-col :lg="10">
            <a-form-item name="fansCtrlNodeId" >
              <template #label><span title="图片标签">图片标签</span></template>
              <j-select-multiple placeholder="请选择" v-model:value="queryParam.features" dictCode="fans_aigc_feature where scene like '%图%' or scene like '%像%' or scene like '%照%',tag_name,tag_name"/>
            </a-form-item>
          </a-col>
          <a-col :lg="4">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-col :lg="4">
                <a-button type="primary" preIcon="ant-design:search-outlined" @click="searchQuery">查询</a-button>
                <a-button  preIcon="ant-design:reload-outlined" @click="searchReset" style="margin-left: 8px">重置</a-button>
                    <!--
                    <a-button type="primary" style="margin-left: 36px" @click="handleAdd" preIcon="ant-design:plus-outlined"> AI生成新图片</a-button>
                    -->
                    <a-button type="primary" style="margin-left: 36px" @click="handleUpload" preIcon="ant-design:plus-outlined"> 上传图片</a-button>
              </a-col>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

<a-divider style="margin:5px!important"/>
     <div style="background-color: #778899; padding:5px" class="list-card__content">
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
            <a-col :span="3">
              <a-list-item >
                <a-card :bordered="true" :loading="false" type="inner"   :hoverable="true" class="list-card__card" >
                   
                   <template #cover>
                     <div class="imgbox">
                      <img  :src="getFileAccessHttpUrl(item.imgPath)" />
                    </div>
                   </template>
                   <template #actions>
                     <edit-outlined @click="handleEditUpload(item)" key="edit" />
      <close-circle-outlined @click="handleDelete(item)" key="delete"/>
      
    </template>
                   <a-card-meta>
                     
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
 
    <!-- 表单区域 -->
    <FansContentImgModal ref="registerModal" @success="handleSuccess"></FansContentImgModal>
    <FansManualImgModal ref="registerModalManual" @success="handleSuccess"></FansManualImgModal>
  
</template>

<script lang="ts" name="content-fansContentImg" setup>
  import { onMounted, ref,createVNode, reactive,nextTick } from 'vue';
  import { columns, superQuerySchema } from './FansContentImg.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './FansContentImg.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import FansContentImgModal from './components/FansContentImgModal.vue'
  import FansManualImgModal from './components/FansManualImgModal.vue'
  import { LazyContainer } from '/@/components/Container/index';
  import { useUserStore } from '/@/store/modules/user';
  import JSelectMultiple from '/@/components/Form/src/jeecg/components/JSelectMultiple.vue';
    import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index';
  import { PageWrapper } from '/@/components/Page';
  import { ImageProps } from '/@/components/Preview/src/typing';
   import { getFileAccessHttpUrl, getHeaders, getRandom } from '/@/utils/common/compUtils';
   import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { isEmpty, isArray } from '/@/utils/is';

  const formRef = ref();
  const queryParam = reactive<any>({});
  const registerModal = ref();
  const registerModalManual = ref();
  const userStore = useUserStore();
  
  const initLoading = ref(true);
  const loading = ref(false);
const currpage = ref(1);
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
//http://ec2-52-76-246-31.ap-southeast-1.compute.amazonaws.com/fansAdmin/sys/common/static/
//getFileAccessHttpUrl
  const imgList= reactive<any>([]);
  /**
   * 新增事件
   */
  function handleAdd() {
    registerModal.value.disableSubmit = false;
    registerModal.value.add();
  }
  function handleUpload() {
    registerModalManual.value.disableSubmit = false;
    registerModalManual.value.add();
  }
  
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    registerModal.value.disableSubmit = false;
    registerModal.value.edit(record);
  }
  //编辑上传的图片
   function handleEditUpload(record: Recordable) {
    registerModalManual.value.disableSubmit = false;
    registerModalManual.value.edit(record);
  }
  //删除的图片
    function handleDelete(record: Recordable) {
      Modal.confirm({
    title: '确认删除?',
    icon: createVNode(CloseCircleOutlined),
    content: createVNode('div', { style: 'color:red;' }, ''),
    onOk() {
       deleteOne({ id: record.id }, handleSuccess);
    },
    onCancel() {
      
    },
    class: 'test',
  });
     
  }
   
  
   
  /**
   * 成功回调
   */
  function handleSuccess() {
    imgList.splice(0,imgList.length);
    query();
  }
   
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEditUpload.bind(null, record),
      },
    ];
  }
   
  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      }, {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        }
      }
    ]
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
   * 重置
   */
  function searchReset() {
    formRef.value.resetFields();
    queryParam.imgName=null
    queryParam.features=null
    imgList.splice(0,imgList.length);
    query();
  }
  function query() {
    
    queryParam.pageSize=32
    queryParam.pageNo=currpage.value
    list(queryParam)
      .then((res) => {
     //   delete res.id;//模版id删除，都叫id，以免覆盖到账号id上
       // console.log(res)
       // Object.assign(formData, res);

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
