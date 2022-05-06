import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import React, {useMemo, useCallback} from "react";
import MenuItem from "@mui/material/MenuItem";
import {MONTH_LABELS} from "../../constants/monthLabels";
import PropTypes from "prop-types";
import {styled} from "@mui/material";

const reportingPeriod = 3;
const reportingPeriodEndOffset = reportingPeriod - 1;
const maxReportingStartMonthIdx = 11 - reportingPeriodEndOffset;

const selectValueOption = {
    value: 'select',
    label: 'Select'
};

const StyledSelect = styled(Select)({
    width: 220
});

const ReportingPeriodSelect = ({value, onPeriodChange}) => {
    const optionsData = useMemo(() => {
        const newOptionsData = [selectValueOption];
        for (let i = 0; i <= maxReportingStartMonthIdx; i++) {
            const value = {
                start: i,
                end: i + reportingPeriodEndOffset,
            };

            newOptionsData.push({
                value,
                label: `${MONTH_LABELS[value.start]} - ${MONTH_LABELS[value.end]}`,
            });
        }
        return newOptionsData;
    }, []);

    const handleChange = useCallback((evt) => {
        if (onPeriodChange) {
            const newValue = evt?.target?.value;
            if (newValue === selectValueOption.value) {
                onPeriodChange(undefined);
            } else {
                onPeriodChange(newValue);
            }
        }
    }, [onPeriodChange])

    if (!value) {
        value = selectValueOption.value;
    }

    return (
        <>
            <InputLabel id="demo-simple-select-label">Reporting Period</InputLabel>
            <StyledSelect
                labelId="reporting-period"
                label="Reporting Period"
                value={value}
                onChange={handleChange}
            >
                {optionsData.map((data, idx) => (
                    <MenuItem value={data.value} key={idx}>
                        {data.label}
                    </MenuItem>
                ))}
            </StyledSelect>
        </>
    );
}

ReportingPeriodSelect.propTypes = {
    value: PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }),
    onPeriodChange: PropTypes.func
};

ReportingPeriodSelect.defaultProps = {
    onPeriodChange: () => {
    },
};

export {
    ReportingPeriodSelect
}
