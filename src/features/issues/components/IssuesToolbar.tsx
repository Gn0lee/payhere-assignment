import { css } from '@emotion/react';
import { useSelector } from 'react-redux';

import { RootState } from 'src/common/redux/store';
import SelectedRepositoryLabel from 'src/common/components/SelectedRepositoryLabel';

import type { RepositoryData } from 'src/features/repository/context/repositorySlice';
import React from 'react';

export default function IssuesToolbar() {
	const { selectedRepositoryList } = useSelector<RootState, RepositoryData>(state => state.repository);

	return (
		<div css={container}>
			{selectedRepositoryList.length > 0 ? (
				<div css={labelContainer}>
					{selectedRepositoryList.map(el => (
						<SelectedRepositoryLabel color={el.color} id={el.id} fullName={el.fullName} name={el.name} key={el.id} />
					))}
				</div>
			) : null}
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

const labelContainer = css`
	display: flex;
	gap: 8px;

	height: 32px;

	@media (max-width: 576px) {
		flex-wrap: wrap;
		height: auto;
	}
`;
