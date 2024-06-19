import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/content/fansPost/list',
  queryPostById = '/content/fansPost/queryPostById',
  save='/content/fansPost/add',
  edit='/content/fansPost/edit',
  deleteOne = '/content/fansPost/delete',
  deleteBatch = '/content/fansPost/deleteBatch',
  importExcel = '/content/fansPost/importExcel',
  exportXls = '/content/fansPost/exportXls',
  finishOne = '/content/fansPost/finishOne',
  unFinishOne = '/content/fansPost/unFinishOne',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
export const queryPostById = (params) => defHttp.get({ url: Api.queryPostById, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}

export const finishOne = (params,handleSuccess) => {
  return defHttp.post({url: Api.finishOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
export const unFinishOne = (params,handleSuccess) => {
  return defHttp.post({url: Api.unFinishOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}

/**
 * 保存或者更新
 * @param params
 * @param isUpdate
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params }, { isTransformResponse: false });
}
