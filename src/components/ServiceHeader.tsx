import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { extractServiceObject, extractServiceDisruptionMessages } from '../utils/helpers';
import { ServiceStatusContext } from '../App';

import {
  SERVICE_NO_DISRUPTIONS_MESSAGE,
  SERVICE_DISRUPTIONS_MESSAGE,
  GOOD_SERVICE_CODE,
  SERVICE_HEADER_TEXT,
  SERVICE_HEADER_MORE_DETAILS,
} from '../utils/constants';

const ServiceHeaderWrapper = styled.div`
  align-self: flex-start;
`;

const Header = styled.h2`
  text-align: left;
  align-self: flex-start;
  padding-left: 20px;
`;

const HeaderMessage = styled.p`
  text-align: left;
  align-self: flex-start;
  padding-left: 20px;
`;

const ServiceHeader = () => {
  const { selectedService, tubeServices } = useContext(ServiceStatusContext);
  const [ resultObject ] = extractServiceObject(selectedService, tubeServices);

  return (
    <ServiceHeaderWrapper>
      <Header>
        {selectedService
        ? <span>{SERVICE_HEADER_TEXT}<em>{selectedService}</em></span>
        : SERVICE_HEADER_MORE_DETAILS
        }
      </Header>
        <br />
      <HeaderMessage>
        <em>
          {resultObject && resultObject.lineStatuses.some(item => item.statusSeverity !== GOOD_SERVICE_CODE)
          ? <span>{SERVICE_DISRUPTIONS_MESSAGE}<br/>{extractServiceDisruptionMessages(resultObject)}</span>
          : SERVICE_NO_DISRUPTIONS_MESSAGE}
        </em>
      </HeaderMessage>
    </ServiceHeaderWrapper>
  );
};

export default ServiceHeader;
