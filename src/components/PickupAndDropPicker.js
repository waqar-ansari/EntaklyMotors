"use client"
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import {
    renderDigitalClockTimeView,
    renderTimeViewClock,
  } from '@mui/x-date-pickers/timeViewRenderers';

function PickupAndDropPicker() {
  const [pickupDate, setPickupDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <TextField label="Pickup Location" variant="outlined" />
        <TextField label="Drops Location" variant="outlined" />
        <DateTimeRangePicker
        months={2}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        {/* <DateTimeRangePicker
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          /> */}
        <Button variant="contained" color="primary">
          Show Cars
        </Button>
      </div>
    </LocalizationProvider>
  );
}

export default PickupAndDropPicker;