import { stringify } from 'qs';
import request from '@/utils/request';

const router = 'departments';
const routerOrg = 'organizations';
export async function query(params) {
  return request(`/v1/${router}?${stringify(params)}`);
}

export async function deldep(params) {
  return request(`/v1/${router}/${params.record_id}`, {
    method: 'DELETE'
  });
}

export async function getdep(params) {
  return request(`/v1/${router}/${params.record_id}`);
}

export async function createdep(params) {
  return request(`/v1/${router}`, {
    method: 'POST',
    body: params
  });
}

export async function updatedep(params) {
  return request(`/v1/${router}/${params.record_id}`, {
    method: 'PUT',
    body: params
  });
}

export async function queryQrg(params) {
  return request(`/v1/${routerOrg}?${stringify(params)}`);
}
