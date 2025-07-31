import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './CustomDateRangePicker.css';

const CustomDateRangePicker = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection);
    onDateRangeChange(ranges.selection);
  };

  return (
    <div className="date-range-picker-container">
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        months={1}
        direction="horizontal"
        showDateDisplay={false}
        rangeColors={['#ED1C24']}
        className="date-range-picker"
      />
    </div>
  );
};

export default CustomDateRangePicker;


