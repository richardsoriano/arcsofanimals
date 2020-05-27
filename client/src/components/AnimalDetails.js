import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getAnimalQuery } from '../queries/queries';

class AnimalDetails extends Component {
  displayAnimalDetails() {
    const { animal } = this.props.data;
    if (animal) {
      return (
        <div className='card border-success mb-3'>
          <div className='card-header text-success'>
            <h4>{animal.name}</h4>
          </div>
          <div className='card-body text-success'>
            <p className='card-text'>
              <b>Diet type: </b>
              {animal.dietType}
            </p>
            <p className='card-text'>
              <b>Number of animals: </b>
              {animal.numberOfAnimals}
            </p>

            <p className='card-text'>
              <b>Arc: </b>
              {animal.arc.arcName}
            </p>
            <p className='card-text'>
              <b>Captain: </b>
              {animal.arc.captainName}
            </p>
            <p className='card-text'>Other animals on this arc:</p>
            <ul className='other-animals'>
              {animal.arc.animals.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      return <div>No Animal Selected</div>;
    }
  }
  render() {
    return <div id='animal-details'>{this.displayAnimalDetails()}</div>;
  }
}

export default graphql(getAnimalQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.animalID,
      },
    };
  },
})(AnimalDetails);
