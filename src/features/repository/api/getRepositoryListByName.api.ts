import axios from 'axios';
import { GetRepositoryListApiResponse } from 'src/features/repository/types/getRepositoryListByName.types';

interface GetRepositoryByNameProps {
	searchValue: string;
	perPage: number;
	page: number;
}

const getRepositoryListByNameApi = async ({ searchValue, perPage, page }: GetRepositoryByNameProps) => {
	const { data } = await axios.get<GetRepositoryListApiResponse>('https://api.github.com/search/repositories', {
		params: {
			q: `is:public ${searchValue} in:name`,
			per_page: perPage,
			page,
		},
	});
	return data;
};

export default getRepositoryListByNameApi;
