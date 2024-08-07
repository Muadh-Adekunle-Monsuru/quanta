import { create } from 'zustand';

type Store = {
	refresh: boolean;
	setRefresh: () => void;
};

export const useZustandStore = create<Store>((set) => ({
	refresh: false,
	setRefresh: () => {
		set((state) => ({ refresh: !state.refresh }));
	},
}));
