/**
 * PostCSS：解析 CSS 代码，
 * 再交由插件来进行处理
 */
module.exports = {
  plugins: {
    // 配置插件
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75;
      },
      propList: ['*']
    }
  }
}
