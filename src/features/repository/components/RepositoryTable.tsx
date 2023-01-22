import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Table, ConfigProvider, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { RootState, useAppDispatch } from 'src/common/redux/store';
import LoadingStatus from 'src/common/components/LoadingStatus';

import {
	addSelectedRepository,
	deleteSelectedRepository,
	RepositoryData,
} from 'src/features/repository/context/repositorySlice';
import { MAX_SELECT_REPOSITORY_NUM } from 'src/features/repository/data/constants';

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

export default function RepositoryTable() {
	const dispatch = useAppDispatch();

	const [api, contextHolder] = notification.useNotification();

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

	const { isLoading, selectedRepositoryList } = useSelector<RootState, RepositoryData>(state => state.repository);

	const columns: ColumnsType<RepositoryTableData> = [
		Table.SELECTION_COLUMN,
		{ title: '이름', dataIndex: 'name', key: 'name', fixed: 'left', width: 100, align: 'center' },
		Table.EXPAND_COLUMN,
		{ title: '전체 이름', dataIndex: 'fullName', key: 'fullName', width: 200, ellipsis: true, align: 'center' },
		{ title: '소유자', dataIndex: 'owner', key: 'owner', width: 80, align: 'center' },
		{ title: '언어', dataIndex: 'language', key: 'language', width: 110, align: 'center' },
		{ title: 'Open Issues', dataIndex: 'openIssuesCount', key: 'openIssuesCount', width: 80, align: 'center' },
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
			render: value => (
				<a href={value} target="_blank" rel="noreferrer">
					바로가기
				</a>
			),
			width: 100,
		},
	];

	const expandedRowRender = (record: RepositoryTableData) => <p style={{ margin: 0 }}>{record.description}</p>;

	return (
		<>
			{contextHolder}
			<ConfigProvider renderEmpty={isLoading ? LoadingStatus : undefined}>
				<Table
					dataSource={isLoading ? undefined : repositoryTableData}
					columns={columns}
					expandable={{
						rowExpandable: record => record.description !== null,
						expandedRowRender,
					}}
					rowSelection={{
						type: 'checkbox',
						hideSelectAll: true,
						onSelect: (record, selected) => {
							if (selected && selectedRepositoryList.length < MAX_SELECT_REPOSITORY_NUM) {
								dispatch(addSelectedRepository({ id: record.id, fullName: record.fullName, name: record.name }));
								return;
							}

							if (selected && selectedRepositoryList.length === MAX_SELECT_REPOSITORY_NUM) {
								api.error({
									message: '등록 최대개수 초과',
									description: `등록 가능한 최대 레포지토리 개수는 ${MAX_SELECT_REPOSITORY_NUM}개 입니다.`,
								});
								return;
							}

							dispatch(deleteSelectedRepository(record.id));
						},
						selectedRowKeys: selectedRepositoryList.map(el => el.id),
					}}
					pagination={false}
					scroll={{ y: 1000, x: 300 }}
					style={{ maxWidth: 2000, minWidth: 310 }}
				/>
			</ConfigProvider>
		</>
	);
}
