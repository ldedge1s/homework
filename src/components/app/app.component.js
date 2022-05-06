import {CssBaseline, styled} from "@mui/material";
import Grid from "@mui/material/Grid";
import {CustomerRewardsView} from "../../views/customerRewards/customerRewards.view";
import React from "react";

const StyledGrid = styled(Grid)({
    minHeight: '100vh',
});

const App = () => {
    return (
        <>
            <CssBaseline/>
            <StyledGrid
                container
                spacing={0}
                padding={0}
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={10}>
                    <CustomerRewardsView/>
                </Grid>
            </StyledGrid>
        </>
    );
}

App.propTypes = {};

export {
    App
}
