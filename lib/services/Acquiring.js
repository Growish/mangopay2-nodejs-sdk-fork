const _ = require('underscore');

const Service = require('../service');

const PayIn = require('../models/PayIn');
const PayInPaymentDetailsBankWire = require('../models/PayInPaymentDetailsBankWire');
const PayInPaymentDetailsCard = require('../models/PayInPaymentDetailsCard');
const PayInPaymentDetailsDirectDebitDirect = require('../models/PayInPaymentDetailsDirectDebitDirect');
const PayInPaymentDetailsDirectDebitWeb = require('../models/PayInPaymentDetailsDirectDebitWeb');
const PayInPaymentDetailsPreAuthorized = require('../models/PayInPaymentDetailsPreAuthorized');
const PayInPaymentDetailsPayPal = require('../models/PayInPaymentDetailsPayPal');
const PayInExecutionDetailsWeb = require('../models/PayInExecutionDetailsWeb');
const PayInExecutionDetailsDirect = require('../models/PayInExecutionDetailsDirect');
const PayInExecutionDetailsBankingAlias = require('../models/PayInExecutionDetailsBankingAlias');
const PayInPaymentDetailsApplePay = require('../models/PayInPaymentDetailsApplePay');
const PayInPaymentDetailsGooglePay = require('../models/PayInPaymentDetailsGooglePay');
const PayInPaymentDetailsMbway = require('../models/PayInPaymentDetailsMbway');
const PayInPaymentDetailsBancontact = require('../models/PayInPaymentDetailsBancontact');
const PayInPaymentDetailsBizum = require('../models/PayInPaymentDetailsBizum');
const Refund = require('../models/Refund');
const PayInPaymentDetailsMultibanco = require("../models/PayInPaymentDetailsMultibanco");
const PayInPaymentDetailsSatispay = require("../models/PayInPaymentDetailsSatispay");
const PayInPaymentDetailsBlik = require("../models/PayInPaymentDetailsBlik");
const PayInPaymentDetailsKlarna = require("../models/PayInPaymentDetailsKlarna");
const PayInPaymentDetailsIdeal = require("../models/PayInPaymentDetailsIdeal");
const PayInPaymentDetailsGiropay = require("../models/PayInPaymentDetailsGiropay");
const PayInPaymentDetailsSwish = require("../models/PayInPaymentDetailsSwish");
const PayInPaymentDetailsTwint = require("../models/PayInPaymentDetailsTwint");
const PayInPaymentDetailsPayByBank = require("../models/PayInPaymentDetailsPayByBank");
const CardValidation = require('../models/CardValidation');


const Acquiring = Service.extend({
    /**
     * Create new pay-in
     * @param {Object}  payIn     PayIn object
     * @param {Function} callback Callback function
     * @param {Object} options    Request options
     * @return {Object}           Request promise
     */
    createPayIn: function (payIn, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: payIn,
            dataClass: PayIn
        });

        const paymentKey = this.getPaymentKey(payIn);
        const executionKey = this.getExecutionKey(payIn);

        return this._api.method('acquiring_payins_' + paymentKey + '-' + executionKey + '_create', callback, options);
    },

    /**
     * Create refund for pay-in object
     * @param {number}  payInId   PayIn identifier
     * @param {Object}  refund    Refund data
     * @param {Function} callback Callback function
     * @param {Object} options    Request options
     * @return {Object}           Request promise
     */
    createPayInRefund: function (payInId, refund, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: payInId
            },
            dataClass: Refund,
            data: refund
        });

        return this._api.method('acquiring_payins_createrefunds', callback, options);
    },

    /**
     * Send key pre-transaction data such as order details, buyer information,
     * and merchant context before initiating a PayPal payment
     *
     * @param dataCollection The data collection to be created
     * @param callback       Callback function
     * @param options        Request options
     * @returns {Object}     Request promise
     */
    createPayPalDataCollection: function (dataCollection, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: dataCollection
        });

        return this._api.method('acquiring_payins_paypal_data_collection_create', callback, options);
    },

    /**
     * Create card validation
     * @param cardId         The ID of the card
     * @param cardValidation The create card validation dto
     * @param callback       Callback function
     * @param options        Request promise
     * @returns {Object}
     */
    createCardValidation: function (cardId, cardValidation, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: cardId
            },
            data: cardValidation,
            dataClass: CardValidation
        });

        return this._api.method('acquiring_card_validation_create', callback, options);
    },

    getPaymentKey: function (payIn) {
        if (payIn.PaymentType) {
            return payIn.PaymentType.toLowerCase().replaceAll('_', '');
        }

        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBankWire) return 'bankwire';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsCard) return 'card';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitDirect) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsDirectDebitWeb) return 'directdebit';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPreAuthorized) return 'preauthorized';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPayPal) return 'paypal';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsApplePay) return 'applepay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsGooglePay) return 'googlepay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsMbway) return 'mbway';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBancontact) return 'bcmc';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBizum) return 'bizum';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsMultibanco) return 'multibanco';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsSatispay) return 'satispay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsBlik) return 'blik';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsKlarna) return 'klarna';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsIdeal) return 'ideal';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsGiropay) return 'giropay';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsSwish) return 'swish';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsTwint) return 'twint';
        if (payIn.PaymentDetails instanceof PayInPaymentDetailsPayByBank) return 'paybybank';

        throw new Error(`PaymentType ${payIn.PaymentType} not handled`);
    },

    getExecutionKey: function (payIn) {
        if (payIn.ExecutionType) {
            return payIn.ExecutionType.toLowerCase();
        }

        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsWeb) return 'web';
        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsDirect) return 'direct';
        if (payIn.ExecutionDetails instanceof PayInExecutionDetailsBankingAlias) return 'bankingalias';

        throw new Error(`ExecutionType ${payIn.ExecutionType} not handled`);
    }
});

module.exports = Acquiring;
