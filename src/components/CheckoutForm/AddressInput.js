import { Grid, TextField } from '@material-ui/core'
import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'

const AddressInput = ({required, name, label, type}) => {
  const { control } = useFormContext()

  return (
    <Grid item xs={12} sm={6}>
      <Controller control={control} name={name} render={({ field: {onChange, onBlur, value} }) => (
        <TextField type={type} onBlur={onBlur} fullWidth value={value} label={label} required={required} onChange={onChange} />
      )}/>
    </Grid>
  )
}

export default AddressInput
