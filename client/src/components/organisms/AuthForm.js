import React, { useContext, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Form from 'components/atoms/Form';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/buttons/Button';
import { LOGIN_ROUTE, SHOP_ROUTE } from 'routes';
import { Context } from '../../App';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../../graphql/mutations/user';
import jwt_decode from 'jwt-decode';

const FieldActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const AuthForm = () => {
  const { setUser } = useContext(Context);
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

  const onChange = (event) => {
    const value = event.target.value;

    if (event.target.name === 'email') {
      return setEmail(value);
    }
    return setPassword(value);
  };
  return (
    <Form onSubmit={onSubmit} data-testid={`test-${pageName.toLowerCase()}-form`}>
      <Input type="email" label="Email" name="email" value={email} onChange={onChange} />
      <Input type="password" label="Password" name="password" value={password} onChange={onChange} />

      <FieldActions>
        {pageName === 'Login' ? <Link to="/registration">Registration</Link> : <Link to="/login">Login</Link>}
        <Button type="submit">{pageName}</Button>
      </FieldActions>
    </Form>
  );
};

export default AuthForm;
