import { cookies } from 'next/headers';

export const getAccountKeyFromCookies = () => {
  const cookieStore = cookies();
  const accountKey = cookieStore
    .getAll()
    .find((cookie) => cookie.name === 'accountKey');

  return accountKey?.value;
};
