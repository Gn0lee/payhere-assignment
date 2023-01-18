import { createBrowserRouter } from 'react-router-dom';

import FeatureExample from 'src/features/example/components/FeatureExample';
import CommonExample from 'src/common/components/CommonExample';

const router = createBrowserRouter([
	{ path: '/', element: <CommonExample /> },
	{ path: '/example', element: <FeatureExample /> },
]);

export default router;
