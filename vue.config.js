module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/mapi': {
        // target: 'http://192.168.1.152:10099',
        target: 'http://127.0.0.1:10099',
        changeOrigin: true
      }
    }
  }
};
