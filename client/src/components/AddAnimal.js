import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import classnames from 'classnames';
import {
  DIET_TYPE_OPTION_BOTH,
  DIET_TYPE_OPTION_CARNIVORE,
  DIET_TYPE_OPTION_HERBIVORE,
} from '../settings/types';
import {
  getArcsQuery,
  addAnimalMutation,
  getAnimalsQuery,
} from '../queries/queries';

class AddAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dietTypeOption: '',
      arcID: '',
      numberOfAnimals: '',
      errors: {},
    };
  }
  displayArcs() {
    var data = this.props.getArcsQuery;
    if (data.loading) {
      return <option disabled>Loading...</option>;
    } else {
      return data.arcs.map((arc) => {
        return (
          <option key={arc.id} value={arc.id}>
            {arc.arcName}
          </option>
        );
      });
    }
  }
  displayEatingHabits() {
    const { dietTypeOption } = this.state;

    return (
      <div>
        <div className='form-group'>
          {this.state.errors.dietTypeOption ? (
            <div className='invalid-feedback d-block'>
              <label htmlFor='dietType'>Diet Type is required.</label>
            </div>
          ) : (
            <div>
              <label htmlFor='dietType'>Diet Type</label>
            </div>
          )}
          <div className='form-check'>
            <label>
              <input
                type='radio'
                name='dietTypeOption'
                value={DIET_TYPE_OPTION_CARNIVORE}
                checked={dietTypeOption === DIET_TYPE_OPTION_CARNIVORE}
                onChange={this.handleOptionChange}
                className={classnames('form-check-input', {
                  'is-invalid': this.state.errors.dietTypeOption,
                })}
              />
              Carnivore
            </label>
          </div>
          <div className='form-check'>
            <label>
              <input
                type='radio'
                name='dietTypeOption'
                value={DIET_TYPE_OPTION_HERBIVORE}
                className={classnames('form-check-input', {
                  'is-invalid': this.state.errors.dietTypeOption,
                })}
                checked={dietTypeOption === DIET_TYPE_OPTION_HERBIVORE}
                onChange={this.handleOptionChange}
              />
              Herbivore
            </label>
          </div>
          <div className='form-check'>
            <label>
              <input
                type='radio'
                name='dietTypeOption'
                value={DIET_TYPE_OPTION_BOTH}
                className={classnames('form-check-input', {
                  'is-invalid': this.state.errors.dietTypeOption,
                })}
                checked={dietTypeOption === DIET_TYPE_OPTION_BOTH}
                onChange={this.handleOptionChange}
              />
              Both Carnivore and Herbivore
            </label>
          </div>
        </div>
      </div>
    );
  }
  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleOptionChange = (changeEvent) => {
    this.setState({
      dietTypeOption: changeEvent.target.value,
    });
  };
  onSubmit(e) {
    e.preventDefault();

    const re = /^[0-9\b]+$/;
    const { name, arcID, numberOfAnimals, dietTypeOption } = this.state;

    // Check for errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (numberOfAnimals === '') {
      this.setState({
        errors: { numberOfAnimals: 'Number of Animals is required' },
      });
      return;
    }
    if (!re.test(numberOfAnimals)) {
      this.setState({ errors: { numberOfAnimals: 'Not a valid number.' } });
      return;
    }
    if (dietTypeOption === '') {
      this.setState({ errors: { dietTypeOption: 'Diet Type is required' } });
      return;
    }
    if (arcID === '') {
      this.setState({ errors: { arcID: 'Arc is required' } });

      return;
    }

    this.props.addAnimalMutation({
      variables: {
        name: name,
        dietType: dietTypeOption,
        numberOfAnimals: parseInt(numberOfAnimals),
        arcID: arcID,
      },
      refetchQueries: [
        {
          query: getAnimalsQuery,
        },
      ],
    });

    this.setState({
      name: '',
      dietTypeOption: '',
      numberOfAnimals: '',
      arcID: '',
      errors: {},
    });
  }

  render() {
    const { name, arcID, numberOfAnimals, errors } = this.state;

    return (
      <div className='card col-md-6'>
        <div className='card-header bg-success text-white'>Add Animal</div>
        <div className='card-body '>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='form-group'>
              <label htmlFor='animalName'>Animal Name</label>
              <input
                type='text'
                name='name'
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.name,
                })}
                placeholder='Please Enter Animal Name'
                value={name}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className='invalid-feedback'>Animal Name is required.</div>
              )}

              <div className='form-group'>
                <label htmlFor='numberOfAnimals'>Number of Animals</label>
                <input
                  type='text'
                  name='numberOfAnimals'
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.numberOfAnimals,
                  })}
                  placeholder='Please Enter Number of Animals'
                  value={numberOfAnimals}
                  onChange={this.onChange}
                />
                {errors.numberOfAnimals && (
                  <div className='invalid-feedback'>Not a valid number</div>
                )}
              </div>

              {this.displayEatingHabits()}

              <div className='form-group'>
                <label htmlFor='author'>Arc</label>

                <select
                  className={classnames('form-control form-control-lg', {
                    'is-invalid': errors.arcID,
                  })}
                  defaultValue={arcID}
                  onChange={(e) => {
                    this.setState({ arcID: e.target.value });
                  }}
                >
                  <option>Select arc</option>
                  {this.displayArcs()}
                </select>

                {errors.arcID && (
                  <div className='invalid-feedback'>Arc is required.</div>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='submit'
                  value='Add Animal'
                  className='btn btn-light btn-block'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getArcsQuery, { name: 'getArcsQuery' }),
  graphql(addAnimalMutation, { name: 'addAnimalMutation' })
)(AddAnimal);
