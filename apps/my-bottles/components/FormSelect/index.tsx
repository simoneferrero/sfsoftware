import { SyntheticEvent } from 'react'

import {
  DropdownItemProps,
  DropdownProps,
  Form,
  Select,
} from 'semantic-ui-react'

interface Props {
  handleChange: (
    event: SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void
  id: string
  label: string
  options: DropdownItemProps[]
  placeholder: string
  required?: boolean
  value: string
}

const FormSelect = ({
  handleChange,
  id,
  label,
  options,
  placeholder,
  required,
  value,
}: Props) => (
  <Form.Field required={required}>
    <label htmlFor={id}>{label}</label>
    <Select
      id={id}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      value={value}
    />
  </Form.Field>
)

export default FormSelect
