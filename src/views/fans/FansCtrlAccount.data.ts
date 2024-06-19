import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import {JVxeTypes,JVxeColumn} from '/@/components/jeecg/JVxeTable/types'
//列表数据
export const columns: BasicColumn[] = [

   {
    title: '登录账号',
    align:"center",
    width:'100px',
    sorter: true,
    dataIndex: 'username'
   },
   /*
   {
    title: '类型',
    align:"center",
    width:'60px',
    sorter: true,
    dataIndex: 'accountType_dictText'
   },
   */
   {
    title: '客群',
    align:"center",
    width:'60px',
    sorter: true,
    dataIndex: 'cg_dictText'
   },
   {
    title: '人设信息',
    align:"left",
    width:'250px',
    dataIndex: 'name'
   },
   {
    title: '账号登记时间',
    align: "center",
    width:'120px',
    sorter: true,
    dataIndex: 'createTime'
  },
   {
    title: '最近活跃时间',
    align: "center",
    width:'120px',
    sorter: true,
    dataIndex: 'activetime'
  },
  {
    title: '发帖',
    align:"center",
    sorter: true,
    width:'60px',
    dataIndex: 'postNum'
   },
   /*
   {
    title: '点赞',
    align:"center",
    width:'60px',
    sorter: true,
    dataIndex: 'goodNum'
   },
   
   {
    title: '粉丝',
    align:"center",
    width:'60px',
    sorter: true,
    dataIndex: 'fansNum'
   },
   */
   {
    title: '好友',
    width:'60px',
    align:"center",
    sorter: true,
    dataIndex: 'friendNum'
   },
   {
    title: '状态',
    align:"left",
    sorter: true,
    width:'60px',
    dataIndex: 'onlineStatus',
    customRender: ({ text }) => {
      let color='green'
      if(text == 'error'){
        color='red'
      }
      if(text == 'init'){
        color='yellow'
      }
      return render.renderTag(render.renderDict(text, 'online_status'), color);
    },
   },
   {
    title: '上号',
    align:"left",
    sorter: true,
    width:'70px',
    dataIndex: 'mountState',
    customRender: ({ text }) => {
      let color='yellow'
      if(text == 'ok'){
        color='green'
      }
      return render.renderTag(render.renderDict(text, 'mount_state'), color);
    },
   },
   
   
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "养号设备",
      field: "fansCtrlNodeId",
      component: 'JDictSelectTag',
      componentProps:{
          placeholder: '请选择',
          dictCode:"fans_ctrl_node,ip,ip"
      },
      colProps: {span: 3},
 	},
	{
      label: "登录账号",
      field: "username",
      component: 'Input',
      componentProps:{
        placeholder: '请输入',
      },
      colProps: {span: 3},
 	},
	{
      label: "关联人设",
      field: "roleTempleId",
      component: 'JDictSelectTag',
      componentProps:{
        placeholder: '请选择',
          dictCode:"fans_role_temple,role_temple_name,id"
      },
      colProps: {span: 3},
 	},
	{
      label: "在线状态",
      field: "onlineStatus",
      component: 'JDictSelectTag',
      componentProps:{
        placeholder: '请选择',
          dictCode:"online_status"
      },
      colProps: {span: 3},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '养号所在设备',
    field: 'fansCtrlNodeId',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"fans_ctrl_node,ip,ip"
     },
  },

  {
    label: '浏览器账号',
    field: 'browserNo',
    component: 'Input',
  },
 
  {
    label: '平台域名',
    field: 'fansDomain',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"fans_domain"
     },
  },
  {
    label: '平台账号名',
    field: 'username',
    component: 'Input',
  },

  {
    label: '关联人设模版',
    field: 'roleTempleId',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"fans_role_temple,role_temple_name,id"
     },
  },
  {
    label: '具体人设信息',
    field: 'roleDetail',
    component: 'JEditor',
  },
  {
    label: '最近活跃时间',
    field: 'activetime',
    component: 'DatePicker',
    componentProps: {
       showTime:true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '账号在线状态',
    field: 'onlineStatus',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"online_status"
     },
  },
  {
    label: '头像',
    field: 'profile',
     component: 'JImageUpload',
     componentProps:{
      },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"sex"
     },
  },
  {
    label: '简介',
    field: 'intro',
    component: 'InputTextArea',
  },
  {
    label: '好友数',
    field: 'friendNum',
    component: 'InputNumber',
  },
  {
    label: '本国姓名',
    field: 'name',
    component: 'Input',
  },
  {
    label: '英文姓名',
    field: 'englishName',
    component: 'Input',
  },
  {
    label: '国家',
    field: 'country',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"country"
     },
  },
  {
    label: '年龄段',
    field: 'ages',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"ages"
     },
  },
  {
    label: '宗教信仰',
    field: 'religion',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"religion"
     },
  },
  {
    label: '星座',
    field: 'constellation',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"constellation"
     },
  },
  {
    label: '血型',
    field: 'bloodType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"blood_type"
     },
  },
  {
    label: '胸围',
    field: 'chest',
    component: 'InputNumber',
  },
  {
    label: '腰围',
    field: 'waistline',
    component: 'InputNumber',
  },
  {
    label: '臀围',
    field: 'hipline',
    component: 'InputNumber',
  },
  {
    label: '身高',
    field: 'height',
    component: 'InputNumber',
  },
  {
    label: '体重',
    field: 'weight',
    component: 'InputNumber',
  },
  {
    label: '家庭成员',
    field: 'family',
    component: 'InputTextArea',
  },
  {
    label: '兴趣爱好',
    field: 'interest',
    component: 'Input',
  },
  {
    label: '职业身份',
    field: 'ability',
    component: 'Input',
  },
  {
    label: '职业经历',
    field: 'profession',
    component: 'InputTextArea',
  },
  {
    label: '教育经历',
    field: 'education',
    component: 'InputTextArea',
  },
  {
    label: '感情经历',
    field: 'love',
    component: 'InputTextArea',
  },
  {
    label: '性格特点',
    field: 'nature',
    component: 'InputTextArea',
  },
  {
    label: '出生年月',
    field: 'birthYm',
    component: 'DatePicker',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];


// 高级查询数据
export const superQuerySchema = {
  
};
