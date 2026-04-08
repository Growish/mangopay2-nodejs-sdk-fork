import {entityBase} from "./entityBase";
import {CountryISO, SecureMode, Timestamp} from "../types";
import {transaction} from "./transaction";
import {card} from "./card";
import {billing} from "./billing";
import {base} from "../base";
import {money} from "./money";
import {securityInfo} from "./securityInfo";
import {shipping} from "./shipping";
import {payIn} from "./payIn";
import {refund} from "./refund";

export namespace acquiring {
    import BillingData = billing.BillingData;
    import BrowserInfoData = base.BrowserInfoData;
    import MoneyData = money.MoneyData;
    import SecurityInfoData = securityInfo.SecurityInfoData;
    import ShippingData = shipping.ShippingData;
    import CreateShipping = shipping.CreateShipping;
    import CreateBilling = billing.CreateBilling;
    import CompleteBillingData = billing.CompleteBillingData;
    import CardInfoData = card.CardInfoData;
    import PayInPaymentType = payIn.PayInPaymentType;
    import PayInExecutionType = payIn.PayInExecutionType;
    import ShippingPreference = payIn.ShippingPreference;
    import ApplePayPaymentData = payIn.ApplePayPaymentData;
    import LineItemData = payIn.LineItemData;
    import PayPalWebTrackingData = payIn.PayPalWebTrackingData;
    import CreateLineItem = payIn.CreateLineItem;
    import TransactionType = transaction.TransactionType;
    import TransactionStatus = transaction.TransactionStatus;
    import RefundReason = refund.RefundReason;
    import _3DSVersion = payIn._3DSVersion;
    import CardValidity = card.CardValidity;

    interface BaseAcquiringPayInData extends entityBase.EntityBaseData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * The nature of the transaction
         */
        Nature: transaction.TransactionNature;

        /**
         * The status of the transaction
         */
        Status: TransactionStatus;

        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * The type of the transaction
         */
        Type: transaction.TransactionType;

        /**
         * The type of payin
         */
        PaymentType: PayInPaymentType;

        /**
         * The type of execution for the payin
         */
        ExecutionType: PayInExecutionType;
    }

    interface CardDirectPayInData extends BaseAcquiringPayInData {
        ExecutionType: "DIRECT";

        PaymentType: "CARD";

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it
         * automatically with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Contains useful information related to the user billing
         */
        Billing: BillingData;

        /**
         * Contains information related to security and fraud
         */
        SecurityInfo: SecurityInfoData;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectURL: string;

        /**
         * Information about the card
         */
        CardInfo: CardInfoData;

        /**
         * The channel through which the user provided their card details, used to indicate mail-order and telephone-order (MOTO) payments:
         *
         * ECommerce – Payment received online.
         *
         * TelephoneOrder – Payment received via mail order or telephone order (MOTO).
         */
        PaymentCategory: string;

        /**
         * Preferred Card Network
         */
        PreferredCardNetwork?: string;
    }

    interface CreateCardDirectPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "CARD";

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * This is the URL where users are automatically redirected after 3D secure validation (if activated)
         */
        SecureModeReturnURL: string;

        /**
         * The ID of a card
         */
        CardId: string;

        /**
         * The SecureMode corresponds to '3D secure' for CB Visa and MasterCard. This field lets you activate it manually. The field lets you activate it automatically
         *  with "DEFAULT" (Secured Mode will be activated from €50 or when MANGOPAY detects there is a higher risk ), "FORCE" (if you wish to specifically force the secured mode).
         */
        SecureMode: SecureMode;

        /**
         * Contains useful information related to the user billing
         */
        Billing?: BillingData;

        /**
         * The language to use for the payment page - needs to be the ISO code of the language
         */
        Culture?: CountryISO;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress: string;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo: BrowserInfoData;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: ShippingData;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * The channel through which the user provided their card details, used to indicate mail-order and telephone-order (MOTO) payments:
         *
         * ECommerce – Payment received online.
         *
         * TelephoneOrder – Payment received via mail order or telephone order (MOTO).
         */
        PaymentCategory?: string;

        /**
         * Preferred Card Network
         */
        PreferredCardNetwork?: string;
    }

    interface IdealWebPayInData extends BaseAcquiringPayInData {
        ExecutionType: "WEB";

        PaymentType: "IDEAL";

        /**
         * The URL to redirect to user to for them to proceed with the payment
         */
        RedirectURL: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * Name of the end-user’s bank
         */
        BankName?: string;

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic?: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;
    }

    interface CreateIdealWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "IDEAL";

        /**
         * Information about the debited funds
         */
        DebitedFunds: MoneyData;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The BIC identifier of the end-user’s bank
         */
        Bic?: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this object
         */
        Tag?: string;
    }

    interface ApplePayPayInData extends BaseAcquiringPayInData {
        ExecutionType: "DIRECT";

        PaymentType: "APPLEPAY";

        /**
         * Payment data
         */
        PaymentData: ApplePayPaymentData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;
    }

    interface CreateApplePayPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "APPLEPAY";

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Payment data
         */
        PaymentData: ApplePayPaymentData;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
    }

    interface GooglePayDirectPayInData extends BaseAcquiringPayInData {
        ExecutionType: "DIRECT";

        PaymentType: "GOOGLE_PAY";

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * The value is 'true' if the SecureMode was used
         */
        SecureModeNeeded: boolean;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: ShippingData;

        /**
         * Information about the end user billing address.
         */
        Billing?: CompleteBillingData;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo: BrowserInfoData;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress: string;

        /**
         * The ID of the card
         */
        CardId: string;

        /**
         * The URL to which the user is redirected to complete the payment.
         */
        SecureModeReturnURL: string;

        /**
         * This is the URL where to redirect users to proceed to 3D secure validation
         */
        SecureModeRedirectURL?: string;

        /**
         * The mode applied for the 3DS2 protocol for CB, Visa, and Mastercard. The options are:
         * DEFAULT – Requests an exemption to strong customer authentication (SCA), and thus a frictionless payment
         * experience, if allowed by your Mangopay contract and accepted by the issuer.
         * FORCE – Requests SCA.
         * NO_CHOICE – Leaves the choice to the issuer whether to allow for a frictionless payment experience
         * or to enforce SCA.
         */
        SecureMode?: SecureMode;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL?: string;
    }

    interface CreateGooglePayDirectPayIn {
        ExecutionType: "DIRECT";

        PaymentType: "GOOGLE_PAY";

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * The URL to which the user is redirected to complete the payment.
         */
        SecureModeReturnURL: string;

        /**
         * The mode applied for the 3DS2 protocol for CB, Visa, and Mastercard. The options are:
         * DEFAULT – Requests an exemption to strong customer authentication (SCA), and thus a frictionless payment
         * experience, if allowed by your Mangopay contract and accepted by the issuer.
         * FORCE – Requests SCA.
         * NO_CHOICE – Leaves the choice to the issuer whether to allow for a frictionless payment experience
         * or to enforce SCA.
         */
        SecureMode?: SecureMode;

        /**
         * IP Address of the end user (format IPV4 or IPV6)
         */
        IpAddress: string;

        /**
         * This object describes the Browser being user by an end user
         */
        BrowserInfo: BrowserInfoData;

        /**
         * Data received from the Google Pay API
         */
        PaymentData: string;

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL?: string;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: CreateShipping;

        /**
         * Information about the end user billing address.
         */
        Billing?: CreateBilling;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;
    }

    interface PayPalWebPayInData extends BaseAcquiringPayInData {
        ExecutionType: "WEB";

        PaymentType: "PAYPAL";

        /**
         * The URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * The URL to which the user is redirected to complete the payment
         */
        RedirectURL?: string;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric
         * characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Information about the shipping address
         */
        Shipping?: ShippingData;

        /**
         * List of items and quantity bought by the buyer
         */
        LineItems: LineItemData[];

        /**
         * The language in which the PayPal payment page is to be displayed.
         */
        Culture?: CountryISO;

        ShippingPreference?: ShippingPreference;

        Reference?: string;

        PaypalPayerID?: string;

        BuyerCountry?: string;

        BuyerFirstname?: string;

        BuyerLastname?: string;

        BuyerPhone?: string;

        PaypalOrderID?: string;

        CancelURL?: string;

        /**
         * The email address registered on the PayPal account used to make the payment.
         */
        PaypalBuyerAccountEmail?: string;

        /**
         * Shipping information of the LineItems added to the pay-in object.
         */
        Trackings?: PayPalWebTrackingData;
    }

    interface CreatePayPalWebPayIn {
        ExecutionType: "WEB";

        PaymentType: "PAYPAL";

        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * Information about the items bought by the customer
         */
        LineItems: CreateLineItem[];

        /**
         * This is the URL where users are automatically redirected after the payment is validated
         */
        ReturnURL: string;

        /**
         * Contains every useful information's related to the user shipping
         */
        Shipping?: CreateShipping;

        /**
         * A custom description to appear on the user's bank statement. It can be up to 10 characters long, and can only include alphanumeric characters or spaces.
         * See here for important info. Note that each bank handles this information differently, some show less or no information.
         */
        StatementDescriptor?: string;

        /**
         * Custom data that you can add to this item
         */
        Tag?: string;

        /**
         * The language in which the PayPal payment page is to be displayed.
         */
        Culture?: CountryISO;

        ShippingPreference?: ShippingPreference;

        Reference?: string;

        CancelURL?: string;

        DataCollectionId?: string;
    }

    interface RefundData {
        /**
         * Information about the funds that are being debited
         */
        DebitedFunds: MoneyData;

        /**
         * The ID of the wallet that was debited
         */
        DebitedWalletId: string;

        /**
         * The nature of the transaction
         */
        Nature: "REFUND";

        /**
         * The status of the transaction
         */
        Status: TransactionStatus;

        /**
         * When the transaction happened
         */
        ExecutionDate: Timestamp;

        /**
         * The result code
         */
        ResultCode: string;

        /**
         * A verbal explanation of the ResultCode
         */
        ResultMessage: string;

        /**
         * The type of the transaction
         */
        Type: TransactionType;

        /**
         * The initial transaction ID
         */
        InitialTransactionId: string;

        /**
         * The initial transaction type
         */
        InitialTransactionType: TransactionType;

        /**
         * Contains info about the reason for refund
         */
        RefundReason: RefundReason;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor?: string;
    }

    interface CreatePayInRefund {
        Tag?: string;

        DebitedFunds?: MoneyData;

        /**
         * Custom description to appear on the user’s bank statement along with the platform name
         */
        StatementDescriptor?: string;
    }

    interface CardValidationData extends entityBase.EntityBaseData {
        /**
         * The status of the transaction.
         */
        Status: TransactionStatus;

        /**
         * The URL to which users are automatically returned after 3DS2 if it is triggered (i.e., if the SecureModeNeeded parameter is set to true).
         */
        SecureModeReturnURL: string;

        /**
         * The URL to which users are to be redirected to proceed to 3DS2 validation.
         */
        SecureModeRedirectURL: string;

        /**
         * Whether or not the SecureMode was used.
         */
        SecureModeNeeded: boolean;

        /**
         * The mode applied for the 3DS2 protocol for CB, Visa, and Mastercard
         */
        SecureMode: SecureMode;

        /**
         * The IP address of the end user initiating the transaction, in IPV4 or IPV6 format.
         */
        IpAddress: string;

        /**
         * Information about the browser used by the end user (author) to perform the payment.
         */
        BrowserInfo: BrowserInfoData;

        /**
         * Whether the card is valid or not.
         */
        Validity: CardValidity;

        /**
         * The type of transaction. In the specific case of the Card Validation object, this value indicates a transaction made to perform a strong customer authentication without debiting the card.
         */
        Type: TransactionType;

        /**
         * The 3DS protocol version applied to the transaction.
         */
        Applied3DSVersion: _3DSVersion;

        /**
         * The code indicating the result of the operation. This information is mostly used to handle errors or for filtering purposes.
         */
        ResultCode: string;

        /**
         * The explanation of the result code.
         */
        ResultMessage: string;

        /**
         * The channel through which the user provided their card details, used to indicate mail-order and telephone-order (MOTO) payments:
         *
         * ECommerce – Payment received online.
         *
         * TelephoneOrder – Payment received via mail order or telephone order (MOTO).
         */
        PaymentCategory: string;
    }

    interface CreateCardValidation {
        /**
         * The URL to which users are automatically returned after 3DS2 if it is triggered (i.e., if the SecureModeNeeded parameter is set to true).
         */
        SecureModeReturnURL: string;

        /**
         * The mode applied for the 3DS2 protocol for CB, Visa, and Mastercard
         */
        SecureMode?: SecureMode;

        /**
         * The IP address of the end user initiating the transaction, in IPV4 or IPV6 format.
         */
        IpAddress: string;

        /**
         * Information about the browser used by the end user (author) to perform the payment.
         */
        BrowserInfo: BrowserInfoData;

        /**
         * Custom data that you can add to this object.
         */
        Tag?: string;

        /**
         * The channel through which the user provided their card details, used to indicate mail-order and telephone-order (MOTO) payments:
         *
         * ECommerce – Payment received online.
         *
         * TelephoneOrder – Payment received via mail order or telephone order (MOTO).
         */
        PaymentCategory?: string;
    }
}