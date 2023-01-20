import axios from 'axios';

interface GetRepositoryByNameProps {
	searchValue: string;
	perPage: number;
	page: number;
}

const getRepositoryByNameApi = ({ searchValue }: GetRepositoryByNameProps) => {
	const { data } = await axios.get<GetNotificationListApiResponse>(
		`${process.env.REACT_APP_BASE_URL}/user/notification-list`,
		{
			params: {
				pageNum,
				pageSize,
			},
		}
	);
	return data;
};

export default getRepositoryByNameApi;
