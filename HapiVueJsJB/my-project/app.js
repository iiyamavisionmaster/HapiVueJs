'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

var config = require('config');
const routes = require('./routes/routes');


var srvConfig = config.get('api');
const server = new Hapi.Server();

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout']
    }
}
//process.exit() ;
server.connection(srvConfig,{ routes: { cors: true } });

// Register webpack HMR, only for non-production environments
if (process.env.NODE_ENV !== 'production') {

    const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
    const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
    const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

    server.register([{
        register: HapiWebpackDevMiddleware,
        options: {
            config: WebpackConfig,
            options: {
                noInfo: true,
                publicPath: WebpackConfig.output.publicPath,
                stats: {
                    colors: true
                }
            }
        }
    }, {
        register: HapiWebpackHotMiddleware
    }], function(err) {
        if (err) {
            throw err;
        }
    });

}

server.register([Inert], function(err) {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/{filename*}',
        config: {
            auth: false,
            cache: {
                expiresIn: 24 * 60 * 60 * 1000,
                privacy: 'public'
            }
        },
        handler: {
            directory: {
                path: __dirname + '/public',
                listing: false,
                index: false
            }
        }
    });

});

server.register([{
    register: require('good'),
    options,
},{
    register: routes,
    options:{},    
}
], (err) => {
    if (err) {
        return console.error(err);
    }
    server.start(() => {
        console.info(`Server started at ${ server.info.uri }`);
    });

});