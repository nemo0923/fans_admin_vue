import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '国家',
    align: "center",
    sorter: true,
    dataIndex: 'country_dictText'
  },
  {
    title: '姓',
    align: "center",
    sorter: true,
    dataIndex: 'fname'
  },
  {
    title: '名',
    align: "center",
    sorter: true,
    dataIndex: 'name'
  },
  {
    title: '性别',
    align: "center",
    sorter: true,
    dataIndex: 'sex_dictText'
  },
  {
    title: 'FB是否使用',
    align: "center",
    sorter: true,
    dataIndex: 'fbUse_dictText'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '国家',
    field: 'country',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "country"
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入国家!'},
             ];
    },
  },
  {
    label: '姓',
    field: 'fname',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入姓!'},
             ];
    },
  },
  {
    label: '名',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入名!'},
             ];
    },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "sex"
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入性别!'},
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
  country: {title: '国家',order: 0,view: 'list', type: 'string',dictCode: 'country',},
  fname: {title: '姓',order: 1,view: 'text', type: 'string',},
  name: {title: '名',order: 2,view: 'text', type: 'string',},
  sex: {title: '性别',order: 3,view: 'list', type: 'string',dictCode: 'sex',},
  fbUse: {title: 'FB是否使用',order: 4,view: 'number', type: 'number',dictCode: 'yn',},
};
