import { FC, useState } from 'react'
import { BaseTextFieldProps, TextField } from '@mui/material'

interface NumberFieldProps extends BaseTextFieldProps {
  value: number | undefined
  onChange: (value: number) => void
}

const NumberField: FC<NumberFieldProps> = ({ value, onChange, ...rest }) => {
  const [onFocus, setOnFocus] = useState(false)
  const [editingValue, setEditingValue] = useState('')

  return (
    <TextField
      {...rest}
      type="number"
      value={onFocus ? editingValue : value?.toString() ?? ''}
      placeholder={value?.toString() ?? ''}
      onChange={(e) => setEditingValue(e.target.value)}
      onFocus={() => {
        setEditingValue('')
        setOnFocus(true)
      }}
      onBlur={() => {
        setOnFocus(false)
        if (editingValue !== '') onChange(Number(editingValue))
      }}
    />
  )
}

export default NumberField