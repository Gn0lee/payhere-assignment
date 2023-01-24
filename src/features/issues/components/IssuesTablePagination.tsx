import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import { RootState, useAppDispatch } from 'src/common/redux/store';

import type { IssuesData } from 'src/features/issues/context/issuesSlice';
import { setPerPage, setPage } from 'src/features/issues/context/issuesSlice';

export default function IssuesTablePagination() {
	const dispatch = useAppDispatch();

	const { perPage, totalCount, page, isLoaded, hasError } = useSelector<RootState, IssuesData>(state => state.issues);

	const sizeChangeHandler: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
		dispatch(setPerPage(pageSize));
	};

	const pageChangeHandler: PaginationProps['onChange'] = value => {
		dispatch(setPage(value));
	};

	if (!isLoaded || hasError) return null;

	return (
		<div css={container}>
			<Pagination
				onChange={pageChangeHandler}
				showSizeChanger
				onShowSizeChange={sizeChangeHandler}
				total={totalCount}
				pageSize={perPage}
				current={page}
				responsive
			/>
		</div>
	);
}

const container = css`
	display: flex;

	justify-content: center;
`;
