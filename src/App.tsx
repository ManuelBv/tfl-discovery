import React, { useState, useEffect, createContext } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import './App.css';

import MenuBar  from './components/MenuBar';
import ContentArea from './components/ContentArea';

import { TubeServiceProps, TubeServiceItemType } from './utils/types';

import {
  TFL_REGULAR_SERVICES_URL,
  TFL_CYCLE_SERVICES_URL_PARTIAL,
} from './utils/constants';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: clamp(298px, 50%, 1200px);
  border: solid 1px #CCC;

  p {
    font-weight: bold;
  }
`;

export const ServiceStatusContext = createContext({
  selectedService: '',
  setSelectedService: (item: string) => {},
  tubeServices: [{} as TubeServiceItemType],
  cycleCache: new Map(),
})

const App = () => {
  const initialTubeServices: TubeServiceProps = [{
    $type: '',
    id: '',
    name: '',
    modeName: '',
    disruptions: [],
    created: '',
    modified: '',
    lineStatuses: [],
    routeSections: [],
    serviceTypes: [],
    crowding: {},
  }];

  const cycleCache = new Map();

  const [tubeServices, setTubeServices] = useState(initialTubeServices);
  const [selectedService, setSelectedService] = useState('');

  const myContextValue = { selectedService, setSelectedService, tubeServices, cycleCache };

  useEffect(() => {
    axios.get(TFL_REGULAR_SERVICES_URL)
      .then(response => {
        setTubeServices(response.data);
      });
  }, []);

  return (
    <ServiceStatusContext.Provider value={myContextValue}>
      <AppWrapper>
        <MenuBar />
        <ContentArea />
      </AppWrapper>
    </ServiceStatusContext.Provider>
  );
}

export default App;
