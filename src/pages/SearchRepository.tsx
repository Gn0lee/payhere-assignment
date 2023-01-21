import { css } from '@emotion/react';

import SearchToolbar from 'src/features/repository/components/SearchToolbar';
import RepositoryTable from 'src/features/repository/components/RepositoryTable';
import RepositoryTablePagination from 'src/features/repository/components/RepositoryTablePagination';

export default function SearchRepository() {
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
