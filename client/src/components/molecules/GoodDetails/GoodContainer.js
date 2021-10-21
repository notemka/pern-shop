import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div(
  ({ theme: { breakpoints } }) => css`
    display: grid;
    grid-template-columns: 1fr 40%;
    gap: 20px;
    padding: 15px;
    overflow: hidden;
    background-color: var(--second-color);

    @media (max-width: ${breakpoints.md}) {
      grid-template-columns: 1fr;
    }
  `,
);

const GoodData = styled.div`
  margin-bottom: 15px;
  line-height: 1.4;
`;

const SubTitle = styled.h2`
  display: inline-block;
  margin: 0 10px 0 0;
`;

const List = styled.ul`
  margin: 15px 0 0;
`;

const ListItem = styled.li`
  padding: 10px;

  &:nth-child(odd) {
    background-color: var(--white-color);
  }
`;

const Photo = styled.figure(
  ({ theme: { breakpoints } }) => css`
    display: flex;
    margin: 20px 0;

    @media (max-width: ${breakpoints.md}) {
      margin: 0;
      order: -1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
);

const GoodContainer = ({ good }) => {
  const { name, price, rating, info, img } = good;

  return (
    <Container>
      <div>
        <GoodData>
          <SubTitle>Арендная цена:</SubTitle>
          <span>{price} руб.</span>
        </GoodData>
        <GoodData>
          <SubTitle>Рейтинг:</SubTitle>
          <span>{rating} из 5</span>
        </GoodData>

        {info?.length > 0 && (
          <>
            <SubTitle>Характеристики:</SubTitle>
            <List>
              {info.map(({ title, description }, index) => (
                <ListItem key={index}>
                  <strong>{title}</strong>: <span>{description}</span>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </div>

      {img && (
        <Photo>
          <img src={process.env.REACT_APP_API_URL + img} alt={name} />
        </Photo>
      )}
    </Container>
  );
};

export default GoodContainer;
