import usersReducer, {
	type UserWithId,
	deleteUserById,
	rollbackUser,
} from "./users/slice";
import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";

const localStoragePersistanceMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux_state__", JSON.stringify(store.getState()));
	};

const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousStateUsers = store.getState().users as UserWithId[];
	next(action);
	if (type === deleteUserById.type) {
		const userToRemove = previousStateUsers.find((user) => user.id === payload);
		const userIdToRomove = userToRemove?.id;
		fetch(`https://jsonplaceholder.typicode.com/userss/${userIdToRomove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					toast.success(`User ${payload} deleted`);
					return;
				}
				throw new Error("Error deleting user");
			})
			.catch((error) => {
				toast.error(`Error deleting user ${userIdToRomove}`);
				if (userToRemove) {
					store.dispatch(rollbackUser(userToRemove));
				}
				console.log(error);
			});
	}
};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: [localStoragePersistanceMiddleware, syncWithDatabase],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
