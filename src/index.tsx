import { useState } from "react";

export interface PromiseState<U> {
	pending: boolean;
	fulfilled: boolean;
	rejected: boolean;
	value: U | undefined;
	reason: Error | undefined;
	status: PromiseStatus;
}

export enum PromiseStatus {
	NotStarted = "not_started",
	Pending = "pending",
	Fulfilled = "fulfilled",
	Rejected = "rejected",
}

export const initialRequest: PromiseState<undefined> = {
	pending: false,
	fulfilled: false,
	rejected: false,
	value: undefined,
	reason: undefined,
	status: PromiseStatus.NotStarted,
};

export interface UsePromise<T extends Array<any>, U> extends PromiseState<U> {
	call: (...args: T) => Promise<U>;
}

export interface UpdateableState<T = {}> {
	state: T;
	setState: any;
}

export interface UsePromiseArguments<T extends Array<any>, U> {
	promiseFunction: (...args: T) => Promise<U>;
	updateableRequest?: UpdateableState<PromiseState<any>>;
}

export function usePromise<T extends Array<any>, U>({
	promiseFunction,
	updateableRequest: updateableRequestProp,
}: UsePromiseArguments<T, U>): UsePromise<T, U> {
	const [localRequest, setLocalRequest] = useState<PromiseState<U>>({
		...initialRequest,
	});

	// I wanted use-promise to update external once so I added this bit.
	const localUpdateableState: UpdateableState<PromiseState<U>> = {
		state: localRequest,
		setState: setLocalRequest,
	};
	const updateableRequest = updateableRequestProp || localUpdateableState;

	const updateRequest = (patchRequest: Partial<PromiseState<U>>) => {
		updateableRequest.setState({
			...updateableRequest.state,
			...patchRequest,
		});
	};

	const call = (...args: T) => {
		updateRequest({ pending: true, status: PromiseStatus.Pending });
		return promiseFunction(...args).then(
			result => {
				updateRequest({
					pending: false,
					fulfilled: true,
					rejected: false,
					value: result,
					status: PromiseStatus.Fulfilled,
				});
				return result;
			},
			error => {
				updateRequest({
					pending: false,
					fulfilled: false,
					rejected: true,
					reason: error,
					status: PromiseStatus.Rejected,
				});
				throw error;
			}
		);
	};

	return { ...updateableRequest.state, call };
}
