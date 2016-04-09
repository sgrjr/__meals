import {
  GraphQLBoolean
} from 'graphql';

import OrderModel from '../../../models/order';

export default {
  type: GraphQLBoolean,
  resolve (root, params, options) {
    return OrderModel
      .remove()
      .exec();
  }
};
