# Notes:
- Made additional assumption that reward points are only given for full dollars spent in singular payment.  
  (this restriction can be removed by removing Math.floor calls in `purchaseRewards.service.js`)
- Where appropriate I've added comments marked as `ASSIGNMENT DOC` to comment on decision made in that area
- I intentionally only added unit tests for 2 files: one service and one component. If you'd like me to cover rest of the code please tell me
- All of the mocked payment data can be found in `mockApi/clientPurchaseHistory.mock.js`

# Important addition:
- You can see detailed reward information by clicking on monthly gained points of any user in the summary view.

# Requirements:
- NodeJS

# Setup:
Run `npm i` to install dependencies and after it finishes run any of the supported commands.

# Commands:
- `npm run build` - builds the project in `development` mode
- `npm run start` - starts the project in development mode **without** opening the browser
- `npm run present` - starts the project in development mode and automatically opens the browser
- `npm run test` - runs all unit tests
