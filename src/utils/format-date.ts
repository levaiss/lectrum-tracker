import { format } from 'date-fns';
import uk from 'date-fns/locale/uk';

export const formatDate = (date: number | Date, formatStr: string = 'PP'): string => {
    return format(date, formatStr, {
        locale: uk,
    });
};
