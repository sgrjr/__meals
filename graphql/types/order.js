import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Order',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    doctor: {
      type: new GraphQLNonNull(GraphQLID)
    },
    writtendate: {
      type: GraphQLString
    },
    consumer: {
      type: GraphQLString
    },
    drug: {
      type: GraphQLString
    },
    alternate: {
      type: GraphQLString
    },
    dose: {
      type: GraphQLString
    },
    route: {
      type: GraphQLString
    },
    time: {
      type: GraphQLString
    },
    prn: {
      type: GraphQLString
    },
    refills: {
      type: GraphQLString
    },
    reason: {
      type: GraphQLString
    },
    noted: {
      type: GraphQLObjectType
    }
  }
});
