import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'

import { setVisibleForm, setSelectedBottle } from '../bottles/slice'
import { addBottle, modifyBottle } from '../bottles/async'
import {
  selectVisibleForm,
  selectSelectedBottle,
  selectLoading,
} from '../bottles/selectors'

import { Button, Form, Modal } from 'semantic-ui-react'
import FormDropzone from '../../components/FormDropzone'
import FormInput from '../../components/FormInput'
import FormSelect from '../../components/FormSelect'

import { BOTTLE_CATEGORIES } from '../../app/constants/bottleCategories'

const initialValues = {
  name: '',
  category: null,
  type: null,
  year: new Date().getFullYear(),
  volume: 0,
  quantity: 0,
  rating: 0,
  image: null,
}

const SidePanel = () => {
  const dispatch = useAppDispatch()

  const selectedBottle = useAppSelector(selectSelectedBottle)
  const loading = useAppSelector(selectLoading)
  const visible = useAppSelector(selectVisibleForm)

  const [formValues, setFormValues] = useState(initialValues)

  const resetForm = () => {
    setFormValues(initialValues)
  }

  const handleClose = () => {
    resetForm()
    dispatch(setSelectedBottle(null))
    dispatch(setVisibleForm(false))
  }

  const handleChange = (key, value) =>
    setFormValues((prevValues) => ({ ...prevValues, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedFormValues = {
      ...formValues,
      _id: selectedBottle?._id,
      type: selectedCategory.types ? formValues.type : null,
      year: selectedCategory.showYear ? formValues.year : null,
    }

    dispatch(
      selectedBottle
        ? modifyBottle({ formValues: updatedFormValues, resetForm })
        : addBottle({ formValues: updatedFormValues, resetForm })
    )
  }

  useEffect(() => {
    if (selectedBottle) {
      Object.keys(initialValues).forEach((key) => {
        handleChange(key, selectedBottle[key])
      })
    }
  }, [selectedBottle])

  const selectedCategory = BOTTLE_CATEGORIES.find(
    ({ value }) => value === formValues.category
  )

  const disableSubmit =
    loading ||
    !formValues.name ||
    !selectedCategory ||
    (selectedCategory.types && !formValues.type) ||
    (selectedCategory.showYear && formValues.year === undefined) ||
    formValues.volume === undefined ||
    formValues.quantity === undefined

  return (
    <Modal
      onClose={handleClose}
      onOpen={() => dispatch(setVisibleForm(true))}
      open={visible}
    >
      <Modal.Header>
        {selectedBottle ? `Edit ${selectedBottle.name}` : 'Add a new bottle'}
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <FormInput
                handleChange={({ target: { value } }) =>
                  handleChange('name', value)
                }
                id="name"
                label="Name"
                placeholder="Name"
                required
                value={formValues.name}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <FormSelect
                handleChange={(e, d) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    category: d.value,
                    type: selectedBottle?.type || null,
                    year: selectedBottle?.year || initialValues.year,
                  }))
                }}
                id="category"
                label="Category"
                options={BOTTLE_CATEGORIES.map(
                  ({ showYear, ...category }) => category
                )}
                placeholder="Select a category"
                required
                value={formValues.category}
              />
              {selectedCategory?.types && (
                <FormSelect
                  handleChange={(e, d) => {
                    handleChange('type', d.value)
                  }}
                  id="type"
                  label="Type"
                  options={selectedCategory?.types}
                  placeholder="Select a type"
                  required
                  value={formValues.type}
                />
              )}
            </Form.Group>
            <Form.Group widths="equal">
              {selectedCategory?.showYear && (
                <FormInput
                  handleChange={({ target: { value } }) =>
                    handleChange('year', Number(value))
                  }
                  id="year"
                  label="Year"
                  max={new Date().getFullYear()}
                  placeholder="Year"
                  required
                  type="number"
                  value={String(formValues.year)}
                />
              )}
              <FormInput
                handleChange={({ target: { value } }) =>
                  handleChange('volume', Number(value))
                }
                id="volume"
                label="Volume"
                max={100}
                min={0}
                placeholder="Volume"
                required
                type="number"
                value={String(formValues.volume)}
              />
              <FormInput
                handleChange={({ target: { value } }) =>
                  handleChange('quantity', Number(value))
                }
                id="quantity"
                label="Quantity"
                max={10000}
                min={0}
                placeholder="Quantity"
                required
                type="number"
                value={String(formValues.quantity)}
              />
              <FormSelect
                handleChange={(e, d) => {
                  handleChange('rating', Number(d.value))
                }}
                id="rating"
                label="Rating"
                options={[...Array(6).keys()].map((rating) => ({
                  text: <p>{rating} stars</p>,
                  value: String(rating),
                }))}
                placeholder="Select a rating"
                required
                value={String(formValues.rating)}
              />
            </Form.Group>
            <FormDropzone
              file={formValues.image}
              options={{
                accept: 'image/*',
                maxFiles: 1,
                onDrop: ([file]) => {
                  handleChange('image', file)
                },
              }}
              placeholder="Drag and drop an image here, or click to select one from your device"
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          disabled={disableSubmit}
          content={loading ? 'Loading...' : 'Submit'}
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
          type="submit"
        />
      </Modal.Actions>
    </Modal>
  )
}

export default SidePanel
