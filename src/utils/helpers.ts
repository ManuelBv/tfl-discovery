import { TubeServiceProps, OrderedTubeServicesType } from './types';

export const orderRegularTubeData = (tubeServices: TubeServiceProps) => {
  const orderedTubeServices = tubeServices.reduce((acc: OrderedTubeServicesType, item) => {
    if (!acc[item.modeName]) {
      acc[item.modeName] = [item];
    } else {
      acc[item.modeName].push(item);
    }

    return acc;
  }, {});

  return orderedTubeServices;
};
