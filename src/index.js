import React from 'react';
import ReactDOMClient from 'react-dom/client';
import Grid from '@mui/material/Grid';
import {CustomerRewardsView} from "./views/customerRewards/customerRewards.view";

const App = () => {
    return (
        <Grid
            container
            spacing={0}
            padding={0}
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={10}>
                <CustomerRewardsView />
            </Grid>
        </Grid>
    );
}

const root = ReactDOMClient.createRoot(document.getElementById('app'));
root.render(<App/>);
