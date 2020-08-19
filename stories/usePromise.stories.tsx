import React, { useEffect } from "react";
import { usePromise } from "../src";

export default {
	title: "usePromise",
	component: usePromise,
};

export const KanyeApi = () => {
	const kanyeApi = "https://api.kanye.rest";

	type KanyeApiResponse = {
		quote: string;
	};

	const { value, pending, call } = usePromise({
		promiseFunction: async () => {
			const response = await fetch(kanyeApi);
			const json: KanyeApiResponse = await response.json();
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
