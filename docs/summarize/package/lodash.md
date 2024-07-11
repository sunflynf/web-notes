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
type identity<T> = string | (val: T) => any;
type comparator<T> = (val1: T, val2: T) => boolean;
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

fill(arr | Array(len), value, start?, end?); 

flatten(arr) => newArr;
flattenDeep(arr) => newArr; // destructure all nested arrays
flattenDepth(arr, depth: number) => newArr;

// union, xor
intersection(arr1, arr2) => newArr;
intersectionBy(arr1, arr2, identity) => newArr; // get data [and convert] then compare
intersectionWith(arr1, arr2, comparator) => newArr; // compare and push to result

uniq(arr) => newArr;
uniqBy(arr, identity) => newArr;
uniqWith(arr, comparator) => newArr;

// use pullAll or pullAllBy of pullAllWith if need
pull(arr, ...any); 
remove(arr, identity) => removeItems: any[]; // mutates root array  
without(arr, value: any[]) => newArr;

sortBy(arr, ...identity) => newArr; 

// features
sample(arr: T[]) => T
sampleSize(arr: T[], size: number) => T[]
shuffle(arr: T[]) => newArr: T[]
```

## Objects - Array

```ts
every(arr, identity) => boolean; // all true
some(arr, identity) => boolean; // any true

forEachRight(arr, identity); // forEach but right to left
countBy(arr, identity) => object; // _.countBy([6.1, 4.2, 6.3], Math.floor) => { '4': 1, '6': 2 }
groupBy(arr, identity) => object; // _.countBy([6.1, 4.2, 6.3], Math.floor) => { '4': [4.2], '6': [6.1, 6.3] }
// filter counter
reject(arr, identity) => newArr; // opposite of filter

clone(T) => T; // based on structuredClone, but properties like object or array has same address
cloneDeep(T) => T; // absolutely difference
```

## Object - Utils

```ts
defaults(...T) => object; // assign multiple objects. Condition: if key has value, it not change
defaultsDeep(...T) => object; // assign deeper to object & array

keys(obj) => k[]
values(obj) => v[]

mapKeys(obj, (v, k, obj) => newKey); 
// mapKeys({ a: 1, b: 2 }, (v, k) => k + v) 
// => { 'a1': 1, 'b2': 2 } 
mapValues(obj, (v, k, obj) => newVal); 
// mapValues({ a: 1, b: 2 }, (v, k) => k + v) 
// => { a: 'a1', b: 'b2' }

// user = { pet: [ { name: { firstName: '', lastName: '' } } ] }
// path: 
// - string | 'pet[0].name.firstName'
// - string[] | ['pet', 0, 'name', 'firstName']
at(obj, path[]) => [];
has(obj, path) => boolean; // check if path existed
get(obj, path, defaultValue?) => any; // return value of defaultValue if undefined
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
defaultTo(value, defaultValue); // return defaultValue if (!value is true)
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
