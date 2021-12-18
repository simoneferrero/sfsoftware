import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import {
  setVisibleForm,
  addBottle,
  modifyBottle,
  selectVisibleForm,
  selectSelectedBottle,
} from '../bottles/slice';

import { Button, Form, Input, Modal, Select } from 'semantic-ui-react';

import styled from 'styled-components';

import { BOTTLE_CATEGORIES } from '../../app/constants/bottleCategories';

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
`;

const SidePanel = () => {
  const selectedBottle = useSelector(selectSelectedBottle);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [volume, setVolume] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const visible = useSelector(selectVisibleForm);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(selectedBottle?.name);
    setCategory(selectedBottle?.category);
    setType(selectedBottle?.type);
    setYear(selectedBottle?.year);
    setVolume(selectedBottle?.volume);
    setQuantity(selectedBottle?.quantity);
    setRating(selectedBottle?.rating);
  }, [selectedBottle]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: ([file]) => {
      setImage(file);
    },
  });

  const selectedCategory = BOTTLE_CATEGORIES.find(
    ({ value }) => value === category
  );

  const resetForm = () => {
    setName('');
    setCategory(null);
    setType(null);
    setYear(0);
    setVolume(0);
    setQuantity(0);
    setRating(0);
    setImage(null);
  };

  const handleClose = () => {
    resetForm();
    dispatch(setVisibleForm(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      _id: selectedBottle?._id,
      name,
      category,
      volume,
      quantity,
      rating,
      ...(selectedCategory.types && { type }),
      ...(selectedCategory.showYear && { year }),
      ...(image && { image }),
    };

    dispatch(
      selectedBottle
        ? modifyBottle({ formValues, resetForm })
        : addBottle({ formValues, resetForm })
    );
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={() => dispatch(setVisibleForm(true))}
      open={visible}
    >
      <Modal.Header>ADD NEW BOTTLE</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Name</label>
                <Input
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field required>
                <label>Category</label>
                <Select
                  options={BOTTLE_CATEGORIES.map(
                    ({ showYear, ...category }) => category
                  )}
                  placeholder="Select a category"
                  value={category}
                  onChange={(e, d) => setCategory(d.value)}
                  required
                />
              </Form.Field>
              {selectedCategory?.types && (
                <Form.Field>
                  <label>Type</label>
                  <Select
                    options={selectedCategory?.types}
                    placeholder="Select a type"
                    value={type}
                    onChange={(e, d) => setType(d.value)}
                    required
                  />
                </Form.Field>
              )}
            </Form.Group>
            <Form.Group widths="equal">
              {selectedCategory?.showYear && (
                <Form.Field>
                  <label>Year</label>
                  <Input
                    placeholder="Year"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    type="number"
                    max={new Date().getFullYear()}
                  />
                </Form.Field>
              )}
              <Form.Field required>
                <label>Volume</label>
                <Input
                  placeholder="Volume"
                  required
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  type="number"
                  min={0}
                  max={100}
                />
              </Form.Field>
              <Form.Field required>
                <label>Quantity</label>
                <Input
                  placeholder="Quantity"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  type="number"
                  min={0}
                  max={10000}
                />
              </Form.Field>
              <Form.Field>
                <label>Rating</label>
                <Input
                  placeholder="Rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  type="number"
                  min={0}
                  max={5}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <StyledDropzone {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>
                  {image
                    ? image.name
                    : 'Drag and drop an image here, or click to select one from your device'}
                </p>
              </StyledDropzone>
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="grey" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          content="Submit"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSubmit}
          positive
          type="submit"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default SidePanel;
