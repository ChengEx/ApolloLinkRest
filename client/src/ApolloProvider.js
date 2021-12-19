import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { ApolloLink } from "apollo-link";
import { RestLink } from 'apollo-link-rest';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

//RESTful API
const restLink = new RestLink({
  endpoints: {
    uri:'http://localhost:4000'
  }
    
})

//GrpahQL API
const httpLink = new createHttpLink({ uri: "http://localhost:5000/graphql" });

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

const client = new ApolloClient({
    link: ApolloLink.from([authLink.concat(httpLink), restLink]),
    cache: new InMemoryCache(),
    defaultOptions : { 
      watchQuery : { 
        fetchPolicy : 'cache-first' , 
        notifyOnNetworkStatusChange : true , 
      } , 
    }
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)