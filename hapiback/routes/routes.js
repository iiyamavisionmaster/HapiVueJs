var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/hapi", {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

const Boom = require('boom');
const createUserSchema = require('../api/schemas/createUser');
const createToken = require('../api/util/token');
const verifyUniqueUser = require('../api/util/userFunctions').verifyUniqueUser;

const bcrypt = require('bcrypt');
const User = require('../api/model/User');
function hashPassword(password, cb) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return cb(err, hash);
    });
  });
}
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
   server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'GET',
        path: '/api/typearme',
        handler: Handler.typearme
    });
   server.route({
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        method: 'GET',
        path: '/api/incident_type_description',
        handler: Handler.incident_type_description
    });

      server.route({
      method: 'GET',
      path: '/api/users',
      config: {
        handler: (req, res) => {
          User
            .find()
            // Deselect the password and version fields
            .select('-password -__v')
            .exec((err, users) => {
              if (err) {
                throw Boom.badRequest(err);
              }
              if (!users.length) {
                throw Boom.notFound('No users found!');
              }
              res(users);
            })
        },
        // Add authentication to this route
        // The user must have a scope of `admin`
    }
       });
      server.route({
      method: 'POST',
      path: '/api/users',

        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: Handler.inscription
      });
      next();
};
const Handler = {};
Handler.inscription =(req, res) => {
          let user = new User(req.payload);
          hashPassword(req.payload.password, (err, hash) => {
            if (err) {
              throw Boom.badRequest(err);
            }
            user.password = hash;
            user.save((err, user) => {
              if (err) {
                throw Boom.badRequest(err);
              }
              // If the user is saved successfully, issue a JWT
              res({ id_token: createToken(user) }).code(201);
            });
          });}
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
                console.log( mongoose.model('crime_incident_reports'));
                var query = mongoose.model('crime_incident_reports').find(
                    {
                    'weapontype': request.query.weapontype,
                    'incident_type_description': request.query.incident_type_description,
                    fromdate: {  $gte : new Date(dateDebut.toISOString()) , $lte : new Date(dateFin.toISOString())  }
                    // likes: { $in: ['vaporizing', 'talking'] }
                },function(err, obj) {
                    if (err) return err;
                    console.log(obj);
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
                    { id: request.payload.id },
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
Handler.typearme = (request, reply) => {
            try {
                require('../model/crime');
                const util = require('util')
                console.log(util.inspect(request.query, {
                            showHidden: false,
                            depth: null
                        }));console.log('test')
                var query = mongoose.model('crime_incident_reports').distinct( 'weapontype',{}, function(err, obj) {
                    if (err) return handleError(err);console.log(obj)
                    reply(obj);
                })//select({ name: 1, occupation: 1 }).

            } catch (err) {
                throw err;
            }
        }
Handler.incident_type_description = (request, reply) => {
            try {
                require('../model/crime');
                const util = require('util')
                console.log(util.inspect(request.query, {
                            showHidden: false,
                            depth: null
                        }));
                var query = mongoose.model('crime_incident_reports').distinct( 'incident_type_description',{}, function(err, obj) {
                    if (err) return handleError(err);
                    reply(obj);
                })//select({ name: 1, occupation: 1 }).

            } catch (err) {
                throw err;
            }
        }

exports.register.attributes = {
  name: 'routes',
  version: '1.0.0'
};