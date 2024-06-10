# Tanstack - React Query

> Current version: v5

## Quick start

```bash
npm i @tanstack/react-query
```

> Recommend for catching errors
>
> ```bash
> npm i -D @tanstack/eslint-plugin-query
> ```

```tsx
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// add-ons for checking query 
// Link: https://tanstack.com/query/latest/docs/framework/react/devtools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; 

import { getTodos, postTodo } from '../my-api'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <div>
      <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

render(<App />, document.getElementById('root'))
```

## useQuery

```js
const {
  data, // TData | undefined
  dataUpdatedAt, // number
  error, // null | TError
  errorUpdatedAt, // number
  failureCount,
  failureReason,
  fetchStatus, // fetching | paused | idle (not fetching)
  isError,
  isFetched,
  isFetchedAfterMount,
  isFetching,
  isInitialLoading,
  isLoading,
  isLoadingError,
  isPaused,
  isPending,
  isPlaceholderData,
  isRefetchError,
  isRefetching,
  isStale,
  isSuccess,
  refetch, // refetch(queryKey?) => Promise<UseQueryResult>
  status, // pending | error | success
} = useQuery(
  {
    queryKey, 
    // unknown[]. 
    // Required, query automatically update when this key change
    queryFn,
    // (context: { queryKey, signal?, meta, InfiniteQueries? }) => Promise<TData>
    // Required if QueryClient has defaultQueryFn
    // + meta: { Record<string, unknown> | undefined }
    // + InfiniteQueries: { pageParam }
    queryKeyHashFn,
    // (queryKey) => string
    enabled,
    // boolean. Set "false" to turn off automatically update
    gcTime,
    // number | Infinity (disabled)
    // Garbage collected time. Default: 1000 * 60 * 5 miliseconds
    networkMode,
    // "online" | "always" | "offlineFirst"
    initialData,
    // TData | () => TData
    // Persisted to the cache
    initialDataUpdatedAt,
    // number | (() => number | undefined)
    // If set, this value will be used as the time (in milliseconds) of when the initialData itself was last updated
    notifyOnChangeProps,
    // string[] | "all" | (() => string[] | "all")
    // If set, component will only re-render if any of the listed properties change
    placeholderData,
    // TData
    // Not persisted to the cache
    refetchInterval,
    // number | false | ((query) => number | false | undefined)
    refetchIntervalInBackground,
    // boolean
    refetchOnMount,
    // boolean | "always" | ((query) => boolean | "always")
    // - true > refetch on mount if the data is stale
    // - false > off
    refetchOnReconnect,
    // boolean | "always" | ((query) => boolean | "always")
    refetchOnWindowFocus,
    // boolean | "always" | ((query) => boolean | "always")
    retry,
    // boolean | number | (failureCount, error) => boolean
    // - true > infinite
    // - false > off
    retryOnMount, 
    // boolean
    retryDelay, 
    // number | (retryAttempt, error) => number
    select,
    // (data) => unknown
    // Choose data return, run if data changed. Should optimize with useCallback 
    staleTime,
    // number | Infinity
    // Default is 0
    structuralSharing,
    // boolean | (oldData: unknown | undefined, newData: unknown) => unknown)
    // - false > disabled
    throwOnError,
    // undefined | boolean | (error, query) => boolean
    meta,
    // Record<string, unknown>
  },
  queryClient, // OPTIONAL if components wrap by QueryClientProvider
)
```

## useQueries

```ts
const results = useQueries({
  queries: [], // UseQueryProps[]
  queryClient, // OPTIONAL
  combine // OPTIONAL. (result) => TCombinedResult
})
```

```ts
const results = useQueries({
  queries: [1, 2, 3].map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    staleTime: Infinity,
  })),
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    }
  },
})
```

## useMutation

```js
const {
  data,
  error,
  isError,
  isIdle,
  isPending,
  isPaused,
  isSuccess,
  failureCount,
  failureReason,
  mutate, 
  // mutate(variables, options?) => void
  // + options: { onError, onSettled, onSuccess }
  mutateAsync,
  // mutate(variables, options?) => Promise<TData>
  reset,
  // () => void
  // Clean multation internal state
  status,
  // idle | pending | error | success
  submittedAt,
  variables,
} = useMutation({
  mutationFn, 
  // (variables) => Promise<TData>
  // Required, but only if no default mutation func has been defined
  mutationKey,
  // unknown[]
  onMutate,
  // (variables) => Promise<TContext|void> | TContext | void
  onSuccess,
  // (data, variables, context) => Promise<unknown> | unknown
  onError,
  // (err, variables, context?) => Promise<unknown> | unknown
  onSettled,
  // (data, err, variables, context?) => Promise<unknown> | unknown
  retry,
  // boolean | number | (failCount, err) => boolean
  retryDelay,
  // number | (retryAttemp, err) => number
  scope,
  // { id: string }
  // Defaults to a unique id (so that all mutations run in parallel)
  // Mutations with the same scope id will run in serial
  gcTime,
  meta,
  networkMode,
  throwOnError,
})
```

## Features

- [queryOptions](https://tanstack.com/query/latest/docs/framework/react/reference/queryOptions)
- [useInfiniteQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useInfiniteQuery)
