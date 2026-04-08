var EntityBase = require('./EntityBase');

module.exports = EntityBase.extend({
    defaults: {
        UserStatus: null,
        IsEnrolled: null,
        LastEnrollmentDate: null,
        LastConsentCollectionDate: null,
        ConsentScope: null
    }
});