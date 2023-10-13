import "./App.css";
import CreateNewUser from "./components/CreateNewUser";
import UserList from "./components/UserList";
import { Toaster } from "sonner";

function App() {
	return (
		<>
			<UserList />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
