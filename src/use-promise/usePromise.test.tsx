import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { Button } from "./index";
import "@testing-library/jest-dom";

afterEach(cleanup);

test("displays text and can be clicked", () => {
	const onClick = jest.fn();

	const { getByText } = render(<Button onClick={onClick}>Test</Button>);

	fireEvent.click(getByText("Test"));

	expect(onClick).toBeCalledTimes(1);
});
