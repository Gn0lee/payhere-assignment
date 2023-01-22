import { useSelector } from 'react-redux';
import { Select } from 'antd';

import { RootState, useAppDispatch } from 'src/common/redux/store';

import type { RepositoryData } from 'src/features/repository/context/repositorySlice';
import { setPerPage } from 'src/features/repository/context/repositorySlice';

const { Option } = Select;

export default function SelectSearchPerPage() {
	const dispatch = useAppDispatch();

	const { perPage } = useSelector<RootState, RepositoryData>(state => state.repository);

	const perPageChangeHandler = (value: string) => {
		dispatch(setPerPage(Number(value)));
	};

	return (
		<Select onChange={perPageChangeHandler} value={perPage.toString()}>
			<Option value="10">10/page</Option>
			<Option value="20">20/page</Option>
			<Option value="50">50/page</Option>
			<Option value="100">100/page</Option>
		</Select>
	);
}
