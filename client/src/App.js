import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//components
import AddAnimal from './components/AddAnimal';
import AnimalList from './components/AnimalList';

const client = new ApolloClient({
  uri: '/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id='main'>
          <h2>List of Animals in Arcs</h2>

          <AnimalList />

          <AddAnimal />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
