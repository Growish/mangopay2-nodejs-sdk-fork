/**
 * @module Settlements
 */

var Service = require('../service');
var Settlement = require('../models/Settlement');
const SettlementValidation = require("../models/SettlementValidation");

var Settlements = Service.extend({
    /**
     * Generate a pre-signed URL to which you can upload your Mangopay-format settlement file
     *
     * @param {Settlement} settlement The settlement file to be uploaded containing the 'FileName'
     *                                (the name of your file, which can be anything you wish. The file extension must be .csv)
     * @param {Function} callback     Callback function
     * @param {Object} options        Request options
     * @return {Object}               Request promise
     */
    generateUploadUrl: function (settlement, callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: Settlement,
            data: settlement
        });

        return this._api.method('settlement_generate_upload_url', callback, options);
    },

    /**
     * Retrieve the settlement data generated from file upload
     *
     * @param {string} settlementId Settlement Id
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Request promise
     */
    get: function (settlementId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {id: settlementId},
            dataClass: Settlement
        });

        return this._api.method('settlement_get', callback, options);
    },

    /**
     * Generate a new pre-signed URL to replace the file of an existing Settlement
     *
     * @param {string} settlementId   Settlement identifier
     * @param {Settlement} settlement The settlement file to be uploaded containing the 'FileName'
     *                                (the name of your file, which can be anything you wish. The file extension must be .csv)
     * @param {Function} callback     Callback function
     * @param {Object} options        Request options
     * @return {Object}               Request promise
     */
    generateNewUploadUrl: function (settlementId, settlement, callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: Settlement,
            data: settlement,
            path: {id: settlementId}
        });

        return this._api.method('settlement_generate_new_upload_url', callback, options);
    },

    /**
     * Returns all the possible errors that might have occurred with a Settlement File
     *
     * @param {string} settlementId The settlement identifier
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Request promise
     */
    getValidations: function(settlementId, callback, options) {
        if (options && !options.hasOwnProperty('parameters')) {
            Object.assign(options, {parameters: {...options}});
        }

        options = this._api._getOptions(callback, options, {
            dataClass: SettlementValidation,
            path: {id: settlementId},
        });

        return this._api.method('settlement_get_validations', callback, options);
    },

    /**
     * Cancel settlement
     *
     * @param {string} settlementId The settlement identifier
     * @param {Function} callback   Callback function
     * @param {Object} options      Request options
     * @return {Object}             Request promise
     */
    cancel: function (settlementId, callback, options) {
        options = this._api._getOptions(callback, options, {
            dataClass: Settlement,
            path: {id: settlementId},
        });

        return this._api.method('settlement_cancel', callback, options);
    },
});

module.exports = Settlements;