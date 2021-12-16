import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll, getBottles } from './bottleContainerSlice';

import { Card, Header } from 'semantic-ui-react';
import BottleCard from '../../components/BottleCard';

const BottleContainer = () => {
  const dispatch = useDispatch();
  const bottles = useSelector(selectAll);

  useEffect(() => {
    dispatch(getBottles());
  }, [dispatch]);

  if (!bottles.length) {
    return (
      <Header as="h3" textAlign="center">
        Add a bottle to see it here.
      </Header>
    );
  }

  return (
    <Card.Group stackable centered>
      {bottles
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((bottle) => (
          <BottleCard key={String(bottle._id)} {...bottle} />
        ))}
    </Card.Group>
  );
};

export default BottleContainer;
