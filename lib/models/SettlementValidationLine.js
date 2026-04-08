var EntityBase = require('./EntityBase');

var SettlementValidationLine = EntityBase.extend({
    defaults: {
        ExternalProviderReference: null,
        ExternalTransactionType: null,
        Code: null,
        Description: null,
    }
});

module.exports = SettlementValidationLine;