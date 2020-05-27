const graphql = require("graphql");
const _ = require("lodash");
const Animal = require("../modules/animal");
const Arc = require("../modules/arc");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const ArcType = new GraphQLObjectType({
  name: "Arc",
  fields: () => ({
    id: { type: GraphQLID },
    arcName: { type: GraphQLString },
    captainName: { type: GraphQLString },
    arcType: { type: GraphQLString },
    animals: {
      type: new GraphQLList(AnimalType),

      resolve(parent, args) {
        return Animal.find({ arcID: parent.id });
      },
    },
  }),
});

const AnimalType = new GraphQLObjectType({
  name: "Animal",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dietType: { type: GraphQLString },
    numberOfAnimals: { type: GraphQLInt },
    arcID: { type: GraphQLID },
    arc: {
      type: ArcType,
      resolve(parent, args) {
        //return _.find(arcs, { id: parent.
        //arcID });
        return Arc.findById(parent.arcID);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    arc: {
      type: ArcType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source

        //return _.find(arcs, { id: args.id });
        return Arc.findById(args.id);
      },
    },
    animal: {
      type: AnimalType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        //return _.find(animals, { id: args.id });
        return Animal.findById(args.id);
      },
    },
    animals: {
      type: new GraphQLList(AnimalType),
      resolve(parent, args) {
        // code to get data from db / other source
        //return animals;
        return Animal.find({});
      },
    },
    arcs: {
      type: new GraphQLList(ArcType),
      resolve(parent, args) {
        // code to get data from db / other source
        //return arcs;
        return Arc.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addArc: {
      type: ArcType,
      args: {
        arcName: { type: new GraphQLNonNull(GraphQLString) },
        captainName: { type: new GraphQLNonNull(GraphQLString) },
        arcType: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let arc = new Arc({
          arcName: args.arcName,
          captainName: args.captainName,
          arcType: args.arcType,
        });
        return arc.save();
      },
    },
    addAnimal: {
      type: AnimalType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        dietType: { type: new GraphQLNonNull(GraphQLString) },
        numberOfAnimals: { type: new GraphQLNonNull(GraphQLInt) },
        arcID: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let animal = new Animal({
          name: args.name,
          dietType: args.dietType,
          numberOfAnimals: args.numberOfAnimals,
          arcID: args.arcID,
        });
        return animal.save();
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
