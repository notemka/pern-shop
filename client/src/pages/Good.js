import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { GET_ONE_GOOD } from 'graphql/queries/goods';

import MainTemplate from 'components/templates/MainTemplate';
import GoodDetails from 'components/molecules/GoodDetails/';
import Loader from 'components/atoms/Loader';
import InfoText from 'components/atoms/InfoText';

const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 30px;
  color: var(--primary-color);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Good = () => {
  const { id } = useParams();
  const [good, setGood] = useState(null);
  const { data, loading, error, refetch } = useQuery(GET_ONE_GOOD, {
    variables: { id },
  });

  useEffect(() => {
    if (!loading) {
      setGood(data.getOneGood);
    }
  }, [loading, data]);

  return (
    <MainTemplate>
      <Wrapper data-testid="test-recipe-page">
        <div>
          <StyledLink to="/">Назад</StyledLink>
        </div>

        {loading ? (
          <Loader />
        ) : good ? (
          <GoodDetails good={good} refetch={refetch} />
        ) : (
          <InfoText>{error || 'Что-то пошло не так...'}</InfoText>
        )}
      </Wrapper>
    </MainTemplate>
  );
};

export default Good;
