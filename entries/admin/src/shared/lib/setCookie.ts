/* eslint-disable unicorn/no-document-cookie */
export const setCookie = (
  name: string,
  value: string,
  exdays?: number,
): void => {
  if (exdays) {
    const exdate = new Date();

    exdate.setDate(exdate.getDate() + exdays);

    document.cookie = `${name}=${value}; expires=${exdate.toUTCString()}`;

    return;
  }

  document.cookie = `${name}=${value}`;
};
/* eslint-enable unicorn/no-document-cookie */
