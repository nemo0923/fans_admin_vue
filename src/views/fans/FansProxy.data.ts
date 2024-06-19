import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '代理国家',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'country_dictText'
  },
  {
    title: '代理平台',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'proxySoft_dictText'
  },
  {
    title: '代理地址',
    align: "center",
    sorter: true,
    width:'400px',
    dataIndex: 'proxyName'
  },
  {
    title: '创建日期',
    align: "center",
    sorter: true,
    width:'200px',
    dataIndex: 'createTime'
  },
  {
    title: 'FB账号数',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'fbUseNum'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '代理国家',
    field: 'country',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "country"
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入代理国家!'},
             ];
    },
  },
  {
    label: '代理平台',
    field: 'proxySoft',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "proxy_soft"
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入代理平台!'},
             ];
    },
  },
  {
    label: '代理类型',
    field: 'proxyType',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "proxy_type"
    },
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入代理类型!'},
             ];
    },
  },
  {
    label: '代理ip',
    field: 'proxyHost',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入代理ip!'},
             ];
    },
  },
  {
    label: '代理端口',
    field: 'proxyPort',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
              { required: true, message: '请输入代理端口!'},
             ];
    },
  },
  {
    label: '代理账号',
    field: 'proxyUser',
    component: 'Input',
  },
  {
    label: '代理密码',
    field: 'proxyPassword',
    component: 'Input',
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
  country: {title: '代理国家',order: 0,view: 'list', type: 'string',dictCode: 'country',},
  proxySoft: {title: '代理平台',order: 1,view: 'list', type: 'string',dictCode: 'proxy_soft',},
  proxyName: {title: '代理地址',order: 2,view: 'text', type: 'string',},
  createTime: {title: '创建日期',order: 4,view: 'datetime', type: 'string',},
  fbUseNum: {title: 'FB账号数',order: 9,view: 'number', type: 'number',},
};
