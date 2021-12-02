import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { orderRegularTubeData } from '../utils/helpers';
import { CYCLE_STRING, CYCLE_HIRE_STRING } from '../utils/constants';
import SubMenuItems from './SubMenuItems';

import { ServiceStatusContext } from '../App';

const MenuWrapper = styled.ul`
  list-style: none;
  display: flex;
  background: #2D3039;

  > li {
    position: relative;
    width: 25%;

    > button {
      width: 100%;
      height: 100%;
      padding: 5px;
      border: 0;
      background: #2D3039;
      text-align: center;
      text-transform: uppercase;
      color: #FFF;
    }

    > ul {
      display: none;
    }

    &:hover,
    &:focus-within {
      > button {
        background: #6d7283;
        font-weight: bold;
      }

      > ul {
        display: block;
      }
    }
  }
`;

const MenuBar = () => {
  const { setSelectedService, tubeServices } = useContext(ServiceStatusContext);
  const orderedTubeObject = orderRegularTubeData(tubeServices);
  const listOfServices = Object.keys(orderedTubeObject);

  return (
    <MenuWrapper data-test-id="menu-wrapper">
    {
      listOfServices.map((item: string) => (
        <li key={`id-${item}`}>
          <button>{item}</button>
          <SubMenuItems tubeServices={orderedTubeObject[item]} />
        </li>
      ))
    }
      <li>
        <button onClick={() => setSelectedService(CYCLE_STRING)}>{CYCLE_HIRE_STRING}</button>
      </li>
    </MenuWrapper>
  );
};

export default MenuBar;
