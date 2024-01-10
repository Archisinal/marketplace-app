export const getPercentageDiff = (value: number) => {
  const isPositive = value > 0;
  let prefix = isPositive ? '+' : '';
  let suffix = '%';
  return `${prefix}${value} ${suffix}`;
};

export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1);
};

export const abbriviateNumber = (
  number: number,
  fraction = 2,
  shortFormat = true,
): string => {
  let defaultOptions = {
    maximumFractionDigits: fraction,
  };

  const shortFormatOptions = {
    notation: 'compact',
    compactDisplay: 'short',
  };

  if (shortFormat) {
    defaultOptions = { ...defaultOptions, ...shortFormatOptions };
  }

  // @ts-ignore
  return number.toLocaleString('en-US', { ...defaultOptions });
};

export const formatAddress = (
  text?: string,
  startChars: number = 4,
  endChars: number = 4,
  maxLength: number = 12,
): string => {
  if (!text) {
    return '';
  }
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + '.';
    }
    return start + end;
  }
  return text;
};

export const formatIpfsLink = (ipfsHash: string): string => {
  return `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}${ipfsHash}`;
};
