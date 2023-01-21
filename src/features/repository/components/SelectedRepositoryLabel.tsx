import { css } from '@emotion/react';
import { Tooltip } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { useAppDispatch } from 'src/common/redux/store';

import type { SelectedRepositoryInfo } from 'src/features/repository/context/repositorySlice';
import { deleteSelectedRepository } from 'src/features/repository/context/repositorySlice';

interface SelectedRepositoryLabelProps extends SelectedRepositoryInfo {}

export default function SelectedRepositoryLabel({ id, name, fullName, color }: SelectedRepositoryLabelProps) {
	const dispatch = useAppDispatch();

	const deleteIconClickHandler = () => {
		dispatch(deleteSelectedRepository(id));
	};

	return (
		<Tooltip placement="top" title={fullName} color={color}>
			<div css={container(color)}>
				<div css={labelSt}>{name}</div>
				<CloseCircleFilled onClick={deleteIconClickHandler} style={{ color: '#F5F5F5', fontSize: 14, flex: 'none' }} />
			</div>
		</Tooltip>
	);
}

const container = (color: string) => css`
	display: flex;
	align-items: center;
	gap: 8px;

	max-width: 120px;
	height: 32px;

	padding: 4px 8px 4px 8px;

	background-color: ${color};

	border-radius: 8px;
`;

const labelSt = css`
	width: 100%;

	color: #f5f5f5;

	overflow: hidden;
	white-space: pre;
	text-overflow: ellipsis;

	font-size: 14px;
	font-weight: bold;
`;
