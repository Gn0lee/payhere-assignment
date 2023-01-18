import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

export default function GlobalStyle() {
	return (
		<Global
			styles={css`
				${emotionNormalize}
				html,
        body {
					padding: 0;
					margin: 0;
					background: white;
					min-height: 100%;
				}
			`}
		/>
	);
}
