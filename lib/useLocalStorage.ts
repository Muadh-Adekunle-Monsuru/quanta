export const useLocalStorage = (key: string) => {
	const setLocalUser = (value: string) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.log('Error setting user', e);
		}
	};

	const getLocalUser = () => {
		try {
			if (typeof window !== 'undefined') {
				// Code that uses `window`
				const user = window.localStorage.getItem(key);
				return user ? JSON.parse(user) : undefined;
			}
		} catch (e) {
			console.log('Error getting local user', e);
		}
	};

	const removeLocalUser = () => {
		try {
			window.localStorage.removeItem(key);
		} catch (e) {
			console.log('error removing local user', e);
		}
	};
	return { setLocalUser, getLocalUser, removeLocalUser };
};
