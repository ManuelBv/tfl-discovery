import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import './App.css';

import MenuBar  from './components/MenuBar';
import ContentArea from './components/ContentArea';

import { TubeServiceProps } from './utils/types';

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

  const [tubeServices, setTubeServices] = useState(initialTubeServices);

  useEffect(() => {
    axios.get(TFL_REGULAR_SERVICES_URL)
      .then(response => {
        setTubeServices(response.data);
      });
  }, []);

  return (
    <AppWrapper>
      <MenuBar tubeServices={tubeServices} />
      <ContentArea name={'Lucas'} />
    </AppWrapper>
  );
}

export default App;
