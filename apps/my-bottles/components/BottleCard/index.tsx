import { Bottle } from '../../types/Bottle';

import { useDispatch } from 'react-redux';

import { setSelectedBottle } from '../../features/bottles/slice';

import { Button, Card, Image, Rating } from 'semantic-ui-react';

import bottleLocales from '../../locales/bottles';

import styled from 'styled-components';

const StyledCard = styled(Card)`
  .imageContainer {
    max-height: 20em;
    display: flex;
    flex-direction: center;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;

    img {
      height: 20em;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    p {
      margin: 0 !important;
    }
  }
`;

const BottleCard = ({
  _id,
  category,
  imageUrl,
  name,
  quantity,
  rating,
  type,
  volume,
  year,
}: Bottle) => {
  const dispatch = useDispatch();

  const description = `${year ? year + ' ' : ''}${
    type ? bottleLocales[type] + ' ' : ''
  }${bottleLocales[category]}`;

  return (
    <StyledCard>
      <Card.Content textAlign="center">
        <Rating disabled rating={rating} maxRating={5} />
      </Card.Content>
      <div className="imageContainer">
        <Image alt={`${name} image`} src={imageUrl} wrapped ui={false} fluid />
      </div>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{description}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <div className="card-footer">
          <p>{quantity}x</p>
          <p>{volume}%</p>
          <Button
            icon="pencil"
            circular
            basic
            onClick={() => dispatch(setSelectedBottle(String(_id)))}
          />
        </div>
      </Card.Content>
    </StyledCard>
  );
};

export default BottleCard;
