export interface TubeServiceItemType {
  $type: string;
  id: string;
  name: string;
  modeName: string;
  disruptions: any[];
  created: string;
  modified: string;
  lineStatuses: any[];
  routeSections: any[ ];
  serviceTypes: any[];
  crowding: any;
}

export type TubeServiceProps = TubeServiceItemType[];

export interface OrderedTubeServicesType {
  [key: string]: TubeServiceProps;
}
