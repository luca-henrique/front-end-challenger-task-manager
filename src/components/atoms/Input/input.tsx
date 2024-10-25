'use client'

import { Input as DefaultInput, InputProps } from 'antd';
interface CustomInputProps extends InputProps {
  label: string;
  error?: string
}

export const Input = ({ label, error, ...props }: CustomInputProps) => {
  return (
    <div>
      <label>{label}:</label>
      <DefaultInput {...props} />
      {error ? <label style={{ color: "red" }}>{error}</label> : null}
    </div>
  )
}