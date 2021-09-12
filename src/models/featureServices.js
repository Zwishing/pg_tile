import {getfeatureServices} from '@/services/ant-design-pro/featureServices';

export default{
    namesapce:'featureServices',//

    // 状态，更react的state类似
    state:{
        featureServicesData:{data:[],},
    },
    // 调用服务端接口获取数据
    effects:{
      // eslint-disable-next-line no-unused-vars
        *fetchFeatureServices({payload,callback},{put,call}){
            // 获取矢量服务数据
            const res = yield call(getfeatureServices, payload)
            const results = {data:res}
            // 调用状态reducers,并传递数据
            yield put({
                type: 'setFeatureServicesList', // 类似与redux中action的type
                payload: results
            });
        }
    },
    // 更新state
    reducers:{
        setFeatureServicesList(state,action){
            return {...state,featureServicesData:action.payload}
        }
    },

}
