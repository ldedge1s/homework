import React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {useCustomerMonthlyRewardsSummaryGrid} from "./useCustomerMonthlyRewardsSummaryGrid";
import {customerMonthlyRewardsSummaryBaseColumnsConfig} from "./customerMonthlyRewardsSummaryBaseColumns.config";
import PropTypes from "prop-types";
import {PaymentPropType} from "../../propTypes/payment.propType";

const initialState = {
    sorting: {
        sortModel: [{
            field: customerMonthlyRewardsSummaryBaseColumnsConfig.CUSTOMER_ID.field,
            sort: 'asc'
        }],
    },
};

const CustomerMonthlyRewardsSummaryGrid = ({payments}) => {
    const {rows, columns} = useCustomerMonthlyRewardsSummaryGrid({payments});

    return (
        <DataGrid
            initialState={initialState}
            rows={rows}
            columns={columns}
        />
    )
}

CustomerMonthlyRewardsSummaryGrid.propTypes = {
    payments: PropTypes.arrayOf(PaymentPropType),
}

CustomerMonthlyRewardsSummaryGrid.defaultProps = {
    payments: []
};

export {
    CustomerMonthlyRewardsSummaryGrid
}
