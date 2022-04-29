/**
 * ASSIGNMENT DOC:
 * any monetary calculations should not be done on browser without big number usage side
 * but given the assignment wording I expect this is expected on browser side
 *
 * Additionally I assumed that reward points are added only for "full" dollars:
 * left over cents do not grant partial reward points
 */

import {
    POINTS_PER_USD_ABOVE_HIGH,
    POINTS_PER_USD_ABOVE_LOW,
    THRESHOLD_HIGH,
    THRESHOLD_LOW
} from "./purchaseRewards.constants";

const purchaseRewardsService = {
    calculateRewardPointsForSinglePayment(payment) {
        const { amount } = payment;

        if (amount > THRESHOLD_HIGH) {
            return THRESHOLD_LOW * POINTS_PER_USD_ABOVE_LOW + Math.floor(amount - THRESHOLD_HIGH) * POINTS_PER_USD_ABOVE_HIGH;
        } else if (amount > THRESHOLD_LOW) {
            return Math.floor(amount - THRESHOLD_LOW) * POINTS_PER_USD_ABOVE_LOW;
        }
        return 0;
    },
    calculateRewardPointsForPayments(payments = []) {
        return payments.reduce((total, payment) => {
            return total + this.calculateRewardPointsForSinglePayment(payment);
        }, 0);
    },
}

export {
    purchaseRewardsService
}
