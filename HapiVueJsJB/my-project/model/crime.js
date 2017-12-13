
var mongoose = require('mongoose');

 
                var crime_incident_reports_schema = new mongoose.Schema({
                    _id: String,
                    compnos: String,
                    day_week: String,
                    domestic: Boolean,
                    fromdate: Date,
                    incident_type_description: String,
                    location: String,
                    main_crimecode: String,
                    month: Number,
                    naturecode: String,
                    reportingarea: Number,
                    reptdistrict: String,
                    shift: String,
                    shooting: Boolean,
                    streetname: String,
                    ucrpart: String,
                    weapontype: String,
                    x: String,
                    xstreetname: String,
                    y: String,
                    year: Number
                }, {
                    collection: 'crime_incident_reports'
                });

module.exports = mongoose.model('crime_incident_reports', crime_incident_reports_schema);