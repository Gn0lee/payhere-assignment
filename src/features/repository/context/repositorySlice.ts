import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RepositoryInfo } from 'src/features/repository/types/getRepositoryListByName.types';

interface RepositoryData {
	page: number;
	perPage: number;
	searchValue: string;
	repositoryList: RepositoryInfo[];
}

const initialState: RepositoryData = {
	page: 0,
	perPage: 10,
	searchValue: '',
	repositoryList: [],
};

const exampleSlice = createSlice({
	name: 'example1',
	initialState,
	reducers: {
		setExample: (state, action: PayloadAction<number>): RepositoryData => {
			return { ...state, page: action.payload };
		},
	},
});

export const { setExample } = exampleSlice.actions;

export default exampleSlice.reducer;
