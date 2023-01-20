import { createBrowserRouter } from 'react-router-dom';

import Layout from 'src/common/layout/Layout';
import SearchRepository from 'src/pages/SearchRepository';

const router = createBrowserRouter([
	{ path: '/', element: <Layout />, children: [{ index: true, element: <SearchRepository /> }] },
]);

export default router;
