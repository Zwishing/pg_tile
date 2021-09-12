import {request} from 'umi'

const getfeatureServices=(payload)=>{
    return request('/feature/services')
}

export default{
    namesapce:'featureServices',//

    //状态，更react的state类似
    state:{
        featureServicesData:{data:[],},
    },
    //调用服务端接口获取数据
    effects:{
        *fetchFeatureServices({payload,callback},{put,call}){
            //获取矢量服务数据
            const res = yield call(getfeatureServices,payload)

            //调用状态reducers,并传递数据
            yield put({
                type: 'setFeatureServicesList', //类似与redux中action的type
                payload: res
            });
        }
    },
    //更新state
    reducers:{
        setFeatureServicesList(state,action){
            return {...state,featureServicesData:action.payload}
        }
    },

}