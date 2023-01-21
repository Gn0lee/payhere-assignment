import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Table, ConfigProvider } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { LoadingOutlined } from '@ant-design/icons';

import { RootState } from 'src/common/redux/store';
import { RepositoryData } from 'src/features/repository/context/repositorySlice';

interface RepositoryTableData {
	key: React.Key;
	name: string;
	language: string;
	description: string | null;
	html_url: string;
	id: number;
	fullName: string;
	owner: string;
	openIssuesCount: number;
	createdAt: string;
	updatedAt: string;
	pushedAt: string;
	stargazersCount: number;
	watchersCount: number;
	forksCount: number;
}

const customizeRenderEmpty = () => (
	<div css={emptyContainer}>
		<LoadingOutlined style={{ fontSize: 40, color: 'black' }} />
		<div>검색중..</div>
	</div>
);

export default function RepositoryTable() {
	const repositoryTableData = useSelector<RootState, RepositoryTableData[]>(state =>
		state.repository.repositoryList.map(el => ({
			key: el.id,
			description: el.description,
			id: el.id,
			language: el.language,
			name: el.name,
			html_url: el.html_url,
			fullName: el.full_name,
			owner: el.owner.login,
			openIssuesCount: el.open_issues_count,
			createdAt: moment(el.created_at).utcOffset('+UTC09:00').format('YYYY.MM.DD hh:mm'),
			updatedAt: moment(el.updated_at).utcOffset('+UTC09:00').format('YYYY.MM.DD hh:mm'),
			pushedAt: moment(el.pushed_at).utcOffset('+UTC09:00').format('YYYY.MM.DD hh:mm'),
			stargazersCount: el.stargazers_count,
			watchersCount: el.watchers_count,
			forksCount: el.forks_count,
		}))
	);

	const { isLoading } = useSelector<RootState, RepositoryData>(state => state.repository);

	const columns: ColumnsType<RepositoryTableData> = [
		Table.SELECTION_COLUMN,
		{ title: '이름', dataIndex: 'name', key: 'name', fixed: 'left', width: 100, align: 'center' },
		Table.EXPAND_COLUMN,
		{ title: '전체 이름', dataIndex: 'fullName', key: 'fullName', width: 200, ellipsis: true, align: 'center' },
		{ title: '소유자', dataIndex: 'owner', key: 'owner', width: 80, align: 'center' },
		{ title: '언어', dataIndex: 'language', key: 'language', width: 110, align: 'center' },
		{ title: 'Issues', dataIndex: 'openIssuesCount', key: 'openIssuesCount', width: 80, align: 'center' },
		{ title: 'Stars', dataIndex: 'stargazersCount', key: 'stargazersCount', width: 80, align: 'center' },
		{ title: 'Watchers', dataIndex: 'watchersCount', key: 'watchersCount', width: 100, align: 'center' },
		{ title: 'forks', dataIndex: 'forksCount', key: 'forksCount', width: 80, align: 'center' },
		{ title: '생성일', dataIndex: 'createdAt', key: 'createdAt', width: 110, align: 'center' },
		{ title: '수정일', dataIndex: 'updatedAt', key: 'updatedAt', width: 110, align: 'center' },
		{ title: 'Push 일', dataIndex: 'pushedAt', key: 'pushedAt', width: 110, align: 'center' },
		{
			title: '깃헙',
			dataIndex: 'html_url',
			key: 'html_url',
			render: value => <a href={value}>바로가기</a>,
			width: 100,
		},
	];

	const expandedRowRender = (record: RepositoryTableData) => <p style={{ margin: 0 }}>{record.description}</p>;

	return (
		<ConfigProvider renderEmpty={customizeRenderEmpty}>
			<Table
				dataSource={isLoading ? undefined : repositoryTableData}
				columns={columns}
				expandable={{
					rowExpandable: record => record.description !== null,
					expandedRowRender,
				}}
				rowSelection={{
					type: 'checkbox',
					onChange: (selectedRowKeys, selectedRows, info) => {
						console.log(selectedRowKeys, selectedRows, info);
					},
					hideSelectAll: true,
				}}
				pagination={false}
				scroll={{ y: 1000, x: 300 }}
				style={{ maxWidth: 1500, minWidth: 310, height: 1000 }}
			/>
		</ConfigProvider>
	);
}

const emptyContainer = css`
	display: flex;
	flex-direction: column;
	gap: 48px;
	align-items: center;

	padding: 32px;

	& > div {
		color: black;
		font-size: 20px;
		font-weight: bold;
	}
`;
