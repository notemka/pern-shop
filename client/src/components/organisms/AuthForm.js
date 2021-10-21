import React, { useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, SHOP_ROUTE } from 'routes';

import AppContext from 'contexts/AppContext';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from 'graphql/mutations/user';

import { Form, Input } from 'components/atoms/formElements';
import { Button } from 'components/atoms/buttons';

const FieldActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const AuthForm = () => {
  const { setUser } = useContext(AppContext);
  const { pathname } = useLocation();
  const history = useHistory();
  const isLoginPage = pathname === LOGIN_ROUTE;
  const pageName = isLoginPage ? 'Login' : 'Registration';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fetchQuery = isLoginPage ? LOGIN_USER : REGISTER_USER;

  const variables = isLoginPage ? { email, password } : { email, password, role: 'USER' };

  const [getUser, { loading }] = useMutation(fetchQuery, {
    onCompleted: (data) => {
      const { token } = isLoginPage ? data.loginUser : data.registerUser;
      setUser(jwt_decode(token));
      localStorage.setItem('accessToken', token);
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loading) {
        getUser({ variables });
        history.push(SHOP_ROUTE);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      return setEmail(value);
    }
    return setPassword(value);
  };

  return (
    <Form onSubmit={onSubmit} data-testid={`test-${pageName.toLowerCase()}-form`}>
      <Input type="email" label="Email" name="email" value={email} onChange={onChange} required />
      <Input type="password" label="Password" name="password" value={password} onChange={onChange} required />

      <FieldActions>
        {pageName === 'Login' ? <Link to="/registration">Registration</Link> : <Link to="/login">Login</Link>}
        <Button type="submit">{pageName}</Button>
      </FieldActions>
    </Form>
  );
};

export default AuthForm;
