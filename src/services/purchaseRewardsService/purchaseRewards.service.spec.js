const {
    purchaseRewardsService,
} = require("./purchaseRewards.service");
const {THRESHOLD_LOW, THRESHOLD_HIGH, POINTS_PER_USD_ABOVE_LOW, POINTS_PER_USD_ABOVE_HIGH} = require("./purchaseRewards.constants");

describe('purchaseRewards service', () => {
    describe('.calculateRewardPointsForSinglePayment', () => {
        it('payments below or equal to first threshold grant no reward points', () => {
            const amountsToCheck = [0, THRESHOLD_LOW / 2, THRESHOLD_LOW];

            amountsToCheck.forEach(amount => {
                const mockPayment = {amount};

                expect(purchaseRewardsService.calculateRewardPointsForSinglePayment(mockPayment)).toEqual(0);
            });
        });

        it('payments between thresholds grant proper reward points', () => {
            const amountsToCheck = [
                THRESHOLD_LOW,
                THRESHOLD_HIGH - (THRESHOLD_HIGH - THRESHOLD_LOW) / 2,
                THRESHOLD_HIGH
            ];

            amountsToCheck.forEach(amount => {
                const mockPayment = {amount};
                const amountToConvert = Math.floor(amount - THRESHOLD_LOW);

                expect(purchaseRewardsService.calculateRewardPointsForSinglePayment(mockPayment))
                    .toEqual(amountToConvert * POINTS_PER_USD_ABOVE_LOW);
            });
        });

        it('payments above second threshold grant proper reward points', () => {
            const amountsToCheck = [
                THRESHOLD_HIGH,
                2 * THRESHOLD_HIGH,
                5 * THRESHOLD_HIGH,
                10 * THRESHOLD_HIGH,
            ];

            const fullRewardBelowSecondThreshold = (THRESHOLD_HIGH - THRESHOLD_LOW) * POINTS_PER_USD_ABOVE_LOW;

            amountsToCheck.forEach(amount => {
                const mockPayment = {amount};
                const amountToConvert = Math.floor(amount - THRESHOLD_HIGH);

                expect(purchaseRewardsService.calculateRewardPointsForSinglePayment(mockPayment))
                    .toEqual(fullRewardBelowSecondThreshold + amountToConvert * POINTS_PER_USD_ABOVE_HIGH);
            });
        });

        it('only full dollars are counted to reward points', () => {
            const amountsToCheck = [
                1,
                THRESHOLD_LOW + 1,
                THRESHOLD_HIGH + 1,
            ];

            amountsToCheck.forEach(amount => {
                const partial = Math.random(); // <0, 1)
                const mockPayment = {amount};
                const mockPaymentWithPartial = {amount: amount + partial};

                expect(purchaseRewardsService.calculateRewardPointsForSinglePayment(mockPayment))
                    .toEqual(purchaseRewardsService.calculateRewardPointsForSinglePayment(mockPaymentWithPartial));
            });
        });
    });

    describe('.calculateRewardPointsForPayments returns sum of reward points for given payments array', () => {
        jest.spyOn(purchaseRewardsService, 'calculateRewardPointsForSinglePayment').mockImplementation(payment => payment.amount);

        const mockPayments = [
            { amount: 10 },
            { amount: 20 },
            { amount: 30 },
            { amount: 40 },
        ];

        const totalAmount = mockPayments.reduce((total, { amount }) => total + amount, 0);

        expect(purchaseRewardsService.calculateRewardPointsForPayments(mockPayments)).toEqual(totalAmount);
    });
});
