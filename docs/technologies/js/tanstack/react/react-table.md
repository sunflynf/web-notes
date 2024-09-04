---
description: Tanstack tech for TABLE
tags:
    - JavaScript
    - TypeScript
    - React
---

# React Table

> Current version: v8

## Quick Start

```bash
npm install @tanstack/react-table
```

```jsx
import { useReactTable } from '@tanstack/react-table';

const fallbackData = []

export default function MyComponent() {
  //✅ GOOD: This will not cause an infinite loop of re-renders because `columns` is a stable reference
  const columns = useMemo(() => [
    // ...
  ], []);

  //✅ GOOD: This will not cause an infinite loop of re-renders because `data` is a stable reference
  const [data, setData] = useState(() => [
    // ...
  ]);

  // Columns and data are defined in a stable reference, will not cause infinite loop!
  const table = useReactTable({
    columns,
    data ?? fallbackData, //also good to use a fallback array that is defined outside of the component (stable reference)
  });

  return <table>...</table>;
}
```

## Configurations

### ColumnDef

```ts
type TData = {} 
// base on current data. 
// Exp: User = { name: string, age: number, jobs?: string }

// plain-text, should wrap by useMemo
type ColumnDef = {
    id?: string, // OPTIONAL if using accessorKey or header is string
    // assign accessor for sorting & filtering 
    accessorKey?: string,
    accessorFn?: (originalRow: TData, index: number) => any,
    columns?: ColumnDef<TData>[], // sub-cols
    header?: string | (({ 
        table: Table<TData>, 
        header: Header<TData>, 
        column: Column<TData> 
    }) => unknown), // if not provider, header is "id" | "accessor"
    footer?: string | (({ 
        table: Table<TData>, 
        header: Header<TData>, 
        column: Column<TData> 
    }) => unknown),
    cell?: string | (({
      table: Table<TData>,
      row: Row<TData>,
      column: Column<TData>,
      cell: Cell<TData>,
      getValue: () => any,
      renderValue: () => any,
    }) => unknown),
    meta?: object // all value will put into column.columnDef.meta
}
```

**Tanstack** introduce `createColumnHelper` to works with core table & highest type-safety

```ts
// Define your row shape
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const columnHelper = createColumnHelper<Person>()

// Make some columns!
const defaultColumns = [
    // Display Column
    columnHelper.display({
        id: 'actions',
        cell: props => <RowActions row={props.row} />,
    }),
    // Grouping Column
    columnHelper.group({
        header: 'Name',
        columns: [
            // Accessor Column
            columnHelper.accessor('firstName', {
                cell: info => info.getValue(),
            }),
            // Accessor Column
            columnHelper.accessor(row => row.lastName, {
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
            }),
        ],
    }),
    // Grouping Column
    columnHelper.group({
        header: 'Info',
        columns: [
            // Accessor Column
            columnHelper.accessor('age', {
                header: () => 'Age',
            }),
            // Grouping Column
            columnHelper.group({
                header: 'More Info',
                columns: [
                    // Accessor Column
                    columnHelper.accessor('visits', {
                        header: () => <span>Visits</span>,
                    }),
                    // Accessor Column
                    columnHelper.accessor('status', {
                        header: 'Status',
                    }),
                    // Accessor Column
                    columnHelper.accessor('progress', {
                        header: 'Profile Progress',
                    }),
                ],
            }),
        ],
    }),
]
```

```js
[
    columnHelper.accessor('dob'),
    columnHelper.accessor('name.first', {
        id: 'firstName'
    }),
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
        id: 'fullName',
    })
]

// OR

[
    {
        accessorKey: 'dob',
    },
    {
        accessorKey: 'name.first',
        id: 'firstName'
    },
    {
        id: 'fullName',
        accessorFn: row => `${row.firstName} ${row.lastName}`,
    }
]
```

### Table

```ts
type TableState = VisibilityTableState &
  ColumnOrderTableState &
  ColumnPinningTableState &
  FiltersTableState &
  SortingTableState &
  ExpandedTableState &
  GroupingTableState &
  ColumnSizingTableState &
  PaginationTableState &
  RowSelectionTableState;

type PartialState = Partial<TableState>;
```

```ts
type Updater<T> = T | (old: T) => T;

type useReactTable = <TData extends AnyData>({
    data: TData[],
    columns: ColumnDef<TData>[],
    defaultColumn?: Partial<ColumnDef<TData>>, // show some cols before render initial
    autoResetAll?: boolean,
    initialState?: PartialState,
    state?: PartialState,
    onStateChange: (updater: Updater<TableState>) => void, // setTableState
    meta?: object, // table.options.meta
    getCoreRowModel: (table: Table<TData>) => () => RowModel<TData>,
    getSubRow?: (originalRow: TData, index: number) => undefined | TData[],
    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string
}) => Table<TData>
// some development props ignore. 
// Full list here: https://tanstack.com/table/v8/docs/api/core/table
```

```ts
type Table<T> = {
    initialState: TableState,
    reset: () => void, // tableState -> initialState
    getState: () => TableState,
    setState: (updater: Updater<TableState>) => void,
    getCoreRowModel: () => {
        rows: Row<TData>[],
        flatRows: Row<TData>[],
        rowsById: Record<string, Row<TData>>,
    },
    getRowModel: () => {
        rows: Row<TData>[],
        flatRows: Row<TData>[],
        rowsById: Record<string, Row<TData>>,
    }, // final model after all features applied
    getAllColumns: () => Column<TData>[],
    getAllFlatColumns: () => Column<TData>[], // flatten all sub-cols
    getAllLeafColumns: () => Column<TData>[], // omit all parent cols
    getColumn: (id: string) => Column<TData> | undefined,
    getHeaderGroups: () => HeaderGroups<TData>[],
    getFooterGroups: () => HeaderGroups<TData>[],
    getFlatHeader: () => Header<TData>[], // flatten all sub-headers
    getLeafHeader: () => Header<TData>[], // omit all parent headers
    // get 
    // pinning? + <Left|Center|Right>
    // hasSubHeaders? + <Flat|Leaf> >> () => Header<TData>[]  
    // + <Header|Footer>
    getLeftHeaderGroups: () => HeaderGroups<TData>[],
    getCenterHeaderGroups: () => HeaderGroups<TData>[],
    getRightHeaderGroups: () => HeaderGroups<TData>[]
}
```

### Column

```ts
type Column = {
    id: string,
    depth: number, // group
    accessorFn?: (originalRow: TData, index: number) => any,
    columnDef: ColumnDef<TData>, // current col
    columns: ColumnDef<TData>[], // all cols
    parent?: Column<TData>,
    getFlatColumns: () => Column<TData>[],
    getLeafColumns: () => Column<TData>[],
}
```

#### Header

```ts
type Header = {
    id: string, 
    index: number,
    depth: number,
    column: Column<TData>,
    headerGroup: HeaderGroup<TData>,
    subHeaders: Header<TData>[],
    colSpan: number,
    rowSpan: number,
    getLeafHeaders: () => Header<TData>[],
    isPlaceholder: boolean,
    placeholderId?: string,
    getContext: () => {
        table: Table<TData>,
        header: Header<TData, TValue>,
        column: Column<TData, TValue>,
    }, // flexRender(header.column.columnDef.header, header.getContext())
}

type HeaderGroup = {
    id: string,
    depth: number,
    headers: Header<TData>[]
}
```

#### Row

```ts
type Row = {
    id: string,
    depth: number,
    index: number,
    original: TData,
    parentId?: string,
    getValue: (columnId: string) => TValue,
    getUniqueValues: (columnId: string) => TValue[], // if that col is arr
    renderValue: (columnId: string) => TValue,
    getAllCells: () => Cell<TData>[],
}
// View more props to handle subRows 
// https://tanstack.com/table/v8/docs/api/core/row
```

#### Cell

```ts
type Cell = {
    id: string,
    column: Column<TData, TValue>
    row: Row<TData>
    getValue: () => TTValue
    renderValue: () => TTValue | null,
    getContext: () => {
        table: Table<TData>
        column: Column<TData, TValue>
        row: Row<TData>
        cell: Cell<TData, TValue>
        getValue: <TTValue = TValue,>() => TTValue
        renderValue: <TTValue = TValue,>() => TTValue | null
    } // flexRender(cell.column.columnDef.cell, cell.getContext())
}
```

## Features

### Sorting

### Filtering

### Pagination

### Visibility

### Ordering

### Pinning

### Expanding

### Infinite Scrolling
