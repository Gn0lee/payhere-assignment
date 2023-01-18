import { css } from '@emotion/react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'src/common/redux/store';
import React, { useRef } from 'react';
import { setExample } from 'src/features/example/context/exampleSlice';

export default function FeatureExample() {
	const dispatch = useAppDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	const { example } = useSelector((state: RootState) => state.example);

	const submitHandler: React.FormEventHandler = e => {
		e.preventDefault();
		dispatch(setExample(Number(inputRef.current?.value || '0')));
	};

	return (
		<div css={exampleSt}>
			<h1>Welcome example</h1>
			<h3>{example}</h3>
			<form onSubmit={submitHandler}>
				<input type="number" ref={inputRef} />
				<button>submit example</button>
			</form>
		</div>
	);
}

const exampleSt = css`
	display: flex;
	flex-direction: column;
	gap: 50px;

	justify-content: center;
`;
