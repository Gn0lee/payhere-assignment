import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RepositoryInfo } from 'src/features/repository/types/getRepositoryListByName.types';
import { getRepositoryListByNameThunk } from 'src/features/repository/thunk/getRepositoryListByName.thunk';
import { makeRandomColor } from 'src/features/repository/utils/randomColor';

interface SelectedRepositoryPayload {
	id: number;
	fullName: string;
	name: string;
}

export interface SelectedRepositoryInfo extends SelectedRepositoryPayload {
	color: string;
}

export interface RepositoryData {
	page: number;
	perPage: number;
	searchValue: string;
	repositoryList: RepositoryInfo[];
	isLoading: boolean;
	isLoaded: boolean;
	totalCount: number;
	hasError: boolean;
	selectedRepositoryList: SelectedRepositoryInfo[];
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
	selectedRepositoryList: [],
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
		addSelectedRepository: (state, action: PayloadAction<SelectedRepositoryPayload>) => {
			return {
				...state,
				selectedRepositoryList: state.selectedRepositoryList.concat({
					...action.payload,
					color: makeRandomColor(state.selectedRepositoryList.map(el => el.color)),
				}),
			};
		},
		deleteSelectedRepository: (state, action: PayloadAction<number>) => {
			return { ...state, selectedRepositoryList: state.selectedRepositoryList.filter(el => el.id !== action.payload) };
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
export const { setSearchValue, setPage, setPerPage, deleteSelectedRepository, addSelectedRepository } =
	repositorySlice.actions;
