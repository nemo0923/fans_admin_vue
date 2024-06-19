import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '图片存储地址',
    align: "center",
    dataIndex: 'path'
  },
  {
    title: '图片生成时间',
    align: "center",
    dataIndex: 'genarateTime'
  },
  {
    title: '生成方式',
    align: "center",
    dataIndex: 'genarateWay'
  },
  {
    title: '使用数量',
    align: "center",
    dataIndex: 'useNum'
  },
  {
    title: '比例',
    align: "center",
    dataIndex: 'ratio'
  },
  {
    title: 'AI参照图片',
    align: "center",
    dataIndex: 'refImg',
    customRender: render.renderImage,
  },
  {
    title: '引用主题',
    align: "center",
    dataIndex: 'features_dictText'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '图片存储地址',
    field: 'path',
    component: 'Input',
  },
  {
    label: '图片生成时间',
    field: 'genarateTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '生成方式',
    field: 'genarateWay',
    component: 'Input',
  },
  {
    label: '使用数量',
    field: 'useNum',
    component: 'InputNumber',
  },
  {
    label: '比例',
    field: 'ratio',
    component: 'Input',
  },
  {
    label: 'AI参照图片',
    field: 'refImg',
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
  path: {title: '图片存储地址',order: 0,view: 'text', type: 'string',},
  genarateTime: {title: '图片生成时间',order: 1,view: 'datetime', type: 'string',},
  genarateWay: {title: '生成方式',order: 2,view: 'text', type: 'string',},
  useNum: {title: '使用数量',order: 3,view: 'number', type: 'number',},
  ratio: {title: '比例',order: 4,view: 'text', type: 'string',},
  refImg: {title: 'AI参照图片',order: 5,view: 'image', type: 'string',},
  features: {title: '引用主题',order: 6,view: 'list_multi', type: 'string',dictTable: 'fans_aigc_feature', dictCode: 'feature_name', dictText: 'feature_name',},
};
