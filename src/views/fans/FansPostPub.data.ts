import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
 
 
  {
    title: '发布账号',
    align: "center",
    width:'70px',
    sorter: true,
    dataIndex: 'domainAccount'
  },
  
  {
    title: '人设信息',
    align: "left",
    sorter: true,
    width:'180px',
    dataIndex: 'roleId',
  },
  {
    title: '帖子标题',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'postTitle'
  },
  {
    title: '图',
    align: "left",
    sorter: true,
    width:'40px',
    dataIndex: 'imgPath'
  },
  {
    title: '点赞',
    align: "center",
    width:'50px',
    sorter: true,
    dataIndex: 'goodNum'
  },
  {
    title: '评论',
    align: "center",
    width:'50px',
    sorter: true,
    dataIndex: 'commentNum'
  },
  {
    title: '分享',
    align: "center",
    width:'50px',
    sorter: true,
    dataIndex: 'shareNum'
  },
  {
    title: '发布时间',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'publishTime'
  },
  {
    title: '状态',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'isPublish',
    customRender: ({ text }) => {
      return render.renderDictNative(
        text,
        [
          { label: '待发布', value: 'none', color: 'blue' },
          { label: '准备换脸', value: 'changeFace', color: 'yellow' },
          { label: '发布中', value: 'start', color: 'orange' },
          { label: '已发布', value: 'ok', color: 'green' },
          { label: '发布失败', value: 'error', color: 'red' },
        ],
        true
      );
    },
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '帖子id',
    field: 'postId',
    component: 'JEditor',
  },
  {
    label: '帖子标题',
    field: 'postTitle',
    component: 'JSelectMultiple',
    componentProps:{
        dictCode:"fans_role_temple,role_temple_name,id"
     },
  },
  {
    label: '关联人设',
    field: 'roleId',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '发布时间',
    field: 'publishTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '是否发布',
    field: 'isPublish',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "sync_status"
    },
  },
  {
    label: '发布平台',
    field: 'domain',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "domain"
    },
  },
  {
    label: '发布账号',
    field: 'domainAccout',
    component: 'JSearchSelect',
    componentProps:{
      dict: "fans_ctrl_account,username,username"
    },
  },
  {
    label: '点赞数',
    field: 'goodNum',
    component: 'InputNumber',
  },
  {
    label: '评论数',
    field: 'commentNum',
    component: 'InputNumber',
  },
  {
    label: '分享数',
    field: 'shareNum',
    component: 'InputNumber',
  },
	// TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
};
