import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { CYCLE_STRING } from '../utils/constants';
import ServiceHeader from './ServiceHeader';
import CycleSection from './CycleSection';
import { ServiceStatusContext } from '../App';

const ContentAreaWrapper = styled.div`
  min-height: 400px;
  margin-top: 50px;
  display: flex;
  border-top: solid 1px #CCC;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const ContentArea = () => {
  const { selectedService } = useContext(ServiceStatusContext);

  return (
    <ContentAreaWrapper data-test-id="content-wrapper">
      {selectedService === CYCLE_STRING ? <CycleSection /> : <ServiceHeader />}
    </ContentAreaWrapper>
  );
};

export default ContentArea;
