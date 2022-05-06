import React, {useState, useCallback} from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import {
    CustomerMonthlyRewardsSummaryGrid
} from "../../components/customerMonthlyRewardsSummaryGrid/customerMonthlyRewardsSummaryGrid.component";
import {clientPurchaseEndpoint} from "../../services/clientPurchaseEndpoint/clientPurchase.endpoint";
import {ReportingPeriodSelect} from "../../components/reportingPeriodSelect/reportingPeriodSelect.component";
import {styled} from "@mui/material";

const StyledBreadcrumbs = styled(Breadcrumbs)({
    paddingBottom: 10,
});

const StyledGridContainer = styled('div')({
    height: 400,
    width: '100%',
    paddingTop: 10
});

const CustomerRewardsView = () => {
    const [payments, setPayments] = useState(null);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [reportingPeriod, setReportingPeriod] = useState();

    const handleReportingPeriodChange = useCallback((value) => {
        setReportingPeriod(value);

        if (value) {
            setPaymentsLoading(true);
            clientPurchaseEndpoint.loadHistory(value)
                .then(payments => {
                    setPayments(payments);
                    setPaymentsLoading(false);
                });
        } else {
            setPayments(null);
        }
    }, []);

    return (<>
        <StyledBreadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
                Charter Homework
            </Link>
            <Link underline="hover" color="inherit" href="#">
                Customer Reports
            </Link>
            <Link underline="hover" color="inherit" href="#">
                Monthly Rewards
            </Link>
        </StyledBreadcrumbs>

        <FormControl>
            <ReportingPeriodSelect onPeriodChange={handleReportingPeriodChange} value={reportingPeriod}/>
        </FormControl>

        <StyledGridContainer>
            {paymentsLoading ?
                <CircularProgress/> :
                (payments && <CustomerMonthlyRewardsSummaryGrid payments={payments}/>)
            }
        </StyledGridContainer>


    </>);
}

export {
    CustomerRewardsView
}
