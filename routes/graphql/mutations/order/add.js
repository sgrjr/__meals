import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import orderInputType from '../../types/order-input';
import OrderModel from '../../../models/order';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(orderInputType)
    }
  },
  async resolve (root, params, options) {
    const orderModel = new OrderModel(params.data);
    const newOrder = await orderModel.save();

    if (!newOrder) {
      throw new Error('Error adding new order');
    }
    return true;
  }
};
