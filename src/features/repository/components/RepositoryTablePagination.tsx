import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';

import { RootState, useAppDispatch } from 'src/common/redux/store';

import { RepositoryData, setPage, setPerPage } from 'src/features/repository/context/repositorySlice';

export default function RepositoryTablePagination() {
	const dispatch = useAppDispatch();

	const { perPage, totalCount, page, isLoaded } = useSelector<RootState, RepositoryData>(state => state.repository);

	const sizeChangeHandler: PaginationProps['onShowSizeChange'] = (_, pageSize) => {
		dispatch(setPerPage(pageSize));
	};

	const pageChangeHandler: PaginationProps['onChange'] = value => {
		dispatch(setPage(value));
	};

	if (!isLoaded) return null;

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
