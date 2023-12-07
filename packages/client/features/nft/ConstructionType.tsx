import React from 'react';
import { Button } from '@/components';

type TConstructionType = {
  value: string;
  clickHandler: (v: string) => void;
};
const ConstructionType = ({ value, clickHandler }: TConstructionType) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold">Construction</p>
      <div className="flex gap-3.5">
        <Button
          title="Issue"
          color={value === 'issue' ? 'black' : 'white'}
          onClick={() => clickHandler('issue')}
          className="rounded-2xl border border-stroke-gray px-5 py-2.5"
        />
        <Button
          title="Conceptual"
          color={value === 'conceptual' ? 'black' : 'white'}
          onClick={() => clickHandler('conceptual')}
          className="rounded-2xl border border-stroke-gray px-5 py-2.5"
        />
      </div>
    </div>
  );
};

export default ConstructionType;
