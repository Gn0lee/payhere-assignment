import { createBrowserRouter } from 'react-router-dom';

import Layout from 'src/common/layout/Layout';
import Repository from 'src/pages/Repository';
import Issues from 'src/pages/Issues';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Repository /> },
			{ path: 'issues', element: <Issues /> },
		],
	},
]);

export default router;
