import { DropzoneOptions } from 'react-dropzone'

import { useDropzone } from 'react-dropzone'

import { Form } from 'semantic-ui-react'

import styled from 'styled-components'

interface Props {
  file?: File
  options: DropzoneOptions
  placeholder: string
}

const StyledDropzone = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #eee;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

const FormDropzone = ({ file, options, placeholder }: Props) => {
  const { getRootProps, getInputProps } = useDropzone(options)

  return (
    <Form.Field>
      <StyledDropzone {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>{file ? file.name : placeholder}</p>
      </StyledDropzone>
    </Form.Field>
  )
}

export default FormDropzone
