import { createBrowserRouter } from 'react-router-dom';

import Layout from 'src/common/layout/Layout';
import SearchRepository from 'src/pages/SearchRepository';
import Issues from 'src/pages/Issues';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <SearchRepository /> },
			{ path: 'issues', element: <Issues /> },
		],
	},
]);

export default router;
