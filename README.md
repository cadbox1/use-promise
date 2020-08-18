# Use Promise

Use Promise is a React hook that has properties for the state of a promise.

## 🚀 Demo

Storybook demo


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

## 🔮 Future Development

- Add a property similar to pending that only shows after about 200ms so short requests are less jerky.

## 🔨 Package Development

- `yarn`                  Install dependencies
- `yarn storybook`        Develop in Storybook
- `yarn test`             Run tests
- `npm run version-minor` Deploy to npm
- `yarn clean`            Remove temporary assets

## 🔧 Tools
Package setup with [tsdx](https://github.com/formium/tsdx)
