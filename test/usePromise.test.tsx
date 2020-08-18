import React from "react";
import * as ReactDOM from "react-dom";
import { KanyeApi } from "../stories/usePromise.stories";

describe("Thing", () => {
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<KanyeApi />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
});
