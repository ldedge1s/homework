const createMockPurchase = (customerId, day, month, amount) => {
    return {
        //ASSIGNMENT DOC: I'm assuming timezones are not an issue - proper TZ solution would greatly extend code required
        ts: +new Date(2022, month - 1, day),
        customerId,
        amount,
        currency: 'USD',
    }
};

const CLIENTS = {
    LOW_SPENDER: 'LOW_SPENDER',
    HIGH_SPENDER: 'HIGH_SPENDER',
    SINGLE_TIME_CLIENT: 'SINGLE_TIME_CLIENT',
};

const clientPurchaseHistoryMockData = [];

for(let i=0; i<3; i++){ //quick multiply mock data over other months
    const monthOffset = i*4;

    clientPurchaseHistoryMockData.push(...[
        createMockPurchase(CLIENTS.LOW_SPENDER, 1, monthOffset + 1, 12),
        createMockPurchase(CLIENTS.LOW_SPENDER, 7, monthOffset + 1, 17),
        createMockPurchase(CLIENTS.LOW_SPENDER, 20, monthOffset + 1, 51),

        createMockPurchase(CLIENTS.LOW_SPENDER, 15, monthOffset + 2, 75),

        createMockPurchase(CLIENTS.LOW_SPENDER, 1, monthOffset + 3, 10),
        createMockPurchase(CLIENTS.LOW_SPENDER, 10, monthOffset + 3, 50),
        createMockPurchase(CLIENTS.LOW_SPENDER, 26, monthOffset + 3, 10),

        /*****/
        createMockPurchase(CLIENTS.HIGH_SPENDER, 1, monthOffset + 1, 1000),
        createMockPurchase(CLIENTS.HIGH_SPENDER, 15, monthOffset + 1, 75),
        createMockPurchase(CLIENTS.HIGH_SPENDER, 16, monthOffset + 1, 500),

        createMockPurchase(CLIENTS.HIGH_SPENDER, 7, monthOffset + 2, 120),
        createMockPurchase(CLIENTS.HIGH_SPENDER, 28, monthOffset + 2, 1200),

        createMockPurchase(CLIENTS.HIGH_SPENDER, 11, monthOffset + 3, 2001),

        /*****/
        createMockPurchase(CLIENTS.SINGLE_TIME_CLIENT, 23, monthOffset + 2, 99),
    ]);
}

clientPurchaseHistoryMockData.sort( //ASSIGNMENT DOC: sort chronologically just so clients are not grouped by client in the simulated scenario
    (a, b) => a.ts - b.ts
);

module.exports = {
    clientPurchaseHistoryMockData
};
