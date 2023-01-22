import axios from 'axios';

import type { GetIssuesByRepoApiResponse } from 'src/features/issues/types/GetIssuesByRepo.type';
import type { SelectedRepositoryInfo } from 'src/features/repository/context/repositorySlice';

interface GetRepositoryByNameProps {
	repos: SelectedRepositoryInfo[];
	perPage: number;
	page: number;
}

const getIssuesByRepoApi = async ({ repos, perPage, page }: GetRepositoryByNameProps) => {
	const { data } = await axios.get<GetIssuesByRepoApiResponse>('https://api.github.com/search/issues', {
		params: {
			q: repos.length > 0 ? `is:issue ${repos.map(repo => `repo:${repo.fullName}`).join(' ')}` : undefined,
			per_page: perPage,
			page,
			order: 'desc',
			sort: 'updated',
		},
	});
	return data;
};

export default getIssuesByRepoApi;
