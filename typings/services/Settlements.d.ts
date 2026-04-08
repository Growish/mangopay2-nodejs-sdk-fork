import {base} from "../base";
import {settlement} from "../models/settlement";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Settlements {
    /**
     * Generate a pre-signed URL to which you can upload your Mangopay-format settlement file
     *
     * @param {settlement.GenerateSettlementUploadUrl} settlement The settlement file to be uploaded containing the 'FileName'
     *                                                            (the name of your file, which can be anything you wish.
     *                                                            The file extension must be .csv)
     * @param {Object} options Request options
     */
    generateUploadUrl: MethodOverload<settlement.GenerateSettlementUploadUrl, settlement.SettlementData>;

    /**
     * Retrieve the settlement data generated from file upload
     *
     * @param {string} settlementId Settlement identifier
     * @param {Object} options Request options
     */
    get: MethodOverload<string, settlement.SettlementData>;

    /**
     * Generate a new pre-signed URL to replace the file of an existing Settlement
     *
     * @param {string} settlementId The settlement identifier
     * @param {settlement.GenerateSettlementUploadUrl} settlement The settlement file to be uploaded containing the 'FileName'
     *                                                            (the name of your file, which can be anything you wish.
     *                                                            The file extension must be .csv)
     * @param {Object} options Request options
     */
    generateNewUploadUrl: TwoArgsMethodOverload<string, settlement.GenerateSettlementUploadUrl, settlement.SettlementData>;

    /**
     * Returns all the possible errors that might have occurred with a Settlement File
     *
     * @param {string} settlementId The settlement identifier
     * @param {Object} options Request options
     */
    getValidations: MethodOverload<string, settlement.SettlementValidation>;

    /**
     * Cancel settlement
     *
     * @param {string} settlementId The settlement identifier
     * @param {Object} options Request options
     */
    cancel: MethodOverload<string, settlement.SettlementData>;
}
