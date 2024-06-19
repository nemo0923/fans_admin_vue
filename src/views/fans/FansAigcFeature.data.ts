import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '标签主题',
    align: "center",
    sorter: true,
    dataIndex: 'featureName_dictText'
  },
  {
    title: '标签名称',
    align: "center",
    sorter: true,
    dataIndex: 'tagName',
    customRender: ({ text }) => {
      return render.renderTag(text, 'blue');
    },
  },

  {
    title: '适用场景',
    align: "center",
    sorter: true,
    dataIndex: 'scene',
  },
  {
    title: '是否热点',
    align: "center",
    sorter: true,
    dataIndex: 'isHot',
     customRender: ({ text }) => {
      const word = text == '1' ? '热点' : '';
      const color = text == '1' ? 'red' : 'gray';
      return render.renderTag(word, color);
    },
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "标签主题",
    field: 'featureName',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "feature_name"
    },
    //colProps: {span: 6},
  },
  {
    label: "标签名称",
    field: 'tagName',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "是否热点",
    field: 'isHot',
    component: 'JSwitch',
    componentProps:{
    },
    //colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '标签主题',
    field: 'featureName',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "feature_name"
    },
  },
  {
    label: '标签名称',
    field: 'tagName',
    component: 'Input',
  },
  {
    label: '是否热点',
    field: 'isHot',
    component: 'JSwitch',
    componentProps:{
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
  featureName: {title: '标签主题',order: 0,view: 'list', type: 'string',dictCode: 'feature_name',},
  tagName: {title: '标签名称',order: 1,view: 'text', type: 'string',},
  isHot: {title: '是否热点',order: 2,view: 'number', type: 'number',},
};
