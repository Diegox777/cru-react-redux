import { useEffect, useState } from "react";

const useFetch = (url = "", options = {}) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// fetching data is a side effect, then use useEffect
	useEffect(() => {
		let isMounted = true;
		setIsLoading(true);
		fetch(url, options)
			.then((res) => res.json())
			.then((data) => {
				if (isMounted) {
					setData(data);
					setError(null);
				}
			})
			.catch((error) => {
				if (isMounted) {
					setError(error);
					setData(null);
				}
			})
			.finally(() => isMounted && setIsLoading(false));

		return () => {
			isMounted = false;
		};
	}, [url, options]);
	return { error, data, isLoading };
};

export default useFetch;
