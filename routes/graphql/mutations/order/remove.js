import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import orderType from '../../types/order';
import getProjection from '../../get-projection';
import OrderModel from '../../../models/order';

export default {
  type: orderType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);
    const removedOrder = await OrderModel
      .findByIdAndRemove(params._id, {
        select: projection
      })
      .exec();

    if (!removedOrder) {
      throw new Error('Error removing users order');
    }

    return removedOrder;
  }
};
