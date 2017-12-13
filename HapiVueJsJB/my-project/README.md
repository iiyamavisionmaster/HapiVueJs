# hapivuejs

A Hapi Vue project

## Mini-doc

**/build/** - contains files needed for build and hot development  
**/build/index_dev.html** - Template for index.html, it will be used by HMR when developing in memory and during production build   
**/client/** - Vue.js app source  
**/config/** - Configuration files  
**/public/** - Public folder served by Hapi  
**/server/** - Server side logic  
**/app.js**  - Production server
**/gulpfile.js**  - Gulp setup file   

Hapi (API) folders (e.g. routes, controllers, models, plug-ins) can be added either to root structure or with a server folder.

## Dev Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000 (with proxy at localhost:4000)
npm run dev
```

For tips and guides regarding integration of additional mechanisms, visit [Hapi Vue Plus wiki](https://github.com/Belar/hapi-vue-plus/wiki).

## Production Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# run application at localhost:3000
node app.js
```

Credits:  
[Vue.js](https://vuejs.org/)  
[Hapi](http://hapijs.com/)  
[Gulp](https://gulpjs.com/)  
[BrowserSync](https://www.browsersync.io/)  
[Webpack](https://webpack.github.io/)  

[vue-webpack-simple template](https://github.com/vuejs-templates/webpack-simple)  
[vue-loader](https://vuejs.github.io/vue-loader)  
[vue-resource](https://github.com/vuejs/vue-resource)  
[hapi-webpack-hot-middleware](https://github.com/prashaantt/hapi-webpack-hot-middleware)  
[hapi-webpack-dev-middleware](https://github.com/prashaantt/hapi-webpack-dev-middleware)  
[inert](https://github.com/hapijs/inert)
