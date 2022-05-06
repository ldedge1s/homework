import {purchaseRewardsService} from "../../services/purchaseRewardsService/purchaseRewards.service";

const customerMonthlyRewardsSummaryBaseColumnsConfig = {
    CUSTOMER_ID: {
        field: 'id',
        headerName: 'Customer ID',
        flex: 3,
    },
    TOTAL_REWARD_POINTS: {
        field: 'paymentDataPerMonth',
        headerName: 'Total points',
        type: 'number',
        flex: 1,
        valueGetter: ({row}) => {
            return Object.values(row?.paymentDataPerMonth || {}).reduce((monthRewardPoints, monthPayments) => {
                return monthRewardPoints + purchaseRewardsService.calculateRewardPointsForPayments(monthPayments);
            }, 0);
        }
    }
};

export {
    customerMonthlyRewardsSummaryBaseColumnsConfig
}
