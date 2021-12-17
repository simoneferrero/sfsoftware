import { RootState } from '../../app/store';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setVisible, addBottle } from './bottleFormSlice';

import { Button, Form, Input, Modal, Select } from 'semantic-ui-react';

import { BOTTLE_CATEGORIES } from '../../app/constants/bottleCategories';

const SidePanel = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [volume, setVolume] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const visible = useSelector((state: RootState) => state.bottleForm.visible);
  const dispatch = useDispatch();

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
  };

  const handleClose = () => {
    resetForm();
    dispatch(setVisible(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValues = {
      name,
      category,
      ...(selectedCategory.types && { type }),
      ...(selectedCategory.showYear && { year }),
      volume,
      quantity,
      rating,
    };

    dispatch(addBottle({ formValues, resetForm }));
  };

  return (
    <Modal
      onClose={handleClose}
      onOpen={() => dispatch(setVisible(true))}
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
                  options={BOTTLE_CATEGORIES}
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
