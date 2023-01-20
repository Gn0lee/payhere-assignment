import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import Header from 'src/common/components/Header';

export default function Layout() {
	return (
		<div css={container}>
			<Header />
			<main css={outletContainer}>
				<Outlet />
			</main>
		</div>
	);
}

const container = css`
	display: flex;
	flex-direction: column;
	gap: 0;
`;

const outletContainer = css`
	flex: auto;

	padding: 32px;
`;
