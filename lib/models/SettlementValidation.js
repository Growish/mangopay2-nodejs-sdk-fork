var EntityBase = require('./EntityBase');

var SettlementValidation = EntityBase.extend({
    defaults: {
        FooterErrors: null,
        LinesErrors: null,
    }
});

module.exports = SettlementValidation;