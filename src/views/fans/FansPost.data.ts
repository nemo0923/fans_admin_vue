import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '帖子标题',
    align: "left",
    sorter: true,
    width:'170px',
    dataIndex: 'title',
  },
  {
    title: '人设模版',
    align: "left",
    sorter: true,
    width:'80px',
    dataIndex: 'roleId_dictText'
  },
  {
    title: '帖子标签',
    align: "left",
    sorter: true,
    width:'100px',
    dataIndex: 'features'
  },
  {
    title: '配图',
    align: "left",
    sorter: true,
    width:'40px',
    dataIndex: 'imgPath'
  },
  {
    title: '生成时间',
    align: "center",
    sorter: true,
    width:'90px',
    dataIndex: 'genarateTime'
  },
  {
    title: '状态',
    align: "center",
    sorter: true,
    width:'60px',
    dataIndex: 'isFinish',
    customRender: ({ text }) => {
      return render.renderDictNative(
        text,
        [
          { label: '未生效', value: '0', color: 'red' },
          { label: '已生效', value: '1', color: 'green' },
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
    label: '帖子内容',
    field: 'content',
    component: 'JEditor',
  },
  {
    label: '生成方式',
    field: 'genarateWay',
    component: 'Input',
  },
  {
    label: '生成时间',
    field: 'genarateTime',
    component: 'Input',
  },
  {
    label: '使用图片',
    field: 'imgs',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '引用主题',
    field: 'features',
    component: 'JSelectMultiple',
    componentProps:{
        dictCode:"fans_aigc_feature,feature_name,feature_name"
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
      dictCode: "yn"
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
  content: {title: '帖子内容',order: 0,view: 'umeditor', type: 'string',},
  genarateWay: {title: '生成方式',order: 1,view: 'text', type: 'string',},
};
