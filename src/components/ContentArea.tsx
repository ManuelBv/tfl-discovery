import React from 'react';
import styled from '@emotion/styled';

import ServiceHeader from './ServiceHeader';

const ContentAreaWrapper = styled.div`
  height: 200px;
  margin-top: 50px;
  display: flex;
  border-top: solid 1px #CCC;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const ContentArea = () => {
  return (
    <ContentAreaWrapper>
      <ServiceHeader />
    </ContentAreaWrapper>
  );
};

export default ContentArea;
