import React from 'react';
import styled from '@emotion/styled';

import { TubeServiceProps } from '../utils/types';
import { orderRegularTubeData } from '../utils/helpers';

import SubMenuItems from './SubMenuItems';

export interface MenuBarProps {
  tubeServices: TubeServiceProps;
}

const MenuWrapper = styled.ul`
  list-style: none;
  display: flex;
  background: #2D3039;

  > li {
    padding: 5px;
    position: relative;
    width: 25%;
    text-align: center;
    text-transform: uppercase;
    color: #FFF;
    // background: #2D3039;

    > ul {
      display: none;
    }

    &:hover {
      background: #6d7283;
      font-weight: bold;

      > ul {
        display: block;
      }
    }
  }
`;

const MenuBar = ({ tubeServices }: MenuBarProps) => {
  console.log('menubar services>>>', orderRegularTubeData(tubeServices));
  const orderedTubeObject = orderRegularTubeData(tubeServices);
  const listOfServices = Object.keys(orderedTubeObject);

  return (
    <MenuWrapper>
    {
      listOfServices.map((item: string) => (
        <li key={`id-${item}`}>
          {item}
          <SubMenuItems tubeServices={orderedTubeObject[item]} />
        </li>
      ))
    }
    </MenuWrapper>
  );
}

export default MenuBar;
