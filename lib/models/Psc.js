const EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        FirstName: null,
        LastName: null,
        Email: null,
        DateOfBirth: null,
        Country: null,
        Nationality: null,
        PscType: null,
        Status: null,
        ValidationDate: null,
        HostedUrl: null,
        Data: null,
        LastUpdate: null
    }
});