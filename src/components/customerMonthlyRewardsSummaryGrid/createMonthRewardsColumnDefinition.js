import {purchaseRewardsService} from "../../services/purchaseRewardsService/purchaseRewards.service";
import React from "react";
import Popover from '@mui/material/Popover';
import {styled} from "@mui/material";
import {MONTH_LABELS} from "../../constants/monthLabels";
import {
    CustomerMonthlyRewardsDetailTable
} from "../customerMonthlyRewardsDetailTable/customerMonthlyRewardsDetailTable.component";

const StyledValue = styled('span')({
    cursor: 'pointer',
});

const StyledTableContainer = styled('div')({
    width: 600
});

const createMonthRewardsColumnDefinition = monthIdx => ({
    field: `month${monthIdx}`,
    headerName: `${MONTH_LABELS[monthIdx]} points`,
    flex: 1,
    type: 'number',
    valueGetter: ({row}) => {
        const monthPayments = row?.paymentDataPerMonth?.[monthIdx] || [];
        const totalRewardPointsForMonth = purchaseRewardsService.calculateRewardPointsForPayments(monthPayments);

        return totalRewardPointsForMonth;
    },
    renderCell: (({value, row}) => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const openDetailedPaymentsPopover = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const closeDetailedPaymentsPopover = () => {
            setAnchorEl(null);
        };

        const open = Boolean(anchorEl);
        const monthPayments = row?.paymentDataPerMonth?.[monthIdx] || [];

        return <>
            <StyledValue onClick={openDetailedPaymentsPopover}>{value}</StyledValue>

            <Popover
                id={`customerDetailedMonthlyPaymentsPopover-${row.customerId}-${monthIdx}`}
                open={open}
                anchorEl={anchorEl}
                onClose={closeDetailedPaymentsPopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <StyledTableContainer>
                    <CustomerMonthlyRewardsDetailTable payments={monthPayments}/>
                </StyledTableContainer>
            </Popover>
        </>;
    }),
});

export {
    createMonthRewardsColumnDefinition
}
