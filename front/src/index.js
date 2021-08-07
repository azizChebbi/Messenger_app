import React from "react";
import ReactDOM from "react-dom"
import App from './App'
import {Provider} from 'react-redux'
import {store , persistor} from './reducer'
import { PersistGate } from 'redux-persist/integration/react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache() 
})

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
);
