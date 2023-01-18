import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

export default function CommonExample() {
	const navigate = useNavigate();

	return (
		<div css={exampleSt}>
			<h1>Common example</h1>
			<button onClick={() => navigate('/example')}>
				go to <strong>/example"</strong>
			</button>
		</div>
	);
}

const exampleSt = css`
	height: 100%;

	display: flex;
	flex-direction: column;
	gap: 100px;

	justify-content: center;
`;
