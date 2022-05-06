/**
 * @jest-environment jsdom
 */

import React from "react";
import {render, fireEvent, within} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ReportingPeriodSelect} from "./reportingPeriodSelect.component";

describe('reportingPeriodSelect component', () => {
    it('renders properly', () => {
        //given
        const {container} = render(<ReportingPeriodSelect/>);

        //then
        expect(container).toMatchSnapshot();
    });

    it('renders proper options', () => {
        //given
        const {getByRole} = render(<ReportingPeriodSelect/>);

        //when
        fireEvent.mouseDown(getByRole('button'));

        //then
        const listbox = within(getByRole('listbox'));
        expect(listbox.getAllByRole('option')).toMatchSnapshot();
    });

    it('calls onPeriodChange properly', () => {
        //given
        const handleChange = jest.fn();
        const {getByRole} = render(<ReportingPeriodSelect onPeriodChange={handleChange}/>);

        //when
        fireEvent.mouseDown(getByRole('button'));
        const listbox = within(getByRole('listbox'));

        expect(handleChange).not.toBeCalled();
        fireEvent.click(listbox.getAllByRole('option')[2]);

        //then
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenNthCalledWith(1, {start: 1, end: 3});
    });
});


