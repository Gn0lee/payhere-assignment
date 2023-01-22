import { css } from '@emotion/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { RootState, useAppDispatch } from 'src/common/redux/store';

import { RepositoryData, setSearchValue } from 'src/features/repository/context/repositorySlice';

import SelectedRepositoryLabel from 'src/common/components/SelectedRepositoryLabel';
import SelectSearchPerPage from 'src/features/repository/components/SelectSearchPerPage';

export default function SearchToolbar() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { searchValue, selectedRepositoryList } = useSelector<RootState, RepositoryData>(state => state.repository);

	const searchValueChangeHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
		dispatch(setSearchValue(event.target.value));
	};

	return (
		<div css={container}>
			<div css={searchContainer}>
				<Input
					placeholder="이름을 입력하세요"
					allowClear
					onChange={searchValueChangeHandler}
					value={searchValue}
					suffix={<SearchOutlined />}
					addonAfter={<SelectSearchPerPage />}
				/>
				{selectedRepositoryList.length > 0 ? (
					<div css={labelContainer}>
						{selectedRepositoryList.map(el => (
							<SelectedRepositoryLabel color={el.color} id={el.id} fullName={el.fullName} name={el.name} key={el.id} />
						))}
					</div>
				) : null}
			</div>
			<Button disabled={selectedRepositoryList.length < 1} onClick={() => navigate('issues')} css={buttonCss}>
				Issue로 이동
			</Button>
		</div>
	);
}

const container = css`
	display: flex;
	align-items: center;
	justify-content: space-between;

	max-width: 2000px;

	@media (max-width: 922px) {
		align-items: flex-start;
	}

	@media (max-width: 700px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
`;

const searchContainer = css`
	display: flex;
	align-items: center;
	gap: 32px;

	@media (max-width: 922px) {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}
`;

const labelContainer = css`
	display: flex;
	gap: 8px;

	height: 32px;

	@media (max-width: 576px) {
		flex-wrap: wrap;
		height: auto;
	}
`;

const buttonCss = css`
	@media (max-width: 922px) {
		align-self: flex-end;
	}
`;
