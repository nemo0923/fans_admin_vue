import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  headPhoto = 'http://ec2-52-76-246-31.ap-southeast-1.compute.amazonaws.com/clientApi/human/headPhoto',
  faceSwap = 'http://ec2-52-76-246-31.ap-southeast-1.compute.amazonaws.com/clientApi/human/faceSwap',
  gptAssistants = 'http://ec2-52-76-246-31.ap-southeast-1.compute.amazonaws.com/gpt/assistants',
  gptChat = 'http://ec2-52-76-246-31.ap-southeast-1.compute.amazonaws.com/gpt/chat/',
}
export const role_key = 'asst_MgfnhsoQvHR8EtyY5IYKKmjK'

export const headPhoto = (params) => {
  return defHttp.post({baseURL:'', url: Api.headPhoto, params ,timeout:0,}, { isTransformResponse: false });
}
export const faceSwap = (params) => {
  return defHttp.post({baseURL:'', url: Api.faceSwap, params ,timeout:0,}, { isTransformResponse: false });
}

export const gptChat = (urlSuffix,params) => {
  let url=''
  if(urlSuffix){
    url=Api.gptChat+urlSuffix
  }else{
    url=Api.gptChat
  }
  return defHttp.post({baseURL:'', url: url, params,timeout:0, }, { isTransformResponse: false });
}
export const gptAssistants = (urlSuffix,params) => {
  let url=''
  if(urlSuffix){
    url=Api.gptAssistants+urlSuffix
  }else{
    url=Api.gptAssistants
  }
  return defHttp.post({baseURL:'', url: url, params,timeout:0, }, { isTransformResponse: false });
}