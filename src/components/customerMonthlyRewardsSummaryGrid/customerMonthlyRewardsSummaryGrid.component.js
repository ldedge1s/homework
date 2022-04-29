import {DataGrid} from "@mui/x-data-grid";
import React, {useState, useEffect} from "react";
import {purchaseRewardsService} from "../../services/purchaseRewardsService/purchaseRewards.service";
import {createMonthRewardsColumnDefinition} from "./createMonthRewardsColumnDefinition";

const BASE_MONTHLY_REWARDS_SUMMARY_COLUMNS = {
    CUSTOMER_ID: {field: 'id', headerName: 'Customer ID', flex: 3},
    TOTAL_REWARD_POINTS: {
        field: 'customerId',
        headerName: 'Total points',
        flex: 1,
        valueGetter: ({row}) => {
            return Object.values(row?.paymentDataPerMonth || {}).reduce((monthRewardPoints, monthPayments) => {
                return monthRewardPoints + purchaseRewardsService.calculateRewardPointsForPayments(monthPayments);
            }, 0);
        }
    }
};

const CustomerMonthlyRewardsSummaryGridComponent = ({ payments }) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([BASE_MONTHLY_REWARDS_SUMMARY_COLUMNS.CUSTOMER_ID]);

    useEffect(() => {
        const monthsInDataSet = [];

        const extendedPayments = payments.map(payment => {
            const {ts} = payment;
            payment.month = (new Date(ts)).getMonth();

            if (!monthsInDataSet.includes(payment.month)) {
                monthsInDataSet.push(payment.month);
            }

            return payment;
        });

        const monthColumns = monthsInDataSet.map(createMonthRewardsColumnDefinition);

        setColumns([
            BASE_MONTHLY_REWARDS_SUMMARY_COLUMNS.CUSTOMER_ID,
            ...monthColumns,
            BASE_MONTHLY_REWARDS_SUMMARY_COLUMNS.TOTAL_REWARD_POINTS,
        ]);

        const customerToRowIdx = {};

        const finalDataSet = extendedPayments.reduce((data, payment) => {
            const {customerId, month} = payment;

            let customerRow = customerToRowIdx[customerId];
            if (customerRow === undefined) {
                customerRow = {id: customerId, paymentDataPerMonth: {}, rewardPointsTotal: 0};
                customerToRowIdx[customerId] = customerRow;
                data.push(customerRow);
            }

            const {paymentDataPerMonth} = customerRow;
            paymentDataPerMonth[month] = paymentDataPerMonth[month] || [];
            paymentDataPerMonth[month].push(payment);

            return data;
        }, []);

        setRows(finalDataSet);
    }, [payments]);

    return (
        <DataGrid
            rows={rows}
            columns={columns}
        />
    )
}

export {
    CustomerMonthlyRewardsSummaryGridComponent
}
