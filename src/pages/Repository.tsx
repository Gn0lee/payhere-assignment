import { css } from '@emotion/react';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'src/common/redux/store';
import { KEY_SELECT_REPOSITORY } from 'src/common/data/constants';

import SearchToolbar from 'src/features/repository/components/SearchToolbar';
import RepositoryTable from 'src/features/repository/components/RepositoryTable';
import RepositoryTablePagination from 'src/features/repository/components/RepositoryTablePagination';
import {
	RepositoryData,
	SelectedRepositoryInfo,
	setSelectedRepositoryList,
} from 'src/features/repository/context/repositorySlice';
import { getRepositoryListByNameThunk } from 'src/features/repository/thunk/getRepositoryListByName.thunk';

export default function Repository() {
	const dispatch = useAppDispatch();

	const { searchValue, perPage, page } = useSelector<RootState, RepositoryData>(state => state.repository);

	useLayoutEffect(() => {
		const storedSelectedRepositoryList = JSON.parse(
			window.localStorage.getItem(KEY_SELECT_REPOSITORY) || '[]'
		) as SelectedRepositoryInfo[];

		dispatch(setSelectedRepositoryList(storedSelectedRepositoryList));
	}, [dispatch]);

	useEffect(() => {
		const searchTimeout = setTimeout(() => {
			dispatch(getRepositoryListByNameThunk());
		}, 800);

		return () => {
			clearTimeout(searchTimeout);
		};
	}, [dispatch, searchValue, perPage, page]);

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
