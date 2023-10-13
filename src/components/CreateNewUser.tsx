import { useUserActions } from "../hooks/useUserActions";
import { User } from "../store/users/slice";
import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";

const CreateNewUser = () => {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;
		const user: User = {
			name,
			email,
			github,
		};

		if (!name || !email || !github) {
			return setResult("ko");
		}
		setResult("ok");
		addUser(user);
		form.reset();
	};

	return (
		<Card className="mx-auto max-w-md mt-[16px]">
			<Title>Create New User</Title>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<TextInput className="rounded-md" name="name" placeholder="Your name" />
				<TextInput
					className="rounded-md"
					name="email"
					placeholder="Your email"
				/>
				<TextInput
					className="rounded-md"
					name="github"
					placeholder="Your github user"
				/>
				<div className="">
					<Button
						type="submit"
						className="bg-blue-500 text-white rounded-md mt-[16px]"
					>
						Create User
					</Button>
					<span className="ml-4">
						{result === "ko" && (
							<Badge className="bg-red-500 text-white rounded-full py-1">
								Error
							</Badge>
						)}
						{result === "ok" && (
							<Badge className="bg-green-600 text-white rounded-full py-1">
								Successfully saved
							</Badge>
						)}
					</span>
				</div>
			</form>
		</Card>
	);
};

export default CreateNewUser;
