import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type User = {
	name: string;
	email: string;
	github: string;
};

export type UserId = string;

export type UserWithId = {
	id: UserId;
} & User;

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "peter@gmai.com",
		github: "peter",
	},
];

const initialState: UserWithId[] = (() => {
	const peristedState = localStorage.getItem("__redux_state__");
	return peristedState ? JSON.parse(peristedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id: UserId = crypto.randomUUID();
			const newUser: UserWithId = {
				id,
				name: action.payload.name,
				email: action.payload.email,
				github: action.payload.github,
			};
			state.push(newUser);
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const userExists = state.some((user) => user.id === action.payload.id);
			if (!userExists) {
				state.push(action.payload);
			}
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
