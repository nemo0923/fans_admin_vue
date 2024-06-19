import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '客群名称',
    align: "center",
    dataIndex: 'code'
  },
  {
    title: '客群描述',
    align: "center",
    dataIndex: 'desr'
  },
  {
    title: '偏好关键字',
    align: "center",
    dataIndex: 'tags'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客群代码',
    field: 'code',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入客群代码!'},
              {...rules.duplicateCheckRule('fans_cg', 'code',model,schema)[0]},
             ];
    },
  },
  {
    label: '客群描述',
    field: 'desr',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入客群描述!'},
             ];
    },
  },
  {
    label: '偏好关键字',
    field: 'tags',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入偏好关键字!'},
             ];
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
  code: {title: '客群代码',order: 0,view: 'text', type: 'string',},
  desr: {title: '客群描述',order: 1,view: 'textarea', type: 'string',},
  tags: {title: '偏好关键字',order: 2,view: 'textarea', type: 'string',},
};
