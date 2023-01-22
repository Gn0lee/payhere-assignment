import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { IssueInfo } from 'src/features/issues/types/GetIssuesByRepo.type';
import { getIssuesByRepoThunk } from 'src/features/issues/thunk/getIssuesByRepo.thunk';

export interface IssuesData {
	page: number;
	perPage: number;
	isLoading: boolean;
	isLoaded: boolean;
	totalCount: number;
	hasError: boolean;
	issueList: IssueInfo[];
}

const initialState: IssuesData = {
	page: 1,
	perPage: 10,
	isLoaded: false,
	isLoading: true,
	totalCount: 0,
	hasError: false,
	issueList: [],
};

const issuesSlice = createSlice({
	name: 'issues',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>): IssuesData => {
			return { ...state, page: action.payload };
		},
		setPerPage: (state, action: PayloadAction<number>): IssuesData => {
			return { ...state, perPage: action.payload };
		},
	},
	extraReducers(builder) {
		builder.addCase(getIssuesByRepoThunk.pending, state => {
			return { ...state, isLoading: true, hasError: false };
		});

		builder.addCase(getIssuesByRepoThunk.rejected, state => {
			return { ...state, isLoading: false, isLoaded: true, hasError: true };
		});

		builder.addCase(getIssuesByRepoThunk.fulfilled, (state, action) => {
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				hasError: false,
				totalCount: action.payload.totalCount,
				issueList: action.payload.issues,
			};
		});
	},
});

export default issuesSlice.reducer;

export const { setPage, setPerPage } = issuesSlice.actions;
