import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../../utils/test-utils'

import FormDropzone from '.'

describe('Given <FormDropzone />', () => {
  const onDropMock = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('When an image has NOT been selected', () => {
    it('should render correctly', async () => {
      const options = {
        accept: 'image/*',
        maxFiles: 1,
        onDrop: onDropMock,
      }
      const placeholder = 'No image selected'

      render(<FormDropzone options={options} placeholder={placeholder} />)

      const { getByLabelText, queryByText } = screen

      const fileInput = getByLabelText('File Upload')

      expect(queryByText(placeholder)).toBeInTheDocument()
      expect(fileInput).toBeInTheDocument()
      const file = new File(['newFile'], 'newFile.png', { type: 'image/png' })

      userEvent.upload(fileInput, file)

      await waitFor(() => {
        expect(onDropMock).toHaveBeenCalled()
      })
    })
  })

  describe('When an image has been selected', () => {
    it('should render correctly', () => {
      const fileName = 'existingFile.png'
      const file = new File(['existingFile'], fileName, { type: 'image/png' })
      const options = {
        accept: 'image/*',
        maxFiles: 1,
        onDrop: onDropMock,
      }
      const placeholder = 'No image selected'

      render(
        <FormDropzone file={file} options={options} placeholder={placeholder} />
      )

      const { getByLabelText, getByText, queryByText } = screen

      expect(getByLabelText('File Upload')).toBeInTheDocument()
      expect(queryByText(placeholder)).not.toBeInTheDocument()
      expect(getByText(fileName)).toBeInTheDocument()
    })
  })
})
