import Identicon from '@polkadot/react-identicon';
import React from 'react';
import toast from 'react-hot-toast';

type TIdentIcon = {
  address: string;
  size?: number;
  theme?: 'polkadot' | 'substrate' | 'beachball';
};

const IdentIcon = ({ address, size = 32, theme = 'substrate' }: TIdentIcon) => {
  return (
    <Identicon
      value={address}
      size={size}
      theme={theme}
      onCopy={() => {
        toast.success('Address copied.');
      }}
    />
  );
};

export default IdentIcon;
