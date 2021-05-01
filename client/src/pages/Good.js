import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import MainTemplate from 'components/templates/MainTemplate';
import Loader from 'components/atoms/Loader';
import InfoText from 'components/atoms/InfoText';
import GoodDetails from 'components/molecules/GoodDetails';
import { fetchOneGood } from 'http/goodAPI';

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
  }, []);

  console.log(loading);
  console.log(good);
  return (
    <MainTemplate>
      <Wrapper data-testid="test-recipe-page">
        <div>
          <StyledLink to="/">Назад</StyledLink>
        </div>

        {loading ? <Loader /> : good ? <GoodDetails good={good} /> : <InfoText>Что-то пошло не так...</InfoText>}
      </Wrapper>
    </MainTemplate>
  );
};

export default Good;
