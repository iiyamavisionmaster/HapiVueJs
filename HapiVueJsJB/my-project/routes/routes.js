var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/hapi", {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

 exports.register = function(server, options, next){
    // Get all crimes
    server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'GET',
        path: '/api/crimes',
        handler: Handler.crimes

    });
   server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'GET',
        path: '/api/crime/{compnos?}',
        handler: Handler.crime
    });
   server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'POST',
        path: '/api/crime/{compnos?}',
        handler: Handler.crimeUpdate
    });
      next();
};
const Handler = {};
Handler.crime = (request, reply) => {
            //return request.params;
            try {
                require('../model/crime');
                const util = require('util')
                console.log(util.inspect(request.params, {
                            showHidden: false,
                            depth: null
                        }));
                console.log(request.params)
                var query = mongoose.model('crime_incident_reports').findOne(
                        request.params
                    , function(err, result) {
                    reply(result);
                });
            } catch (err) {
                throw err;
            }
        }
Handler.crimes = (request, reply) => {
            try {
                require('../model/crime');
                const util = require('util')
                console.log(util.inspect(request.query, {
                            showHidden: false,
                            depth: null
                        }));
                var dateDebut = new Date(request.query.dateDebut);
                var dateFin = new Date(request.query.dateFin);
                console.log(new Date(dateDebut.toISOString()) + ' ' + new Date(dateFin.toISOString()))
                var query = mongoose.model('crime_incident_reports').find({
                    fromdate: {  $gte : new Date(dateDebut.toISOString()) , $lte : new Date(dateFin.toISOString())  },
                    // likes: { $in: ['vaporizing', 'talking'] }
                },function(err, obj) {
                    if (err) return handleError(err);
                    reply(obj);
                }).limit(parseInt(request.query.Limit)).skip(parseInt(request.query.Skip));//select({ name: 1, occupation: 1 }).

            } catch (err) {
                throw err;
            }
        }
Handler.crimeUpdate = (request, reply) => {
            try {
                require('../model/crime');
                const util = require('util')
                console.log(util.inspect(request.params, {
                            showHidden: false,
                            depth: null
                        }));
                // var query = mongoose.model('crime_incident_reports').find(function(err, obj) {
                //     if (err) return handleError(err);
                //     reply(obj);
                // });
                var query = mongoose.model('crime_incident_reports').findOneAndUpdate(
                    { compnos: request.payload.compnos },
                    { naturecode: request.payload.naturecode ,
                    incident_type_description: request.payload.incident_type_description ,
                    main_crimecode: request.payload.main_crimecode ,
                    reptdistrict: request.payload.reptdistrict ,
                    reportingarea: request.payload.reportingarea ,
                    fromdate: request.payload.fromdate ,
                    weapontype: request.payload.weapontype ,
                    shooting: request.payload.shooting ,
                    domestic: request.payload.domestic ,
                    shift: request.payload.shift ,
                    year: request.payload.year ,
                    month: request.payload.month ,
                    day_week: request.payload.day_week ,
                    ucrpart: request.payload.ucrpart ,
                    x: request.payload.x ,
                    y: request.payload.y ,
                    streetname: request.payload.streetname ,
                    xstreetname: request.payload.xstreetname ,
                    location: request.payload.location },
                    function (err, doc){
                        reply(doc.id)
                });
            } catch (err) {
                throw err;
            }
        }
exports.register.attributes = {
  name: 'routes',
  version: '1.0.0'
};