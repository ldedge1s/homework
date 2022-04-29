import React, {useState} from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import {
    CustomerMonthlyRewardsSummaryGridComponent
} from "../../components/customerMonthlyRewardsSummaryGrid/customerMonthlyRewardsSummaryGrid.component";
import {clientPurchaseEndpoint} from "../../services/clientPurchaseEndpoint/clientPurchase.endpoint";
import {ReportingPeriodSelectComponent} from "../../components/reportingPeriodSelect/reportingPeriodSelect.component";

const CustomerRewardsView = () => {
    const [payments, setPayments] = useState(null);
    const [paymentsLoading, setPaymentsLoading] = useState(false);
    const [reportingPeriod, setReportingPeriod] = useState();

    const handleReportingPeriodChange = (value) => {
        setReportingPeriod(value);

        if(value){
            setPaymentsLoading(true);
            clientPurchaseEndpoint.loadHistory(value)
                .then(payments => {
                    setPayments(payments);
                    setPaymentsLoading(false);
                });
        }else{
            setPayments(null);
        }
    };

    return (<>
        <Breadcrumbs aria-label="breadcrumb" style={{paddingBottom: 10}}>
            <Link underline="hover" color="inherit" href="#">
                Chapter Homework
            </Link>
            <Link underline="hover" color="inherit" href="#">
                Customer Reports
            </Link>
            <Link underline="hover" color="inherit" href="#">
                Monthly Rewards
            </Link>
        </Breadcrumbs>

        <FormControl>
            <ReportingPeriodSelectComponent onPeriodChange={handleReportingPeriodChange} value={reportingPeriod} />
        </FormControl>

        <div style={{height: 400, width: '100%', paddingTop: 10}}>
            {paymentsLoading ?
                <CircularProgress/> :
                (payments && <CustomerMonthlyRewardsSummaryGridComponent payments={payments}/>)
            }
        </div>
    </>);
}

export {
    CustomerRewardsView
}
