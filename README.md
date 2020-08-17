# Use Promise

Use Promise is a React hook that has properties for the state of a promise.

## 🚀 Demo

(link your storybook docs, probably deployed on Netlify here)

## Getting Started

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

See the Demo above for more usage.

## 🔮 Future Development

- Add a property similar to pending that only shows after about 200ms so short requests are less jerky.

## 💻 Running Locally

Install dependencies first.

```
yarn
```

Running Storybook

```
yarn storybook
```

Running tests.

```
yarn test
```

Build the package.

```
yarn build
```

Build the package continuously.

```
yarn build-watch
```
