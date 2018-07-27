# reproducible-random

Thin wrapper around `random-js` (https://github.com/ckknight/random-js) to provide reproducibility.

The intended use-case is within test suites which generate random data for fuzzing -- using this library will allow you to run the exact same test suite with the same fuzzed data, which should help with debugging flickering tests.

## Usage

In Typescript/ES6:

```
import { random } from 'reproducible-random'

const foo = random.integer(0, 100)
const bar = random.bool()
console.log({
    foo,
    bar,
})
```

When run, this will output a line of the form `RANDOM_SEED=123456789` on the console, which can then be passed back in as an environment variable for reproducing the same random data.

```
> tsc file.ts
> node file.js
RANDOM_SEED=2892099504791794
{ foo: 41, bar: false }
```

```
> RANDOM_SEED=2892099504791794 node file.js
RANDOM_SEED=2892099504791794
{ foo: 41, bar: false }
```
