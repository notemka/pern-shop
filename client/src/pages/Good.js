import React, { useEffect, useState } from 'react';
import MainTemplate from '../components/templates/MainTemplate';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../components/atoms/Loader';
import InfoText from '../components/atoms/InfoText';
import GoodDetails from '../components/molecules/GoodDetails/';
import { fetchOneGood } from '../http/goodAPI';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOneGood(id);
      setGood(data);
    };
    fetchData();
    setLoading(false);
  }, [id]);

  return (
    <MainTemplate>
      <Wrapper data-testid="test-recipe-page">
        <div>
          <StyledLink to="/">Назад</StyledLink>
        </div>

        {loading ? (
          <Loader />
        ) : good ? (
          <GoodDetails good={good} />
        ) : (
          <InfoText>Что-то пошло не так...</InfoText>
        )}
      </Wrapper>
    </MainTemplate>
  );
};

export default Good;
