import { css } from '@emotion/react';
import { useLayoutEffect } from 'react';

import { useAppDispatch } from 'src/common/redux/store';
import { KEY_SELECT_REPOSITORY } from 'src/common/data/constants';

import SearchToolbar from 'src/features/repository/components/SearchToolbar';
import RepositoryTable from 'src/features/repository/components/RepositoryTable';
import RepositoryTablePagination from 'src/features/repository/components/RepositoryTablePagination';
import { SelectedRepositoryInfo, setSelectedRepositoryList } from 'src/features/repository/context/repositorySlice';

export default function SearchRepository() {
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		const storedSelectedRepositoryList = JSON.parse(
			window.localStorage.getItem(KEY_SELECT_REPOSITORY) || '[]'
		) as SelectedRepositoryInfo[];

		dispatch(setSelectedRepositoryList(storedSelectedRepositoryList));
	}, [dispatch]);

	return (
		<div css={container}>
			<div css={titleSt}>레포지토리 검색</div>
			<SearchToolbar />
			<RepositoryTable />
			<RepositoryTablePagination />
		</div>
	);
}

const container = css`
	display: flex;
	flex-direction: column;
	gap: 48px;

	min-width: 310px;
`;

const titleSt = css`
	color: black;
	font-weight: bolder;
	font-size: 32px;
`;
