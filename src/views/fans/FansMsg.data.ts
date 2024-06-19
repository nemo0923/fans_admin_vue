import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '粉丝账号',
    align: "center",
    dataIndex: 'fanAccount'
  },
  {
    title: '私信内容',
    align: "center",
    dataIndex: 'msg'
  },
  {
    title: '私信时间',
    align: "center",
    dataIndex: 'msgTime'
  },
  {
    title: '回复状态',
    align: "center",
    dataIndex: 'replyStatus'
  },
  {
    title: '回复内容',
    align: "center",
    dataIndex: 'replyContent'
  },
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '粉丝账号',
    field: 'fanAccount',
    component: 'Input',
  },
  {
    label: '私信内容',
    field: 'msg',
    component: 'Input',
  },
  {
    label: '私信时间',
    field: 'msgTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '回复状态',
    field: 'replyStatus',
    component: 'Input',
  },
  {
    label: '回复内容',
    field: 'replyContent',
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
  fanAccount: {title: '粉丝账号',order: 0,view: 'text', type: 'string',},
  msg: {title: '私信内容',order: 1,view: 'text', type: 'string',},
  msgTime: {title: '私信时间',order: 2,view: 'datetime', type: 'string',},
  replyStatus: {title: '回复状态',order: 3,view: 'text', type: 'string',},
  replyContent: {title: '回复内容',order: 4,view: 'text', type: 'string',},
};
