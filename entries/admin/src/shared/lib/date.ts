/* eslint-disable import/no-duplicates */
import { format, parseISO } from 'date-fns';
import ru from 'date-fns/locale/ru';
/* eslint-enable import/no-duplicates */

export const fullDateFormat = 'dd MMMM yyyy HH:mm';

export const isoToFullDate = (value: string): string => {
  const date = parseISO(value);

  return format(date, 'dd MMMM yyyy HH:mm', {
    locale: ru,
  });
};
