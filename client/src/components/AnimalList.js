import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnimalsQuery } from '../queries/queries';
import AnimalDetails from './AnimalDetails';

class AnimalList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };
  }
  displayAnimals() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading animals...</div>;
    } else {
      return data.animals.map((animal) => {
        return (
          <li
            key={animal.id}
            onClick={(e) => {
              this.setState({ selected: animal.id });
            }}
          >
            {animal.name}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul id='animal-list'>{this.displayAnimals()}</ul>
        <AnimalDetails animalID={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getAnimalsQuery)(AnimalList);
