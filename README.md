# usePromise

A React hook that makes it easy to handle the state of promises.

[NPM Package](https://www.npmjs.com/package/@cadbox1/use-promise)

## 🚀 Demo

[Storybook demo](https://use-promise.netlify.app)


## 💻 Getting Started

```
npm install @cadbox1/use-promise
```

or

```
yarn add @cadbox1/use-promise
```

Then use it like this

```
import React, { useEffect } from "react";
import { usePromise } from "cadbox1/use-promise";

const Page = () => {
    const { pending, fulfilled, rejected, value, reason, call } = usePromise({
        promiseFunction: async () => {
            const value = await Promise.resolve(Math.random() * 10);
            return value;
        }
    });

    useEffect(() => {
        call();
    }, []);

    return <button onClick={() => call()} disabled={pending}>Current value is: {value}</button>
}
```

## API

usePromise has full typescript types.

The usePromise hook takes two arguments:
- `promiseFunction`     - a function that returns a Promise, usually an async function.
- `updateableRequest`   - an UpdateableState object that can be used to update an external state. Rarely used.

usePromise will then return an object with the following properties:
`pending`   - a boolean that is true when a the promiseFunction has been called but not resolved or rejected yet.
`rejected`  - a boolean that is true when the promise has been rejected, even when another call is pending. It will return false if another call resolves.
`fulfilled` - a boolean that is true when the promise has been resolved, even when another call is pending. It will return false if another call rejects.
`value`     - the value resolved by the promiseFunction. It is not cleared by a pending call, only by a rejection.
`reason`    - the value rejected by the promiseFunction. It is not cleared by a pending call, only by a resolution.
`status`    - an PromiseState enum consolidating the state of the request into a single value. Useful for useEffect dependencies.

It retains the resolved and rejected values while pending which works well for tables and retrying form requests.

For example, you can show a page of results in a table and show a pending state while the next page loads.

## 🔮 Future Development

- Add a property similar to pending that only shows after about 200ms so short requests are less jerky.

## 🔨 Package Development

- `yarn`                  Install dependencies
- `yarn storybook`        Develop in Storybook
- `yarn test`             Run tests
- `npm run version-minor` Deploy to npm
- `yarn clean`            Remove temporary assets

## 🔧 Tools
This package was setup with [tsdx](https://github.com/formium/tsdx).
