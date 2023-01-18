import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExampleData {
	example: number;
}

const initialState: ExampleData = {
	example: 0,
};

const exampleSlice = createSlice({
	name: 'example1',
	initialState,
	reducers: {
		setExample: (state, action: PayloadAction<number>): ExampleData => {
			return { ...state, example: action.payload };
		},
	},
});

export const { setExample } = exampleSlice.actions;

export default exampleSlice.reducer;
