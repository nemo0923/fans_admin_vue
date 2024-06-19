import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  
  {
    title: '好友信息',
    align: "left",
    sorter: true,
    width:'100px',
    dataIndex: 'fansNickname'
  },
  {
    title: '关系',
    align: "center",
    sorter: true,
    width:'60px',
    dataIndex: 'joinWay'
  },
  {
    title: '加粉时间',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'joinTime'
  },
  /*
  {
    title: '最近互动时间',
    align: "center",
    sorter: true,
    width:'100px',
    dataIndex: 'interactTime'
  },
  {
    title: '私信数',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'msgNum'
  },
  */
];

//查询数据
export const searchFormSchema: FormSchema[] = [
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '粉丝账号',
    field: 'fansAccount',
    component: 'Input',
  },
  {
    label: '最近消息时间',
    field: 'msgTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '状态',
    field: 'fansStatus',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "fans_status"
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
  fansAccount: {title: '粉丝账号',order: 0,view: 'text', type: 'string',},
  msgTime: {title: '最近消息时间',order: 1,view: 'datetime', type: 'string',},
  fansStatus: {title: '状态',order: 2,view: 'list', type: 'string',dictCode: 'fans_status',},
};
