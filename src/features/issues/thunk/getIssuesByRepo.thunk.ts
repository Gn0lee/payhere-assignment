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
			const { total_count: totalCount, items } = await getIssuesByRepoApi({
				repos: selectedRepositoryList,
				perPage,
				page,
			});

			if (selectedRepositoryList.length < 1) {
				// todo: 선택된 레포가 없다는 Noti 팝업 시키기
			}

			return { issues: items, totalCount };

			// eslint-disable-next-line
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.toString());
		}
	}
);
