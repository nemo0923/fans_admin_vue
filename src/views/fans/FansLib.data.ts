import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '搜索信息',
    align: "left",
    sorter: true,
    width:'80px',
    dataIndex: 'searchUrl_dictText'
  },
  {
    title: '客群',
    align: "center",
    sorter: true,
    width:'40px',
    dataIndex: 'cg_dictText'
  },
  {
    title: '姓名',
    align: "left",
    sorter: true,
    width:'120px',
    dataIndex: 'name'
  },
  {
    title: '好友数',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'fansNum'
  },
  {
    title: '个人介绍',
    align: "left",
    sorter: true,
    width:'200px',
    dataIndex: 'info'
  },
  {
    title: '采集时间',
    align: "center",
    sorter: true,
    width:'80px',
    dataIndex: 'crawtime'
  },
  {
    title: '层',
    align: "center",
    sorter: true,
    width:'30px',
    dataIndex: 'fromLink',
    customRender: ({ text }) => {
      let color='yellow'
      let level='2'
      if(text == null || text == ''){
        level='1'
        color='green'
      }
      return render.renderTag(level, color);
    },
  },
  /*
  {
    title: '加粉账号',
    align: "center",
    sorter: true,
    width:'60px',
    dataIndex: 'account'
  },
  */
  {
    title: '状态',
    align: "center",
    sorter: true,
    width:'40px',
    dataIndex: 'searchState_dictText'
  },
  /*
  {
    title: '头像',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'profile',
    customRender: render.renderImage,
  },
  {
    title: '主页',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'link'
  },
   
  
  {
    title: '加粉时间',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'friendTime'
  },
  {
    title: '最近发私信内容',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'msgContent'
  },
  {
    title: '最近发私信时间',
    align: "center",
    sorter: true,
    width:'50px',
    dataIndex: 'msgTime'
  },
  */
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "搜粉url",
    field: 'searchUrl',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "fans_search,name,url"
    },
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
  {
    label: "姓名",
    field: 'name',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "采集时间",
    field: "crawtime",
    component: 'RangePicker',
    componentProps: {
      showTime: true,
    },
    //colProps: {span: 6},
  },
  {
    label: "状态",
    field: 'searchState',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "search_state"
    },
    //colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '客群',
    field: 'cg',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "cg"
    },
  },
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '好友信息',
    field: 'fansNum',
    component: 'Input',
  },
  {
    label: '头像',
    field: 'profile',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '主页',
    field: 'link',
    component: 'Input',
  },
  {
    label: '个人信息',
    field: 'info',
    component: 'Input',
  },
  {
    label: '上层好友链接',
    field: 'fromLink',
    component: 'Input',
  },
  {
    label: '采集时间',
    field: 'crawtime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '状态',
    field: 'searchState',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "search_state"
    },
  },
  {
    label: '已加好友账号',
    field: 'account',
    component: 'Input',
  },
  {
    label: '加好友时间',
    field: 'friendTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
    },
  },
  {
    label: '最近发私信内容',
    field: 'msgContent',
    component: 'InputTextArea',
  },
  {
    label: '最近发私信时间',
    field: 'msgTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss'
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
  cg: {title: '客群',order: 1,view: 'list', type: 'string',dictCode: 'fans_cg,code,code',},
  name: {title: '姓名',order: 2,view: 'text', type: 'string',},
  fansNum: {title: '好友信息',order: 3,view: 'text', type: 'string',},
  profile: {title: '头像',order: 4,view: 'image', type: 'string',},
  link: {title: '主页',order: 5,view: 'text', type: 'string',},
  info: {title: '个人信息',order: 6,view: 'text', type: 'string',},
  fromLink: {title: '上层好友链接',order: 7,view: 'text', type: 'string',},
  crawtime: {title: '采集时间',order: 8,view: 'datetime', type: 'string',},
  searchState: {title: '状态',order: 9,view: 'list', type: 'string',dictCode: 'search_state',},
  account: {title: '已加好友账号',order: 10,view: 'text', type: 'string',},
  friendTime: {title: '加好友时间',order: 11,view: 'datetime', type: 'string',},
  msgContent: {title: '最近发私信内容',order: 12,view: 'textarea', type: 'string',},
  msgTime: {title: '最近发私信时间',order: 13,view: 'datetime', type: 'string',},
};
