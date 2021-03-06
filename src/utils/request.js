import axios from 'axios';
import { Toast } from 'vant';

export const baseURL = '/mapi';

export default async function request(url, options) {
  let showNotify = true;
  const opts = {
    baseURL,
    url,
    validateStatus() {
      return true;
    },
    ...options
  };
  if (opts.notNotify) {
    showNotify = false;
  }

  const defaultHeader = {};
  if (opts.method === 'POST' || opts.method === 'PUT') {
    defaultHeader['Content-Type'] = 'application/json; charset=utf-8';
    opts.data = opts.body;
  }
  opts.headers = { ...defaultHeader, ...opts.headers };

  return axios.request(opts).then(response => {
    const { status, data } = response;
    if (status >= 200 && status < 300) {
      return data;
    }

    const error = {
      code: 0,
      message: '服务器发生错误'
    };
    if (status === 504) {
      error.message = '未连接到服务器';
    } else if (data) {
      try {
        const {
          error: { message, code }
        } = data;
        error.message = message;
        error.code = code;
      } catch {
        error.message = '未连接到服务器';
      }
    } else if (status >= 400 && status < 500) {
      error.message = '请求发生错误';
    }

    if (showNotify) {
      Toast.fail(error.message);
    }

    return { error, status };
  });
}
