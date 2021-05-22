import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import {
  ApolloClient,
  HttpLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const getHeaders = () => {
  const token = localStorage.getItem('accessToken');
  const headers = {
    authorization: token ? `Bearer ${token}` : '',
  };
  return headers;
};

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL + 'graphql',
  fetch,
  headers: getHeaders(),
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      ...getHeaders(),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
