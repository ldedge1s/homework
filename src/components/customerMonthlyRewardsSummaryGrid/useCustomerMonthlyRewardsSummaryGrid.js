import {useEffect, useState} from "react";
import {createMonthRewardsColumnDefinition} from "./createMonthRewardsColumnDefinition";
import {customerMonthlyRewardsSummaryBaseColumnsConfig} from "./customerMonthlyRewardsSummaryBaseColumns.config";

const createFinalDataSet = (extendedPayments) => {
    const customerToRowIdx = {};

    return extendedPayments.reduce((dataSet, payment) => {
        const {customerId, month} = payment;

        let customerRow = customerToRowIdx[customerId];
        if (customerRow === undefined) {
            customerRow = {id: customerId, paymentDataPerMonth: {}, rewardPointsTotal: 0};
            customerToRowIdx[customerId] = customerRow;
            dataSet.push(customerRow);
        }

        const {paymentDataPerMonth} = customerRow;
        paymentDataPerMonth[month] = paymentDataPerMonth[month] || [];
        paymentDataPerMonth[month].push(payment);

        return dataSet;
    }, []);
};

const useCustomerMonthlyRewardsSummaryGrid = ({payments}) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([customerMonthlyRewardsSummaryBaseColumnsConfig.CUSTOMER_ID]);

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

        setColumns([
            customerMonthlyRewardsSummaryBaseColumnsConfig.CUSTOMER_ID,
            ...monthsInDataSet.map(createMonthRewardsColumnDefinition),
            customerMonthlyRewardsSummaryBaseColumnsConfig.TOTAL_REWARD_POINTS,
        ]);

        setRows(createFinalDataSet(extendedPayments));
    }, [payments]);

    return {
        rows,
        columns,
    }
};

export {
    useCustomerMonthlyRewardsSummaryGrid
}
