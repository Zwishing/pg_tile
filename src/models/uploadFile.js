import {uploadFile} from '@/services/ant-design-pro/uploadFile';

export default{
  namesapce:'uploadFile',//

  // 状态，更react的state类似
  state:{
    uploadState:{},
  },
  // 调用服务端接口上传数据，并获取返回结果
  effects:{
    // eslint-disable-next-line no-unused-vars
    *fetchUploadFile({payload,callback},{put,call}){
      // 获取上传的状态 成功或者失败
      const res = yield call(uploadFile, payload)
      // 调用状态reducers,并传递数据
      yield put({
        type: 'setUploadState', // 类似与redux中action的type
        payload: res
      });
    }
  },
  // 更新state
  reducers:{
    setUploadState(state,action){
      return {...state,uploadState:action.payload}
    }
  },

}
