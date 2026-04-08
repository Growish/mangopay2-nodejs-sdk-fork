var EntityBase = require('./EntityBase');

var SettlementValidationFooter = EntityBase.extend({
    defaults: {
        FooterName: null,
        Code: null,
        Description: null,
    }
});

module.exports = SettlementValidationFooter;