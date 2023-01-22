import { createAsyncThunk } from '@reduxjs/toolkit';

import getIssuesByRepoApi from 'src/features/issues/api/getIssuesByRepo.api';
import type { IssueInfo } from 'src/features/issues/types/GetIssuesByRepo.type';
import type { RootState } from 'src/common/redux/store';

export interface GetIssuesByRepoThunkResult {
	issues: IssueInfo[];
	totalCount: number;
}

export const getIssuesByRepoThunk = createAsyncThunk<GetIssuesByRepoThunkResult, void, { state: RootState }>(
	'issues/get',
	async (args, thunkAPI) => {
		const {
			repository: { selectedRepositoryList },
			issues: { page, perPage },
		} = thunkAPI.getState();

		try {
			if (selectedRepositoryList.length < 1) {
				return { issues: [], totalCount: 0 };
			}

			const { total_count: totalCount, items } = await getIssuesByRepoApi({
				repos: selectedRepositoryList,
				perPage,
				page,
			});

			return { issues: items, totalCount };

			// eslint-disable-next-line
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.toString());
		}
	}
);
