import Identicon from '@polkadot/react-identicon';
import React from 'react';

type TIdentIcon = {
  address: string;
  size?: number;
  theme?: 'polkadot' | 'substrate' | 'beachball';
};

const IdentIcon = ({ address, size = 32, theme = 'substrate' }: TIdentIcon) => {
  return <Identicon value={address} size={size} theme={theme} />;
};

export default IdentIcon;
