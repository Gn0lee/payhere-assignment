import moment from 'moment';

export const convertTimeFormat = (value: string | null, timezone?: string, format?: string): string => {
	if (value === null) {
		return '';
	}

	return moment(value)
		.utcOffset(timezone || '+UTC09:00')
		.format(format || 'YYYY.MM.DD hh:mm');
};
