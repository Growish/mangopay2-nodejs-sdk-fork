import {acquiring} from "../models/acquiring";
import {base} from "../base";
import MethodOverload = base.MethodOverload;
import TwoArgsMethodOverload = base.TwoArgsMethodOverload;

export class Acquiring {
    createPayIn:
        MethodOverload<acquiring.CreateCardDirectPayIn, acquiring.CardDirectPayInData> &
        MethodOverload<acquiring.CreateIdealWebPayIn, acquiring.IdealWebPayInData> &
        MethodOverload<acquiring.CreateApplePayPayIn, acquiring.ApplePayPayInData> &
        MethodOverload<acquiring.CreateGooglePayDirectPayIn, acquiring.GooglePayDirectPayInData> &
        MethodOverload<acquiring.CreatePayPalWebPayIn, acquiring.PayPalWebPayInData>;

    /**
     * Send key pre-transaction data such as order details, buyer information,
     * and merchant context before initiating a PayPal payment.
     *
     * Given that the payload can be anything, depending on what PayPal needs, there is no defined interface for it.
     *
     * @param dataCollection The data collection to be created
     * @param callback Callback function
     * @param options Request options
     * @returns {Object} Request promise
     */
    createPayPalDataCollection: MethodOverload<any, any>;

    /**
     * Create refund for pay-in object
     * @param payInId
     * @param refundData
     * @param options
     */
    createPayInRefund: TwoArgsMethodOverload<string, acquiring.CreatePayInRefund, acquiring.RefundData>;

    /**
     * Create a card validation
     * @param cardId
     * @param cardValidation
     * @param callback
     * @param options
     * @returns {*|Promise}
     */
    createCardValidation: TwoArgsMethodOverload<string, acquiring.CreateCardValidation, acquiring.CardValidationData>;
}