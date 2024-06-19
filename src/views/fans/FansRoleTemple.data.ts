import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '人设模版名称',
    align: "center",
    width:'180px',
    dataIndex: 'roleTempleName'
  },
  {
    title: '生成时间',
    align: "center",
    dataIndex: 'genareteTime',
    width:'140px',
    customRender:({text}) =>{
      return text;
    },
  },
  
 
  {
    title: '姓名',
    align: "center",
    width:'120px',
    dataIndex: 'name'
  },
  {
    title: '性别',
    align: "center",
    width:'50px',
    dataIndex: 'sex_dictText'
  },
  {
    title: '国家',
    align: "center",
    width:'100px',
    dataIndex: 'country_dictText'
  },
  {
    title: '年龄段',
    align: "center",
    width:'80px',
    dataIndex: 'ages_dictText'
  },
  {
    title: '年收入',
    align: "center",
    width:'80px',
    dataIndex: 'income_dictText'
  },
  {
    title: '行业',
    align: "center",
    width:'160px',
    dataIndex: 'ability_dictText'
  },
  
];

//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "人设名称",
    field: 'roleTempleName',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "国家",
    field: 'country',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "country"
    },
    //colProps: {span: 6},
  },
];

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '人设模版名称',
    field: 'roleTempleName',
    component: 'Input',
  },
  {
    label: '帖子数',
    field: 'postNum',
    component: 'InputNumber',
  },
  {
    label: '粉丝数',
    field: 'fansNum',
    component: 'InputNumber',
  },
  {
    label: '好友数',
    field: 'friendNum',
    component: 'InputNumber',
  },
  {
    label: '点赞数',
    field: 'goodNum',
    component: 'InputNumber',
  },
  {
    label: '国家',
    field: 'country',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "country"
    },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "sex"
    },
  },
  {
    label: '宗教信仰',
    field: 'religion',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "religion"
    },
  },
  {
    label: '年龄段',
    field: 'ages',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "ages"
    },
  },
  {
    label: '血型',
    field: 'bloodType',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "blood_type"
    },
  },
  {
    label: '星座',
    field: 'constellation',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode: "constellation"
    },
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
    label: '头像',
    field: 'profile',
    component: 'JImageUpload',
    componentProps:{
    },
  },
  {
    label: '出生年月',
    field: 'birthYm',
    component: 'DatePicker',
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
    label: '个人介绍',
    field: 'intro',
    component: 'InputTextArea',
  },
  {
    label: '家庭成员',
    field: 'family',
    component: 'InputTextArea',
  },
  {
    label: '性格特点',
    field: 'nature',
    component: 'InputTextArea',
  },
  {
    label: '兴趣爱好',
    field: 'interest',
    component: 'InputTextArea',
  },
  {
    label: '职业身份',
    field: 'ability',
    component: 'InputTextArea',
  },
  {
    label: '职业经历',
    field: 'profession',
    component: 'InputTextArea',
  },
  {
    label: '感情经历',
    field: 'love',
    component: 'InputTextArea',
  },
  {
    label: '教育经历',
    field: 'education',
    component: 'InputTextArea',
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
  roleTempleName: {title: '模版名称',order: 0,view: 'text', type: 'string',},
  postNum: {title: '帖子数',order: 1,view: 'number', type: 'number',},
  fansNum: {title: '粉丝数',order: 2,view: 'number', type: 'number',},
  friendNum: {title: '好友数',order: 3,view: 'number', type: 'number',},
  goodNum: {title: '点赞数',order: 4,view: 'number', type: 'number',},
  country: {title: '国家',order: 5,view: 'list', type: 'string',dictCode: 'country',},
  sex: {title: '性别',order: 6,view: 'list', type: 'string',dictCode: 'sex',},
  religion: {title: '宗教信仰',order: 7,view: 'list', type: 'string',dictCode: 'religion',},
  ages: {title: '年龄段',order: 8,view: 'list', type: 'string',dictCode: 'ages',},
  bloodType: {title: '血型',order: 9,view: 'list', type: 'string',dictCode: 'blood_type',},
  constellation: {title: '星座',order: 10,view: 'list', type: 'string',dictCode: 'constellation',},
  name: {title: '本国姓名',order: 11,view: 'text', type: 'string',},
  englishName: {title: '英文姓名',order: 12,view: 'text', type: 'string',},
  profile: {title: '头像',order: 13,view: 'image', type: 'string',},
  birthYm: {title: '出生年月',order: 14,view: 'date', type: 'string',},
  height: {title: '身高',order: 15,view: 'number', type: 'number',},
  weight: {title: '体重',order: 16,view: 'number', type: 'number',},
  chest: {title: '胸围',order: 17,view: 'number', type: 'number',},
  waistline: {title: '腰围',order: 18,view: 'number', type: 'number',},
  hipline: {title: '臀围',order: 19,view: 'number', type: 'number',},
  intro: {title: '个人介绍',order: 20,view: 'textarea', type: 'string',},
  family: {title: '家庭成员',order: 21,view: 'textarea', type: 'string',},
  nature: {title: '性格特点',order: 22,view: 'textarea', type: 'string',},
  interest: {title: '兴趣爱好',order: 23,view: 'textarea', type: 'string',},
  ability: {title: '职业身份',order: 24,view: 'textarea', type: 'string',},
  profession: {title: '职业经历',order: 25,view: 'textarea', type: 'string',},
  love: {title: '感情经历',order: 26,view: 'textarea', type: 'string',},
  education: {title: '教育经历',order: 27,view: 'textarea', type: 'string',},
};
