import { defHttp } from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/interact/fansCtrlAccount/list',
  save='/interact/fansCtrlAccount/add',
  batchSave='/interact/fansCtrlAccount/batchSave',
  syncInfo='/interact/fansCtrlAccount/syncInfo',
  updateAds1='/interact/fansCtrlAccount/updateAds1',
  edit='/interact/fansCtrlAccount/edit',
  deleteOne = '/interact/fansCtrlAccount/delete',
  deleteBatch = '/interact/fansCtrlAccount/deleteBatch',
  importExcel = '/interact/fansCtrlAccount/importExcel',
  exportXls = '/interact/fansCtrlAccount/exportXls',
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
export const updateAds1 = (params,handleSuccess) => {
  return defHttp.post({url: Api.updateAds1, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}

export const syncInfo = (params,handelSyncStatusInfo) => {
  return defHttp.post({url: Api.syncInfo, params}, {joinParamsToUrl: true}).then((res) => {
    handelSyncStatusInfo(res);
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

export const batchSave = (params) => {
  return defHttp.post({ url: Api.batchSave, params }, { isTransformResponse: false });
}
