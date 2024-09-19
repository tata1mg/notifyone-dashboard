export const getCookie = (name: string) => {
  const cookies = Object.assign(
    {},
    ...document.cookie.split('; ').map((cookie) => {
      const name = cookie.split('=')[0];
      const value = cookie.split('=')[1];

      return { [name]: value };
    })
  );

  return cookies[name];
};

export const deletePharmaCookie = (name: string) => {
  return (document.cookie = `${name}=; domain=.1mg.com; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`);
};

export const deleteLabsCookie = (name: string) => {
  return (document.cookie = `${name}=; domain=.1mg.com; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`);
};

export const getHealthColor = (health: string) => {
  switch (health) {
    case 'HEALTHY':
      return 'green';
    case 'SLOW':
    case 'OUTAGE':
      return 'yellow';
    case 'OVERLOADED':
    case 'DEGRADED':
      return 'volcano';
    default:
      return '';
  }
};
