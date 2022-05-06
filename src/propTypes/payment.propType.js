import PropTypes from 'prop-types';

const PaymentPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    ts: PropTypes.number.isRequired,
    customerId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired
});

export {
    PaymentPropType
}
