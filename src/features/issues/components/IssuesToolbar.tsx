import { css } from '@emotion/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { RootState } from 'src/common/redux/store';
import SelectedRepositoryLabel from 'src/common/components/SelectedRepositoryLabel';

import type { RepositoryData } from 'src/features/repository/context/repositorySlice';

export default function IssuesToolbar() {
	const navigate = useNavigate();

	const { selectedRepositoryList } = useSelector<RootState, RepositoryData>(state => state.repository);

	return (
		<div css={container(selectedRepositoryList.length < 1)}>
			{selectedRepositoryList.length > 0 ? (
				<div css={labelContainer}>
					{selectedRepositoryList.map(el => (
						<SelectedRepositoryLabel color={el.color} id={el.id} fullName={el.fullName} name={el.name} key={el.id} />
					))}
				</div>
			) : null}
			<Button onClick={() => navigate('/')} css={buttonCss}>
				뒤로가기
			</Button>
		</div>
	);
}

const container = (isEmpty: boolean) => css`
	display: flex;
	align-items: center;
	justify-content: ${isEmpty ? 'flex-end' : 'space-between'};

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
