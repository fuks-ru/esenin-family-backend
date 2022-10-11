const getDateString = (exdays?: number): string => {
  if (exdays) {
    const exdate = new Date();

    exdate.setDate(exdate.getDate() + exdays);

    return `; expires=${exdate.toUTCString()}`;
  }

  return '';
};

/* eslint-disable unicorn/no-document-cookie */
export const setCookie = (
  name: string,
  value: string,
  domain?: string,
  exdays?: number,
): void => {
  const dateString = getDateString(exdays);
  const domainString = domain ? `; domain=${domain}` : '';

  document.cookie = `${name}=${value}${domainString}${dateString}`;
};
/* eslint-enable unicorn/no-document-cookie */
