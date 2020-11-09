
const withCss = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const cssLoaderGetLocalIdent = require("css-loader/lib/getLocalIdent.js");
const path = require('path');

if(typeof require !==  'undefined'){
  require.extensions['.css']=file=>{}
}

module.exports = withPlugins([withCss], {
  lessLoaderOptions : {//如果是antd就需要，antd-mobile不需要
    javascriptEnabled : true
  },

  webpack(config){
    if(config.externals){
      const includes = [/antd/];
      config.externals = config.externals.map(external => {
        if (typeof external !== 'function') return external;
        return (ctx, req, cb) => {
          return includes.find(include =>
            req.startsWith('.')
              ? include.test(path.resolve(ctx, req))
              : include.test(req)
          )
            ? cb()
            : external(ctx, req, cb);
        };
      });
    }
    return config;
  }
});