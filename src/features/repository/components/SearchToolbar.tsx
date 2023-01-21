import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { RootState, useAppDispatch } from 'src/common/redux/store';

import { RepositoryData, setSearchValue } from 'src/features/repository/context/repositorySlice';
import { getRepositoryListByNameThunk } from 'src/features/repository/thunk/getRepositoryListByName.thunk';
import SelectSearchPerPage from 'src/features/repository/components/SelectSearchPerPage';

export default function SearchToolbar() {
	const dispatch = useAppDispatch();

	const { searchValue, perPage } = useSelector<RootState, RepositoryData>(state => state.repository);

	const searchValueChangeHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
		dispatch(setSearchValue(event.target.value));
	};

	useEffect(() => {
		const searchTimeout = setTimeout(() => {
			dispatch(getRepositoryListByNameThunk());
		}, 800);

		return () => {
			clearTimeout(searchTimeout);
		};
	}, [dispatch, searchValue, perPage]);

	return (
		<div>
			<Input
				style={{ minWidth: '150px', maxWidth: '500px' }}
				placeholder="검색할 레포지토리 이름을 입력하세요"
				allowClear
				onChange={searchValueChangeHandler}
				value={searchValue}
				suffix={<SearchOutlined />}
				addonAfter={<SelectSearchPerPage />}
			/>
		</div>
	);
}
