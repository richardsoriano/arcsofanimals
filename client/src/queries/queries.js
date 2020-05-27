import { gql } from 'apollo-boost';

const getAnimalQuery = gql`
  query($id: ID) {
    animal(id: $id) {
      id
      name
      dietType
      numberOfAnimals
      arc {
        arcName
        captainName
        arcType
        id
        animals {
          name
          id
        }
      }
    }
  }
`;
const getAnimalsQuery = gql`
  {
    animals {
      id
      name
      dietType
      numberOfAnimals
    }
  }
`;
const getArcQuery = gql`
  query($id: ID) {
    arc(id: $id) {
      arcName
      captainName
      arcType
      animals {
        name
        dietType
        numberOfAnimals
      }
    }
  }
`;
const getArcsQuery = gql`
  {
    arcs {
      id
      arcName
      captainName
      arcType
    }
  }
`;

const addAnimalMutation = gql`
  mutation(
    $name: String!
    $dietType: String!
    $numberOfAnimals: Int!
    $arcID: ID!
  ) {
    addAnimal(
      name: $name
      dietType: $dietType
      numberOfAnimals: $numberOfAnimals
      arcID: $arcID
    ) {
      id
      name
      dietType
      numberOfAnimals
      arcID
    }
  }
`;

export {
  getAnimalQuery,
  getAnimalsQuery,
  getArcsQuery,
  getArcQuery,
  addAnimalMutation,
};
