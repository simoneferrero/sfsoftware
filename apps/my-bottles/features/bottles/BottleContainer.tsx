import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllBottles, getBottles } from './slice';

import { Card, Header } from 'semantic-ui-react';
import BottleCard from '../../components/BottleCard';

import styled from 'styled-components';

const StyledBottleContainer = styled(Card.Group)`
  margin: 1em;
  padding: 0.5em;
`;

const BottleContainer = () => {
  const dispatch = useDispatch();
  const bottles = useSelector(selectAllBottles);

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
    <StyledBottleContainer stackable centered>
      {bottles
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((bottle) => (
          <BottleCard key={String(bottle._id)} {...bottle} />
        ))}
    </StyledBottleContainer>
  );
};

export default BottleContainer;