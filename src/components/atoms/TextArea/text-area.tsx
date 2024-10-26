'use client'


import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';

interface CustomInputProps extends TextAreaProps {
  label: string;
  error?: string
}

export const TextAreaInput = ({ label, error, ...props }: CustomInputProps) => {
  return (
    <div>
      <label>{label}:</label>
      <TextArea {...props} />
      {error ? <label style={{ color: "red" }}>{error}</label> : null}
    </div>
  )
}