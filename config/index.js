'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  publish:{ //部署配置
    remoteDir:'/xxx/xxx/xxx/target',//远程上传目录(服务器)
    localSourcePath:"",//本地需要上传的资源路径（默认项目根目录下的dist文件夹）
    serverConfig:{//服务器验证信息
        host: '',
        username: '***',
        password: '***',
        algorithms: {
            "kex": [
              "diffie-hellman-group1-sha1",
              "ecdh-sha2-nistp256",
              "ecdh-sha2-nistp384",
              "ecdh-sha2-nistp521",
              "diffie-hellman-group-exchange-sha256",
              "diffie-hellman-group14-sha1"
            ],
            "cipher": [
              "3des-cbc",
              "aes128-cbc",
              "aes192-cbc",
              "aes256-cbc",
              "aes128-ctr",
              "aes192-ctr",
              "aes256-ctr",
              "aes128-gcm@openssh.com",
              "aes256-gcm@openssh.com",
              "arcfour",
              "arcfour128",
              "arcfour256",
              "blowfish-cbc",
              "cast128-cbc",
            ],
            "serverHostKey": [
              "ssh-rsa",
              "ecdsa-sha2-nistp256",
              "ecdsa-sha2-nistp384",
              "ecdsa-sha2-nistp521"
            ],
            "hmac": [
              "hmac-sha2-256",
              "hmac-sha2-512",
              "hmac-sha1"
            ]
        }
    }
  }

}
