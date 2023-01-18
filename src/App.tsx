import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from 'src/common/styles/GlobalStyle';
import router from 'src/routes/Routes';
import store from 'src/common/redux/store';

function App() {
	return (
		<>
			<GlobalStyle />
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</>
	);
}

export default App;
