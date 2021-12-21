import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  setVisibleForm,
  setSelectedBottle,
  addBottle,
  modifyBottle,
  selectVisibleForm,
  selectSelectedBottle,
  selectLoading,
} from '../bottles/slice'

import { Button, Form, Modal } from 'semantic-ui-react'
import FormDropzone from '../../components/FormDropzone'
import FormInput from '../../components/FormInput'
import FormSelect from '../../components/FormSelect'

import { BOTTLE_CATEGORIES } from '../../app/constants/bottleCategories'

const SidePanel = () => {
  const dispatch = useDispatch()

  const selectedBottle = useSelector(selectSelectedBottle)
  const loading = useSelector(selectLoading)
  const visible = useSelector(selectVisibleForm)

  const [name, setName] = useState('')
  const [category, setCategory] = useState(null)
  const [type, setType] = useState(null)
  const [year, setYear] = useState(new Date().getFullYear())
  const [volume, setVolume] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [rating, setRating] = useState(0)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (selectedBottle) {
      setName(selectedBottle?.name)
      setCategory(selectedBottle?.category)
      setType(selectedBottle?.type)
      setYear(selectedBottle?.year)
      setVolume(selectedBottle?.volume)
      setQuantity(selectedBottle?.quantity)
      setRating(selectedBottle?.rating)
    }
  }, [selectedBottle])

  const selectedCategory = BOTTLE_CATEGORIES.find(
    ({ value }) => value === category
  )

  const disableSubmit =
    loading ||
    !name ||
    !selectedCategory ||
    (selectedCategory.types && !type) ||
    (selectedCategory.showYear && year === undefined) ||
    volume === undefined ||
    quantity === undefined

  const resetForm = () => {
    setName('')
    setCategory(null)
    setType(null)
    setYear(new Date().getFullYear())
    setVolume(0)
    setQuantity(0)
    setRating(0)
    setImage(null)
  }

  const handleClose = () => {
    resetForm()
    dispatch(setSelectedBottle(null))
    dispatch(setVisibleForm(false))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formValues = {
      _id: selectedBottle?._id,
      name,
      category,
      volume,
      quantity,
      rating,
      type: selectedCategory.types ? type : null,
      year: selectedCategory.showYear ? year : null,
      ...(image && { image }),
    }

    dispatch(
      selectedBottle
        ? modifyBottle({ formValues, resetForm })
        : addBottle({ formValues, resetForm })
    )
  }

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
                handleChange={({ target: { value } }) => setName(value)}
                id="name"
                label="Name"
                placeholder="Name"
                required
                value={name}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <FormSelect
                handleChange={(e, d) => {
                  setCategory(d.value)
                  setType(null)
                }}
                id="category"
                label="Category"
                options={BOTTLE_CATEGORIES.map(
                  ({ showYear, ...category }) => category
                )}
                placeholder="Select a category"
                required
                value={category}
              />
              {selectedCategory?.types && (
                <FormSelect
                  handleChange={(e, d) => {
                    setType(d.value)
                  }}
                  id="type"
                  label="Type"
                  options={selectedCategory?.types}
                  placeholder="Select a type"
                  required
                  value={type}
                />
              )}
            </Form.Group>
            <Form.Group widths="equal">
              {selectedCategory?.showYear && (
                <FormInput
                  handleChange={({ target: { value } }) =>
                    setYear(Number(value))
                  }
                  id="year"
                  label="Year"
                  max={new Date().getFullYear()}
                  placeholder="Year"
                  required
                  type="number"
                  value={String(year)}
                />
              )}
              <FormInput
                handleChange={({ target: { value } }) =>
                  setVolume(Number(value))
                }
                id="volume"
                label="Volume"
                max={100}
                min={0}
                placeholder="Volume"
                required
                type="number"
                value={String(volume)}
              />
              <FormInput
                handleChange={({ target: { value } }) =>
                  setQuantity(Number(value))
                }
                id="quantity"
                label="Quantity"
                max={10000}
                min={0}
                placeholder="Quantity"
                required
                type="number"
                value={String(quantity)}
              />
              <FormSelect
                handleChange={(e, d) => {
                  setRating(Number(d.value))
                }}
                id="rating"
                label="Rating"
                options={[...Array(6).keys()].map((rating) => ({
                  text: <p>{rating} stars</p>,
                  value: String(rating),
                }))}
                placeholder="Select a rating"
                required
                value={String(rating)}
              />
            </Form.Group>
            <FormDropzone
              file={image}
              options={{
                accept: 'image/*',
                maxFiles: 1,
                onDrop: ([file]) => {
                  setImage(file)
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
