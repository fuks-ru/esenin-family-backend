import { FC } from 'react';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import { parseISO, formatISO } from 'date-fns';

import { fullDateFormat } from 'admin/shared/lib';

interface IProps {
  value?: string;
  onChange?: (value: string | null) => void;
}

const DatePickerBase = generatePicker<Date>(dateFnsGenerateConfig);

export const DatePicker: FC<IProps> = ({ value, onChange }) => (
  <DatePickerBase
    value={value ? parseISO(value) : undefined}
    format={fullDateFormat}
    onChange={(date) => {
      if (!onChange) {
        return;
      }

      if (date) {
        onChange(formatISO(date));

        return;
      }

      onChange(null);
    }}
    showTime={{ format: 'HH:mm' }}
  />
);
