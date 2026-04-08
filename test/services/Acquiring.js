const expect = require('chai').expect;

const mangopay = require('../../index');

// const api = global.api = new mangopay({
//     clientId: 'placeholder',
//     clientApiKey: 'placeholder'
// });

const cardId = 'placeholder';

describe.skip('Acquiring', function () {
    describe('PayIn Card Direct', function () {
        let payIn;

        before(function (done) {
            const dto = {
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'EUR'
                },
                IpAddress: '2001:0620:0000:0000:0211:24FF:FE80:C12C',
                BrowserInfo: {
                    AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                    JavaEnabled: true,
                    Language: "FR-FR",
                    ColorDepth: 4,
                    ScreenHeight: 1800,
                    ScreenWidth: 400,
                    JavascriptEnabled: true,
                    TimeZoneOffset: "+60",
                    UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                },
                CardId: cardId,
                SecureMode: 'DEFAULT',
                SecureModeReturnURL: 'http://test.com',
                PaymentType: 'CARD',
                ExecutionType: 'DIRECT'
            };

            api.Acquiring.createPayIn(dto, function (response) {
                payIn = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(payIn).not.to.be.undefined;
            expect(payIn.PaymentType).to.equal('CARD');
            expect(payIn.ExecutionType).to.equal('DIRECT');
            expect(payIn.Status).to.equal('SUCCEEDED');
        });
    });

    describe('PayIn Ideal Web', function () {
        let payIn;

        before(function (done) {
            const dto = {
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'EUR'
                },
                ReturnURL: 'http://test.com',
                PaymentType: 'IDEAL',
                ExecutionType: 'WEB'
            };

            api.Acquiring.createPayIn(dto, function (response) {
                payIn = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(payIn).not.to.be.undefined;
            expect(payIn.PaymentType).to.equal('IDEAL');
            expect(payIn.ExecutionType).to.equal('WEB');
            expect(payIn.Status).to.equal('CREATED');
        });
    });

    describe('PayIn ApplePay Direct', function () {
        let payIn;

        before(function (done) {
            const dto = {
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'EUR'
                },
                PaymentData: {},
                PaymentType: 'APPLEPAY',
                ExecutionType: 'DIRECT'
            };

            api.Acquiring.createPayIn(dto, function (response) {
                payIn = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(payIn).not.to.be.undefined;
            expect(payIn.PaymentType).to.equal('APPLEPAY');
            expect(payIn.ExecutionType).to.equal('DIRECT');
            expect(payIn.Status).to.equal('CREATED');
        });
    });

    describe('PayIn GooglePay Direct', function () {
        let payIn;

        before(function (done) {
            const dto = {
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'EUR'
                },
                IpAddress: '2001:0620:0000:0000:0211:24FF:FE80:C12C',
                BrowserInfo: {
                    AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                    JavaEnabled: true,
                    Language: "FR-FR",
                    ColorDepth: 4,
                    ScreenHeight: 1800,
                    ScreenWidth: 400,
                    JavascriptEnabled: true,
                    TimeZoneOffset: "+60",
                    UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                },
                SecureModeReturnURL: 'http://test.com',
                PaymentData: "",
                PaymentType: 'GOOGLE_PAY',
                ExecutionType: 'DIRECT'
            };

            api.Acquiring.createPayIn(dto, function (response) {
                payIn = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(payIn).not.to.be.undefined;
            expect(payIn.PaymentType).to.equal('GOOGLE_PAY');
            expect(payIn.ExecutionType).to.equal('DIRECT');
            expect(payIn.Status).to.equal('CREATED');
        });
    });

    describe('PayIn PayPal Web', function () {
        let payIn;

        before(function (done) {
            const dto = {
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'EUR'
                },
                LineItems: [
                    {
                        Name: "running shoes",
                        Quantity: 1,
                        UnitAmount: 100,
                        TaxAmount: 0,
                        Description: "seller1 ID"
                    }
                ],
                ReturnURL: 'https://mangopay.com',
                PaymentType: 'PAYPAL',
                ExecutionType: 'WEB'
            };

            api.Acquiring.createPayIn(dto, function (response) {
                payIn = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(payIn).not.to.be.undefined;
            expect(payIn.PaymentType).to.equal('PAYPAL');
            expect(payIn.ExecutionType).to.equal('WEB');
            expect(payIn.Status).to.equal('CREATED');
        });
    });

    describe('PayPal DataCollection', function () {
        let dataCollection;

        before(function (done) {
            const dto = {
                "sender_account_id" : "A12345N343",
                "sender_first_name" : "Jane",
                "sender_last_name" : "Doe",
                "sender_email" : "jane.doe@sample.com",
                "sender_phone" : "(042) 1123 4567",
                "sender_address_zip" : "75009",
                "sender_country_code" : "FR",
                "sender_create_date" : "2012-12-09T19:14:55.277-0:00",
                "sender_signup_ip" : "10.220.90.20",
                "sender_popularity_score" : "high",
                "receiver_account_id" : "A12345N344",
                "receiver_create_date" : "2012-12-09T19:14:55.277-0:00",
                "receiver_email" : "jane@sample.com",
                "receiver_address_country_code" : "FR",
                "business_name" : "Jane Ltd",
                "recipient_popularity_score" : "high",
                "first_interaction_date" : "2012-12-09T19:14:55.277-0:00",
                "txn_count_total" : "34",
                "vertical" : "Household goods",
                "transaction_is_tangible" : "0"
            };

            api.Acquiring.createPayPalDataCollection(dto, function (response) {
                dataCollection = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(dataCollection).not.to.be.undefined;
            expect(dataCollection.dataCollectionId).not.to.be.undefined;
        });
    });

    describe('PayIn Refund', function () {
        let refund;

        before(function (done) {
            const payInDto = {
                DebitedFunds: {
                    Amount: 100,
                    Currency: 'EUR'
                },
                IpAddress: '2001:0620:0000:0000:0211:24FF:FE80:C12C',
                BrowserInfo: {
                    AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                    JavaEnabled: true,
                    Language: "FR-FR",
                    ColorDepth: 4,
                    ScreenHeight: 1800,
                    ScreenWidth: 400,
                    JavascriptEnabled: true,
                    TimeZoneOffset: "+60",
                    UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                },
                CardId: cardId,
                SecureMode: 'DEFAULT',
                SecureModeReturnURL: 'http://test.com',
                PaymentType: 'CARD',
                ExecutionType: 'DIRECT'
            };

            api.Acquiring.createPayIn(payInDto, function (createdPayIn) {
                const refundDto = {
                    DebitedFunds: {
                        Amount: 100,
                        Currency: 'EUR'
                    }
                };
                api.Acquiring.createPayInRefund(createdPayIn.Id, refundDto, function (response) {
                    refund = response;
                    done();
                });
            });
        });

        it('should create the PayIn', function () {
            expect(refund).not.to.be.undefined;
            expect(refund.Type).to.equal('PAYOUT');
            expect(refund.Nature).to.equal('REFUND');
            expect(refund.Status).to.equal('SUCCEEDED');
        });
    });

    describe('Card Validation', function () {
        let cardValidation;

        before(function (done) {
            const dto = {
                SecureModeReturnURL: "http://example.com",
                IpAddress: "2001:0620:0000:0000:0211:24FF:FE80:C12C",
                BrowserInfo: {
                    AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8",
                    ColorDepth: 4,
                    JavaEnabled: true,
                    JavascriptEnabled: true,
                    Language: 'FR-FR',
                    ScreenHeight: 1800,
                    ScreenWidth: 400,
                    TimeZoneOffset: "+60",
                    UserAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
                }
            };

            api.Acquiring.createCardValidation(cardId, dto, function (response) {
                cardValidation = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(cardValidation).to.not.be.undefined;
            expect(cardValidation.Id).to.not.be.undefined;
            expect(cardValidation.Type).to.equal("CARD_VALIDATION");
        });
    });

    describe('Settlement Report', function () {
        let report;

        before(function (done) {
            const dto = {
                DownloadFormat: "CSV",
                ReportType: "ACQUIRING_SETTLEMENT",
                AfterDate: 1740787200,
                BeforeDate: 1743544740,
                Filters: {
                    SettlementId: "placeholder"
                }
            };

            api.ReportsV2.create(dto, function (response) {
                report = response;
                done();
            });
        });

        it('should create the PayIn', function () {
            expect(report.Id).to.exist;
            expect(report.ReportType).to.equal("ACQUIRING_SETTLEMENT");
            expect(report.DownloadFormat).to.equal("CSV");
            expect(report.Status).to.equal("PENDING");
        });
    });
});