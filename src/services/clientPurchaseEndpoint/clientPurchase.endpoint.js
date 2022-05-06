import axios from "axios";

const CLIENT_PURCHASE_ENDPOINT_URLS = {
    PURCHASE_HISTORY: ({start, end}) => `/api/purchase/history/${start}/${end}`,
};

const clientPurchaseEndpoint = {
    loadHistory(period) {
        return axios.get(CLIENT_PURCHASE_ENDPOINT_URLS.PURCHASE_HISTORY(period))
            .catch(console.error) //ASSIGNMENT DOC: extremely basic global "handler" just to see problems if they exist.
            .then(res => res.data)
            ;
    }
};

export {
    clientPurchaseEndpoint
}
