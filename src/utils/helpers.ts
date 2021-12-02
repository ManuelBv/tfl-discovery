import {
  TubeServiceProps,
  OrderedTubeServicesType,
  TubeServiceItemType,
} from './types';

import { GOOD_SERVICE_CODE } from './constants';

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

export const extractServiceObject = (selectedService: string, tubeServices: TubeServiceProps) => {
  const foundObject = tubeServices.filter(item => item.name === selectedService);
  return foundObject;
};

export const extractServiceDisruptionMessages = (service: TubeServiceItemType) => {
  const { lineStatuses } = service;
  let disruptionMessages = '';
  
  lineStatuses.forEach(item => {
    if (item.statusSeverity !== GOOD_SERVICE_CODE) {
      disruptionMessages += `${item.reason}`;
    }
  });

  return disruptionMessages;
}

export const obtainCycleId = (cycleLongId: string) => {
  const cycleIdRegex = /(\d+)/;
  const foundId = cycleLongId?.match(cycleIdRegex);
  if (!foundId) return cycleLongId;
  return foundId[0];
}
