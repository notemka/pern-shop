import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE } from 'routes';
import AddBrandForm from 'components/organisms/AddBrandForm';
import AddGoodForm from 'components/organisms/AddGoodForm';
import AddTypeForm from 'components/organisms/AddTypeForm';
import MainTemplate from 'components/templates/MainTemplate';
import breakpoints from 'styles/breakpoints';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: ${breakpoints.screenMd}) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const FormWrapper = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: var(--second-color);
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
`;

const Admin = () => (
  <MainTemplate>
    <div>
      <h1>Админ панель</h1>

      <Wrapper>
        <FormWrapper>
          <AddGoodForm />
        </FormWrapper>
        <div>
          <>
            <FormWrapper>
              <AddTypeForm />
            </FormWrapper>
            <StyledLink to={`${ADMIN_ROUTE}/types`}>Все категории</StyledLink>
          </>

          <>
            <FormWrapper>
              <AddBrandForm />
            </FormWrapper>
            <StyledLink to={`${ADMIN_ROUTE}/brands`}>Все бренды</StyledLink>
          </>
        </div>
      </Wrapper>
    </div>
  </MainTemplate>
);

export default Admin;
