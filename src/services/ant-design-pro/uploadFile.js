import request from '../../utils/request';

export async function uploadFile(payload){
  return request('http://localhost:8001/publish/upload')
}
