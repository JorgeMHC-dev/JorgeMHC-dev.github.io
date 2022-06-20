import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';

const SumForm = () => {
  const [firstNum, setFirstNum] = useState(null);
  const [secondNum, setSecondNum] = useState(null);
  const [sumValue, setSumValue] = useState(null);

  const sumNumbers = (event) => {
    event.preventDefault();

    if (isNaN(firstNum) || isNaN(secondNum)) {
      setSumValue('You must only use numbers');
      return;
    }

    setSumValue(Number(firstNum) + Number(secondNum));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Suma de valores</h1>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="first number"
          placeholder="First number"
          defaultValue={firstNum}
          onChange={(e) => setFirstNum(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="second number"
          placeholder="Second number"
          defaultValue={secondNum}
          onChange={(e) => setSecondNum(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={sumNumbers} variant="contained">
          Add
        </Button>
      </Grid>
      <Grid item xs={12}>
        <p>{sumValue}</p>
      </Grid>
    </Grid>
  );
};

export { SumForm };
