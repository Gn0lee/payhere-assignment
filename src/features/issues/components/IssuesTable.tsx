import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Table, ConfigProvider, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { RootState, useAppDispatch } from 'src/common/redux/store';
import LoadingStatus from 'src/common/components/LoadingStatus';
import TableShortcutElement from 'src/common/components/TableShortcutElement';
import { convertTimeFormat } from 'src/common/utils/timeFormatFunc';

import type { IssuesData } from 'src/features/issues/context/issuesSlice';
import { setPerPage } from 'src/features/issues/context/issuesSlice';
import IssueBodyExpand from 'src/features/issues/components/IssueBodyExpand';

export interface IssuesTableData {
	key: React.Key;
	title: string;
	repo: string;
	html_url: string;
	state: string;
	comments: number;
	createdAt: string;
	updatedAt: string;
	body: string;
	closedAt: string | null;
	state_reason: string | null;
	score: number;
}

export default function IssuesTable() {
	const dispatch = useAppDispatch();

	const issuesTableData = useSelector<RootState, IssuesTableData[]>(state =>
		state.issues.issueList.map(el => ({
			key: el.id,
			title: el.title,
			repo: el.repository_url.split('/').at(-1) as string,
			html_url: el.html_url,
			state: el.state,
			comments: el.comments,
			createdAt: convertTimeFormat(el.created_at),
			updatedAt: convertTimeFormat(el.updated_at),
			body: el.body,
			closedAt: convertTimeFormat(el.closed_at),
			state_reason: el.state_reason,
			score: el.score,
		}))
	);

	const { isLoading, hasError, perPage } = useSelector<RootState, IssuesData>(state => state.issues);

	const columns: ColumnsType<IssuesTableData> = [
		{ title: '제목', dataIndex: 'title', key: 'title', fixed: 'left', width: 100, align: 'center' },
		{ title: '레포', dataIndex: 'repo', key: 'repo', fixed: 'left', width: 100, align: 'center' },
		Table.EXPAND_COLUMN,
		{ title: '상태', dataIndex: 'state', key: 'state', width: 80, align: 'center' },
		{ title: '댓글 수', dataIndex: 'comments', key: 'comments', width: 80, align: 'center' },
		{ title: '생성일', dataIndex: 'createdAt', key: 'createdAt', width: 110, align: 'center' },
		{ title: '수정일', dataIndex: 'updatedAt', key: 'updatedAt', width: 110, align: 'center' },
		{ title: '종료일', dataIndex: 'closedAt', key: 'closedAt', width: 110, align: 'center' },
		{ title: '종료사유', dataIndex: 'state_reason', key: 'state_reason', width: 100, align: 'center' },
		{ title: '점수', dataIndex: 'score', key: 'score', width: 80, align: 'center' },
		{
			title: '이슈',
			dataIndex: 'html_url',
			key: 'html_url',
			render: TableShortcutElement,
			width: 100,
			align: 'center',
		},
	];

	const perPageChangeHandler = (value: number) => {
		dispatch(setPerPage(value));
	};

	if (hasError) return <h2>에러가 발생하였습니다. 새로고침으로 다시 시도해 주세요.</h2>;

	return (
		<div css={container}>
			<Select
				value={perPage}
				options={[
					{ value: 10, label: '10/page' },
					{ value: 20, label: '20/page' },
					{ value: 50, label: '50/page' },
					{ value: 100, label: '100/page' },
				]}
				onChange={perPageChangeHandler}
			/>
			<ConfigProvider renderEmpty={isLoading ? LoadingStatus : undefined}>
				<Table
					dataSource={isLoading ? undefined : issuesTableData}
					columns={columns}
					expandable={{ rowExpandable: record => record.body !== '', expandedRowRender: IssueBodyExpand }}
					pagination={false}
					scroll={{ y: 1000, x: 300 }}
					style={{ maxWidth: 2000, minWidth: 310, width: '100%' }}
				/>
			</ConfigProvider>
		</div>
	);
}

const container = css`
	display: flex;
	flex-direction: column;
	gap: 16px;
	align-items: flex-end;

	max-width: 2000px;
	min-width: 310px;
`;
