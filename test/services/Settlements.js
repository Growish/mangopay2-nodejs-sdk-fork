var expect = require('chai').expect;
var api = require('../main');
const path = require("path");
const fs = require('fs');

describe('Settlements', function () {
    var settlement;

    before(function (done) {
        api.Settlements.generateUploadUrl({FileName: "settlement_sample.csv"}).then(function (data) {
            settlement = data;
            done();
        });
    });

    it('should generate upload url', function () {
        expect(settlement).not.to.be.undefined;
        expect(settlement.UploadUrl).not.to.be.undefined;
        expect(settlement.SettlementId).not.to.be.undefined;
    });

    describe('Fetch', function () {
        var fetched;

        before(function (done) {
            api.Settlements.get(settlement.SettlementId).then(function (data) {
                fetched = data;
                done();
            });
        });

        it('should be fetched', function () {
            expect(fetched).not.to.be.undefined;
            expect(fetched.Status).to.equal("PENDING_UPLOAD");
        });
    });

    describe('Generate new upload url', function () {
        var newUploadUrl;

        before(function (done) {
            api.Settlements.generateNewUploadUrl(settlement.SettlementId, {FileName: "settlement_sample_updated.csv"}).then(function (data) {
                newUploadUrl = data;
                done();
            });
        });

        it('should generate the new url', function () {
            expect(newUploadUrl).not.to.be.undefined;
            expect(newUploadUrl.UploadUrl).not.to.be.undefined;
            expect(newUploadUrl.SettlementId).not.to.be.undefined;
        });
    });

    describe('Upload file', function () {
        var uploadResponse;

        before(function (done) {
            const filePath = path.resolve(__dirname, '../settlement_sample.csv');
            const fileBuffer = fs.readFileSync(filePath);

            var options = {
                data: fileBuffer,
                url: settlement.UploadUrl,
                headers: {
                    'Content-Type': 'text/csv'
                }
            };

            api.method('put', function (data, response) {
                uploadResponse = response;
                done();
            }, options);
        });

        it('should upload the file', function () {
            expect(uploadResponse).not.to.be.undefined;
            expect(uploadResponse.status).to.equal(200);
        });
    });

    describe('Get Validations', function () {
        var validations;

        before(function (done) {
            const filePath = path.resolve(__dirname, '../settlement_sample_bad.csv');
            const fileBuffer = fs.readFileSync(filePath);

            var options = {
                data: fileBuffer,
                url: settlement.UploadUrl,
                headers: {
                    'Content-Type': 'text/csv'
                }
            };

            api.method('put', function (data, response) {
                api.Settlements.getValidations(settlement.SettlementId).then(function (data) {
                    validations = data;
                    done();
                });
            }, options);
        });

        it('should upload the file', function () {
            expect(validations).not.to.be.undefined;
        });
    });

    describe('Cancel settlement', function () {
        var cancelled;

        before(function (done) {
            api.Settlements.generateUploadUrl({FileName: "settlement_sample.csv"}).then(function (data) {
                api.Settlements.cancel(data.SettlementId).then(function (data) {
                    cancelled = data;
                    done();
                });
            });
        });

        it('should cancel the settlement', function () {
            expect(cancelled).not.to.be.undefined;
            expect(cancelled.Status).to.equal("CANCELLED");
        });
    });
});
