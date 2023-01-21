import { css } from '@emotion/react';
import SearchToolbar from 'src/features/repository/components/SearchToolbar';
import RepositoryTable from 'src/features/repository/components/RepositoryTable';

export default function SearchRepository() {
	return (
		<div css={container}>
			<h1>레포지토리 검색</h1>
			<SearchToolbar />
			<RepositoryTable />
		</div>
	);
}

const container = css`
	min-width: 300px;
`;
