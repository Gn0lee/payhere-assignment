import { css } from '@emotion/react';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'src/common/redux/store';
import { KEY_SELECT_REPOSITORY } from 'src/common/data/constants';

import type { SelectedRepositoryInfo } from 'src/features/repository/context/repositorySlice';
import { RepositoryData, setSelectedRepositoryList } from 'src/features/repository/context/repositorySlice';
import { IssuesData } from 'src/features/issues/context/issuesSlice';
import { getIssuesByRepoThunk } from 'src/features/issues/thunk/getIssuesByRepo.thunk';
import IssuesToolbar from 'src/features/issues/components/IssuesToolbar';
import IssuesTable from 'src/features/issues/components/IssuesTable';
import IssuesTablePagination from 'src/features/issues/components/IssuesTablePagination';

export default function Issues() {
	const dispatch = useAppDispatch();

	const { selectedRepositoryList } = useSelector<RootState, RepositoryData>(state => state.repository);

	const { page, perPage } = useSelector<RootState, IssuesData>(state => state.issues);

	useLayoutEffect(() => {
		const storedSelectedRepositoryList = JSON.parse(
			window.localStorage.getItem(KEY_SELECT_REPOSITORY) || '[]'
		) as SelectedRepositoryInfo[];

		dispatch(setSelectedRepositoryList(storedSelectedRepositoryList));
	}, [dispatch]);

	useEffect(() => {
		const issueTimeout = setTimeout(() => {
			dispatch(getIssuesByRepoThunk());
		}, 800);

		return () => {
			clearTimeout(issueTimeout);
		};
	}, [dispatch, page, perPage, selectedRepositoryList]);

	return (
		<div css={container}>
			<div css={titleSt}>이슈 리스트</div>
			<IssuesToolbar />
			<IssuesTable />
			<IssuesTablePagination />
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
