import { createAsyncThunk } from '@reduxjs/toolkit';

import getRepositoryListByNameApi from 'src/features/repository/api/getRepositoryListByName.api';
import type { RepositoryInfo } from 'src/features/repository/types/getRepositoryListByName.types';
import type { RootState } from 'src/common/redux/store';

export interface GetRepositoryListByNameThunkResult {
	repositoryList: RepositoryInfo[];
	totalCount: number;
}

export const getRepositoryListByNameThunk = createAsyncThunk<
	GetRepositoryListByNameThunkResult,
	void,
	{ state: RootState }
>('repo/get', async (args, thunkAPI) => {
	const {
		repository: { page, perPage, searchValue },
	} = thunkAPI.getState();

	try {
		const { total_count: totalCount, items } = await getRepositoryListByNameApi({
			page,
			perPage,
			searchValue,
		});

		return { repositoryList: items, totalCount };
		// eslint-disable-next-line
	} catch (error: any) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});
