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
					width: 100%;
					height: 100%;
				}

				#root {
					width: 100%;
					height: 100%;
				}

				* {
					box-sizing: border-box;
				}
			`}
		/>
	);
}
