import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {purchaseRewardsService} from "../../services/purchaseRewardsService/purchaseRewards.service";

const CustomerMonthlyRewardsDetailGridComponent = ({payments = []}) => {

    const finalPayments = [...payments];
    finalPayments.forEach((payment, idx) => {
        payment.id = idx;
        return payment;
    });

    finalPayments.sort((a, b) => a.ts - b.ts);

    return (
        <DataGrid
            rows={finalPayments}
            columns={[
                {
                    field: 'ts',
                    headerName: 'Date',
                    flex: 3,
                    valueGetter: ({value}) => {
                        const d = new Date(value);

                        /**
                         * ASSIGNMENT DOC:
                         * just to show readable date - for real life scenarios more robust date formatter should be used
                         */
                        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
                    }
                },
                {field: 'amount', headerName: 'Amount (USD)', flex: 2},
                {
                    field: 'points',
                    headerName: 'Reward Points',
                    flex: 2,
                    valueGetter: ({row}) => purchaseRewardsService.calculateRewardPointsForSinglePayment(row)
                },
            ]}
        />
    )
}

export {
    CustomerMonthlyRewardsDetailGridComponent
}
