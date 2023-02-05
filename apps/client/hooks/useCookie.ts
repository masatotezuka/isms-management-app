import { useCookies } from 'react-cookie';

export const useCookie = () => {
  const [cookie, setCookie, removeCookie] = useCookies([
    'accessToken',
    'adminId',
  ]);

  const setAccessToken = (accessToken: string) => {
    setCookie('accessToken', accessToken, { path: '/' });
  };

  const removeAccessToken = () => {
    removeCookie('accessToken', { path: '/' });
  };

  const setAdminId = (adminId: number) => {
    setCookie('adminId', adminId, { path: '/' });
  };

  const removeAdminId = () => {
    removeCookie('adminId', { path: '' });
  };

  return {
    cookie,
    setAccessToken,
    removeAccessToken,
    setAdminId,
    removeAdminId,
  };
};
