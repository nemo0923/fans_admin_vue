import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '养号机id',
    align: "center",
    dataIndex: 'id'
  },
  {
    title: '养号机ip',
    align: "center",
    dataIndex: 'ip'
  },
  {
    title: '注册时间',
    align: "center",
    dataIndex: 'regtime'
  },
  {
    title: '最近活跃时间',
    align: "center",
    dataIndex: 'activetime'
  },
  {
    title: '活跃账号数',
    align: "center",
    dataIndex: 'onlineNum'
  },
  {
    title: '运行状态',
    align: "center",
    dataIndex: 'ctrlStatus_dictText'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '设备ip',
    field: 'ip',
    component: 'Input',
  },
  {
    label: '设备登记时间',
    field: 'regtime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '最近活跃时间',
    field: 'activetime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '在线账户数量',
    field: 'onlineNum',
    component: 'Input',
  },
  {
    label: '运行状态',
    field: 'ctrlStatus',
    component: 'JDictSelectTag',
      componentProps:{
        placeholder: '请选择',
          dictCode:"ctrl_status"
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
  ip: {title: '设备ip',order: 0,view: 'text', type: 'string',},
  regtime: {title: '设备登记时间',order: 1,view: 'datetime', type: 'string',},
  activetime: {title: '最近活跃时间',order: 2,view: 'datetime', type: 'string',},
  onlineNum: {title: '在线账户数量',order: 3,view: 'text', type: 'string',},
  ctrlStatus: {title: '运行状态',order: 4,view: 'text', type: 'string',},
};
