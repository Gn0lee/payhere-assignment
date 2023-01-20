import { css } from '@emotion/react';

import { Input } from 'antd';

const { Search } = Input;

export default function SearchRepository() {
	return (
		<div css={container}>
			<h1>Search Repository</h1>
			<div>
				<Search style={{ maxWidth: '200px' }} />
			</div>
		</div>
	);
}

const container = css`
	min-width: 500px;
	max-width: 1000px;
`;
