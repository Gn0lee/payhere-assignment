import { configureStore, Middleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

import repositorySlice from 'src/features/repository/context/repositorySlice';
import issuesSlice from 'src/features/issues/context/issuesSlice';

const rootReducer = {
	repository: repositorySlice,
	issues: issuesSlice,
};

const customMiddleware: Middleware[] = [];

if (import.meta.env.VITE_RELEASE_ENV !== 'prod') {
	customMiddleware.push(logger);
}

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(customMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
