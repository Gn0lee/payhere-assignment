import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RepositoryInfo } from 'src/features/repository/types/getRepositoryListByName.types';
import { getRepositoryListByNameThunk } from 'src/features/repository/thunk/getRepositoryListByName.thunk';

export interface RepositoryData {
	page: number;
	perPage: number;
	searchValue: string;
	repositoryList: RepositoryInfo[];
	isLoading: boolean;
	isLoaded: boolean;
	totalCount: number;
	hasError: boolean;
}

const initialState: RepositoryData = {
	page: 1,
	perPage: 10,
	searchValue: '',
	repositoryList: [],
	isLoaded: false,
	isLoading: false,
	totalCount: 0,
	hasError: false,
};

const repositorySlice = createSlice({
	name: 'repository',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>): RepositoryData => {
			return { ...state, searchValue: action.payload };
		},
		setPage: (state, action: PayloadAction<number>): RepositoryData => {
			return { ...state, page: action.payload };
		},
		setPerPage: (state, action: PayloadAction<number>): RepositoryData => {
			return { ...state, perPage: action.payload };
		},
	},
	extraReducers(builder) {
		builder.addCase(getRepositoryListByNameThunk.pending, state => {
			return { ...state, isLoading: true, hasError: false };
		});

		builder.addCase(getRepositoryListByNameThunk.rejected, state => {
			return { ...state, isLoaded: true, isLoading: false, hasError: true };
		});

		builder.addCase(getRepositoryListByNameThunk.fulfilled, (state, action) => {
			return { ...state, isLoading: false, hasError: false, isLoaded: true, ...action.payload };
		});
	},
});

export default repositorySlice.reducer;
export const { setSearchValue, setPage, setPerPage } = repositorySlice.actions;
