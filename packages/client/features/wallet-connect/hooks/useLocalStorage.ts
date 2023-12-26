// Copyright 2019-2022 @subwallet/sub-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string,
  initialValue = '',
  onLoad?: (value: string) => void,
): [string, (v: string) => void] {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const item =
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : false;

    if (item) {
      try {
        const value = JSON.parse(item as string);
        setStoredValue(value);
        onLoad && onLoad(value);
      } catch (e) {
        setStoredValue(initialValue);
      }
    }
  }, [initialValue, key, setStoredValue]);

  const setValue = (value: string) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
