const baseUrl = 'https://654f0f0e358230d8f0ccfb7e.mockapi.io';

// eslint-disable-next-line import/prefer-default-export
export const getItemsUrl = () => new URL('items', baseUrl).toString();
