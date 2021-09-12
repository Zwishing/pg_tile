import request from '../../utils/request';

export async function getfeatureServices(payload){
  return request('http://localhost:8001/feature/services')
}
