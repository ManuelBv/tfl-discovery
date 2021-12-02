import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

import {
  TFL_CYCLE_SERVICES_URL_PARTIAL,
  CYCLE_LABEL,
  CYCLE_FOUND_RESULTS,
  CYCLE_NO_RESULTS,
  CYCLE_NO_SEARCH_TERMS,
} from '../utils/constants';

import { CycleHireResultsProps } from '../utils/types';
import { obtainCycleId } from '../utils/helpers';

import { ServiceStatusContext } from '../App';

const CycleAreaWrapper = styled.div`
  padding: 20px;
  align-self: flex-start;
`;

const CycleHeader = styled.div`
  border-bottom: solid 1px #CCC;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CycleResults = styled.div`
  border-bottom: solid 1px #CCC;
  padding-bottom: 10px;
`;

const CycleSection = () => {
  const initialResult: CycleHireResultsProps[] = [{
    id: '',
    commonName: '',
    lat: '',
    lon: '',
  }];

  const { cycleCache } = useContext(ServiceStatusContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(initialResult);

  const searchCyclePoints = async (searchText: string) => {
    if (!searchText) {
      setSearchTerm('');
      setResults(initialResult);
      return;
    }

    setSearchTerm(searchText);
    const cycleData = await performCycleFetch(searchText);
    setResults(cycleData);
  }

  const performCycleFetch = async (searchTerm: string) => {
    if (cycleCache.has(searchTerm)) {
      return cycleCache.get(searchTerm);
    }

    const result = await axios.get(`${TFL_CYCLE_SERVICES_URL_PARTIAL}${searchTerm}`);
    let { data } = await result;
    if (!data?.length) {
      data = initialResult;
    }

    cycleCache.set(searchTerm, data);
    return data;
  }

  return (
    <CycleAreaWrapper>
      <CycleHeader>
        <label htmlFor="cycle-search">{ CYCLE_LABEL }</label> 
        <input type="text" id="cycle-search"  value={searchTerm} onChange={(e) => searchCyclePoints(e.target.value)} />
      </CycleHeader>
      <CycleResults>
        {
          results[0].id !== ''
          ? <span>{CYCLE_FOUND_RESULTS} {results.length}</span>
          : <span>{searchTerm ? <span>{CYCLE_NO_RESULTS} <strong>{searchTerm}</strong></span> : CYCLE_NO_SEARCH_TERMS}!</span>
        }
        <br />
        {
          results[0].id !== ''
          ? results.map((item) => (
            <p key={`id-${item.id}`}>
              <span >{obtainCycleId(item.id)} - {item.commonName} - ({item.lat},{item.lon})</span><br />
            </p>
          ))
          : ''
        }
      </CycleResults>
    </CycleAreaWrapper>
  );
};

export default CycleSection;
