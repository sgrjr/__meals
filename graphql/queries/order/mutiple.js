import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import orderType from '../../types/order';
import getProjection from '../../get-projection';
import OrderModel from '../../../models/order';

export default {
  type: new GraphQLList(orderType),
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    const projection = getProjection(options.fieldASTs[0]);

    return OrderModel
      .find({
        userId: params.postId
      })
      .select(projection)
      .exec();
  }
};
