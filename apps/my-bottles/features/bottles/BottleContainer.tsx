import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/redux'
import { getBottles } from './async'
import { selectAllBottles, selectLoading } from './selectors'

import { Card, Container, Header } from 'semantic-ui-react'
import BottleCard from '../../components/BottleCard'

import styled from 'styled-components'

const StyledBottleContainer = styled(Card.Group)`
  margin: 1em;
  padding: 0.5em;
`

const BottleContainer = () => {
  const dispatch = useAppDispatch()
  const bottles = useAppSelector(selectAllBottles)
  const loading = useAppSelector(selectLoading)

  useEffect(() => {
    dispatch(getBottles())
  }, [dispatch])

  if (loading) {
    return <Container textAlign="center">Loading...</Container>
  }

  if (!bottles.length) {
    return (
      <Header as="h3" textAlign="center">
        Add a bottle to see it here.
      </Header>
    )
  }

  return (
    <StyledBottleContainer stackable centered>
      {bottles
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((bottle) => (
          <BottleCard key={String(bottle._id)} {...bottle} />
        ))}
    </StyledBottleContainer>
  )
}

export default BottleContainer
