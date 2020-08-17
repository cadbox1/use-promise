import React, { useEffect } from "react";
import { action } from "@storybook/addon-actions";
import { usePromise } from "./index";

export default {
	title: "UsePromise",
	component: usePromise,
};

export const KanyApi = () => {
	const kanyeApi = "https://api.kanye.rest";

	type KanyeApiResponse = {
		quote: string;
	};

	const { value, pending, call } = usePromise<KanyeApiResponse>({
		promiseFunction: async () => {
			const response = await fetch(kanyeApi);
			const json = await response.json();
			return json;
		},
	});

	useEffect(() => {
		call();
	}, []);

	return (
		<div>
			<button onClick={() => call()}>
				{pending ? "Refreshing..." : "Refresh"}
			</button>
			<p>Random Kanye West quote:</p>
			<p>{value?.quote}</p>
		</div>
	);
};
