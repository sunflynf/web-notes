---
description: Objects & Arrays handler library
tags:
    - Library
    - Extensions
    - JavaScript
---

# Lodash

- This document just show famous features
- Full docs [here](https://lodash.com/docs)

```ts
import _ from 'lodash'; // common
import { func } from 'lodash'; // directly

// Using
_.func([], {});
```

```ts
// TYPE
type arr<T> = T[];
type newArr<T> = T[];
type identity<T> = string | (T) => any;
```

## Math

```ts
minBy(arr, identity?) => any;
maxBy(arr, identity?) => any;

// mean & sum
mean(arr) => (sum(arr) / arr.length);

// meanBy & sumBy
meanBy(arr, identity) => any; // specific key

// start default is 0
// float default is false
// _.random(5) -> number between 0 and 5 
random(start?: number, end: number, float?: boolean) => number[]; 
```

## Array

Base on Array methods: join, reverse

```ts
concat(arr[]) => newArr;

indexOf(arr, value: any, start?: number) => number | -1;
find(arr, identity?, fromIndex?: number) => any;

filter(arr, identity?) => newArr;
map(arr, identity) => newArr; // _.map([{value: 1, label: 'ok'}], 'label') => ['ok']
slice(arr, start?: number, end?: number) => newArr;
```

Features from **lodash**

```ts
// remove false, null, 0, "", undefined, NaN
// [0, 1, false, 2, '', 3] -> [1, 2, 3]
compact(arr) => newArr;

fill();

flatten();
flattenDeep();

intersection();
intersectionBy();
intersectionWith();
union();
xor();

uniq();
uniqBy();

pullAll();
without();

sortBy()

// features
sample()
sampleSize()
shuffle()
```

## Objects - Array

```ts
every()
some()

countBy()
forEach()
groupBy()
// filter counter
reject()

clone()
cloneDeep()
```

## Object - Utils

```ts
defaults()

keys()
values()

mapKeys()
mapValues()

at()
has()
get()
update()
unset()

merge()

pick()
pickBy()
omit()
omitBy()
```

## String

```ts
camelCase()
kebabCase()
snakeCase()
startCase()

deburr()
escapse()
escapseRegExp()
unescapse()

repeat()

truncate()

template()
```

### Features

```ts
debounce()
delay()
throttle()

defer()
once()
wrap()

isEmpty();
isEquals();
// null or undefined
isNil();

toArray()
```

## Chain Sequences

```ts
// Lodash wrap and works like builder
_(value);
_.chain(value);

// using
_(value).method1().method2((o) => o.abc).method3().value();
```

## Util

```ts
defaultTo()
uniqueId()

flow()

cond()
iteratee()

isMatch()
matches()

range()
times()
```

```ts
mixin()

runInContext()
```
