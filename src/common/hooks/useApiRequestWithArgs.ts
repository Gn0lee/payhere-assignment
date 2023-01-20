import { useState, useCallback } from 'react';

export default function useApiRequestWithArg<Argument, Response>(
	requestFunction: (arg: Argument) => Promise<Response>
) {
	const [response, setResponse] = useState<Response | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	// eslint-disable-next-line
	const [error, setError] = useState<any>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	const sendRequest = useCallback(
		async (arg: Argument) => {
			setIsLoading(true);
			try {
				const responseData = await requestFunction(arg);
				setResponse(responseData);
				setIsLoading(false);
				setIsLoaded(true);
				// eslint-disable-next-line
			} catch (err: any) {
				setError(err);
				setIsLoading(false);
				setIsLoaded(true);
			}
		},
		[requestFunction]
	);

	return {
		sendRequest,
		response,
		isLoading,
		error,
		isLoaded,
	};
}
