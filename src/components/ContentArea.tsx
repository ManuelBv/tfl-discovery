import React from 'react';

export interface ContentAreaProps {
  name: string;
  age?: number;
}

const ContentArea = ({ name }: ContentAreaProps) => {

  const greeting = 'content area';

  return (
    <p>
      {name} says {greeting}
    </p>
  );
}

export default ContentArea;
