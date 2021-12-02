import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { TubeServiceProps } from '../utils/types';
import {
  NIGHT_SERVICE_STRING,
  NIGHT_SERVICE_ICON,
  SERVICE_DISRUPTION_ICON,
  GOOD_SERVICE_CODE,
} from '../utils/constants';

import { ServiceStatusContext } from '../App';

export interface MenuBarProps {
  tubeServices: TubeServiceProps;
};

const SubMenuWrapper = styled.ul`
  position: absolute;
  top: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  left: 0;
  text-align: left;
  background: #EFF6FD;
  color: #000;

  > li {
    padding: 5px;
    display: flex;

    > label {
      width: 100%;
      display: inline-block;

      > span {
        font-size: 0.7rem;
        line-height: 1rem;
      }
    }

    &:hover {
      background: #2D3039;
      color: #FFF;
    }
  }
`;

const SubMenuItems = ({ tubeServices }: MenuBarProps) => {
  const { setSelectedService } = useContext(ServiceStatusContext);
  
  return (
    <SubMenuWrapper>
    {
      tubeServices.map((item) => (
        <li key={`id-${item.name}`}>
          <input 
          id={`input-${item.name}`} 
          type="radio" 
          name="serviceSelect" 
          value={item.name} 
          onChange={() => setSelectedService(item.name)} />
          <label htmlFor={`input-${item.name}`} >
            {item.name}
            <span>{item.serviceTypes.some(item => item.name === NIGHT_SERVICE_STRING) ? NIGHT_SERVICE_ICON : ''}</span>
            <span>{item.lineStatuses.some(item => item.statusSeverity !== GOOD_SERVICE_CODE) ? SERVICE_DISRUPTION_ICON : ''}</span>
          </label>
        </li>
      ))
    }
    </SubMenuWrapper>
  );
};

export default SubMenuItems;
