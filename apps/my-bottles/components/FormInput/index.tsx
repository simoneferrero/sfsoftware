import { ChangeEvent } from 'react'

import { Form, Input } from 'semantic-ui-react'

interface Props {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  id: string
  label: string
  max?: number
  min?: number
  placeholder: string
  required?: boolean
  type?: string
  value: string
}

const FormInput = ({
  handleChange,
  id,
  label,
  max,
  min,
  placeholder,
  required,
  type,
  value,
}: Props) => (
  <Form.Field required={required}>
    <label htmlFor={id}>{label}</label>
    <Input
      id={id}
      max={max}
      min={min}
      name={id}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
    />
  </Form.Field>
)

export default FormInput
