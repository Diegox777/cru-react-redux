import { useState } from "react";

const useLocalStorage = (key = "", initialValue = "") => {
	const [state, setState] = useState(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	const setLocalStorateState = (newState: Function | {}) => {
		try {
			const newStateValue =
				typeof newState === "function" ? newState(state) : newState;
			setState(newStateValue);
			localStorage.setItem(key, JSON.stringify(newStateValue));
		} catch (error) {
			console.log(`Unable to store new value for ${key} in localStorage.`);
		}
	};

	return [state, setLocalStorateState];
};

export default useLocalStorage;
