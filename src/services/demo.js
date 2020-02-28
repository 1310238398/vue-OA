import { stringify } from 'qs';
import request from '@/utils/request';

const router = 'demos';

export async function query(params) {
  return request(`/v1/${router}?${stringify(params)}`);
}
