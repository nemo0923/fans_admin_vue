import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '计划名称',
    align: "center",
    dataIndex: 'name',
    sorter: true,
    width:'100px',
  },
  {
    title: '客群',
    align: "center",
    dataIndex: 'cg_dictText',
    sorter: true,
    width:'50px',
  },
  {
    title: '搜索网址',
    align: "center",
    sorter: true,
    width:'300px',
    dataIndex: 'url'
  },
  {
    title: '已搜索数量',
    align: "center",
    sorter: true,
    width:'60px',
    dataIndex: 'userNum'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "计划名称",
    field: 'name',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "客群",
    field: 'cg',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "cg"
    },
    //colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '计划名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入计划名称!'},
             ];
    },
  },
  {
    label: '客群',
    field: 'cg',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "cg"
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入客群!'},
             ];
    },
  },
  {
    label: '搜索网址',
    field: 'url',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入搜索网址!'},
             ];
    },
  },
  {
    label: '计划数量',
    field: 'planUserNum',
    component: 'InputNumber',
  },
  {
    label: '实际数量',
    field: 'userNum',
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
  name: {title: '计划名称',order: 0,view: 'text', type: 'string',},
  cg: {title: '客群',order: 1,view: 'radio', type: 'string',},
  url: {title: '搜索网址',order: 2,view: 'text', type: 'string',},
  planUserNum: {title: '计划数量',order: 3,view: 'number', type: 'number',},
  userNum: {title: '实际数量',order: 4,view: 'number', type: 'number',},
};
