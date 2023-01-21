import { css } from '@emotion/react';
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingStatus() {
	return (
		<div css={emptyContainer}>
			<LoadingOutlined style={{ fontSize: 40, color: 'black' }} />
			<div>검색중..</div>
		</div>
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
