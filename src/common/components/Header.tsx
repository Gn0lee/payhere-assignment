import { css } from '@emotion/react';

export default function Header() {
	return (
		<header css={container}>
			<h2 css={contentSt}>Payhere Assignment</h2>
		</header>
	);
}

const container = css`
	flex: none;

	display: flex;
	align-items: center;

	width: 100%;
	height: 64px;

	padding: 8px 16px 8px 16px;

	background-color: #348bf4;
`;

const contentSt = css`
	color: #fafafa;
`;
