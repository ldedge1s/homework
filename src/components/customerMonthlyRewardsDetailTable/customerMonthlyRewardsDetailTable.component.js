import React from "react";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {purchaseRewardsService} from "../../services/purchaseRewardsService/purchaseRewards.service";
import {PaymentPropType} from "../../propTypes/payment.propType";

const CustomerMonthlyRewardsDetailTable = ({payments}) => {
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="right">Amount (USD)</TableCell>
                        <TableCell align="right">Reward Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map(payment => {
                        const {ts, amount} = payment;
                        const d = new Date(ts);

                        return (
                            <TableRow key={ts}>
                                <TableCell align="left">
                                    {`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`}
                                </TableCell>
                                <TableCell align="right">{amount}</TableCell>
                                <TableCell
                                    align="right">{purchaseRewardsService.calculateRewardPointsForSinglePayment(payment)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

CustomerMonthlyRewardsDetailTable.propTypes = {
    payments: PropTypes.arrayOf(PaymentPropType),
}

CustomerMonthlyRewardsDetailTable.defaultProps = {
    payments: []
};

export {
    CustomerMonthlyRewardsDetailTable
}
