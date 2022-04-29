import {purchaseRewardsService} from "../../services/purchaseRewardsService/purchaseRewards.service";
import {
    CustomerMonthlyRewardsDetailGridComponent
} from "../customerMonthlyRewardsDetailGrid/customerMonthlyRewardsDetailGrid.component";
import React from "react";
import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import {MONTH_LABELS} from "../../constants/monthLabels";

const NoMaxWidthTooltip = styled(({className, ...props}) => (
    <Tooltip {...props} classes={{popper: className}}/>
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 'none',
        backgroundColor: '#fff',
        padding: 0,
        border: '1px solid #555'
    },
});

const TooltipContentRenderer = ({payments}) => {
    return (
        <div style={{height: 400, width: 600}}>
            <CustomerMonthlyRewardsDetailGridComponent payments={payments}/>
        </div>
    )
}

const createMonthRewardsColumnDefinition = monthIdx => ({
    field: `month${monthIdx}`,
    headerName: `${MONTH_LABELS[monthIdx]} points`,
    flex: 1,
    renderCell: (({row}) => {
        const monthPayments = row?.paymentDataPerMonth?.[monthIdx] || [];
        const totalRewardPointsForMonth = purchaseRewardsService.calculateRewardPointsForPayments(monthPayments);

        return <NoMaxWidthTooltip title={<TooltipContentRenderer payments={monthPayments}/>}>
            <span style={{cursor: 'pointer'}}>{totalRewardPointsForMonth}</span>
        </NoMaxWidthTooltip>;
    }),
});

export {
    createMonthRewardsColumnDefinition
}
