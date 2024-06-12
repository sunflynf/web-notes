"use strict";(self.webpackChunkmy_web_notes=self.webpackChunkmy_web_notes||[]).push([[2041],{7194:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var a=r(4848),t=r(8453);const l={description:"Tanstack tech for TABLE",tags:["JavaScript","TypeScript","React"]},o="Tanstack - React Table",s={id:"summarize/package/react/tanstack/react-table",title:"Tanstack - React Table",description:"Tanstack tech for TABLE",source:"@site/docs/summarize/package/react/tanstack/react-table.md",sourceDirName:"summarize/package/react/tanstack",slug:"/summarize/package/react/tanstack/react-table",permalink:"/web-notes/docs/summarize/package/react/tanstack/react-table",draft:!1,unlisted:!1,editUrl:"https://github.com/sunflynf/web-notes/tree/main/docs/summarize/package/react/tanstack/react-table.md",tags:[{inline:!0,label:"JavaScript",permalink:"/web-notes/docs/tags/java-script"},{inline:!0,label:"TypeScript",permalink:"/web-notes/docs/tags/type-script"},{inline:!0,label:"React",permalink:"/web-notes/docs/tags/react"}],version:"current",frontMatter:{description:"Tanstack tech for TABLE",tags:["JavaScript","TypeScript","React"]},sidebar:"documentSidebar",previous:{title:"Tanstack - React Router",permalink:"/web-notes/docs/summarize/package/react/tanstack/react-router"},next:{title:"Tanstack - React Virtual",permalink:"/web-notes/docs/summarize/package/react/tanstack/react-virtual"}},i={},c=[{value:"Quick Start",id:"quick-start",level:2},{value:"Configurations",id:"configurations",level:2},{value:"ColumnDef",id:"columndef",level:3},{value:"Table",id:"table",level:3},{value:"Column",id:"column",level:3},{value:"Header",id:"header",level:4},{value:"Row",id:"row",level:4},{value:"Cell",id:"cell",level:4},{value:"Features",id:"features",level:2},{value:"Sorting",id:"sorting",level:3},{value:"Filtering",id:"filtering",level:3},{value:"Pagination",id:"pagination",level:3},{value:"Visibility",id:"visibility",level:3},{value:"Ordering",id:"ordering",level:3},{value:"Pinning",id:"pinning",level:3},{value:"Expanding",id:"expanding",level:3},{value:"Infinite Scrolling",id:"infinite-scrolling",level:3}];function u(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"tanstack---react-table",children:"Tanstack - React Table"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"Current version: v8"}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"npm install @tanstack/react-table\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",children:"import { useReactTable } from '@tanstack/react-table';\r\n\r\nconst fallbackData = []\r\n\r\nexport default function MyComponent() {\r\n  //\u2705 GOOD: This will not cause an infinite loop of re-renders because `columns` is a stable reference\r\n  const columns = useMemo(() => [\r\n    // ...\r\n  ], []);\r\n\r\n  //\u2705 GOOD: This will not cause an infinite loop of re-renders because `data` is a stable reference\r\n  const [data, setData] = useState(() => [\r\n    // ...\r\n  ]);\r\n\r\n  // Columns and data are defined in a stable reference, will not cause infinite loop!\r\n  const table = useReactTable({\r\n    columns,\r\n    data ?? fallbackData, //also good to use a fallback array that is defined outside of the component (stable reference)\r\n  });\r\n\r\n  return <table>...</table>;\r\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"configurations",children:"Configurations"}),"\n",(0,a.jsx)(n.h3,{id:"columndef",children:"ColumnDef"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:'type TData = {} \r\n// base on current data. \r\n// Exp: User = { name: string, age: number, jobs?: string }\r\n\r\n// plain-text, should wrap by useMemo\r\ntype ColumnDef = {\r\n    id?: string, // OPTIONAL if using accessorKey or header is string\r\n    // assign accessor for sorting & filtering \r\n    accessorKey?: string,\r\n    accessorFn?: (originalRow: TData, index: number) => any,\r\n    columns?: ColumnDef<TData>[], // sub-cols\r\n    header?: string | (({ \r\n        table: Table<TData>, \r\n        header: Header<TData>, \r\n        column: Column<TData> \r\n    }) => unknown), // if not provider, header is "id" | "accessor"\r\n    footer?: string | (({ \r\n        table: Table<TData>, \r\n        header: Header<TData>, \r\n        column: Column<TData> \r\n    }) => unknown),\r\n    cell?: string | (({\r\n      table: Table<TData>,\r\n      row: Row<TData>,\r\n      column: Column<TData>,\r\n      cell: Cell<TData>,\r\n      getValue: () => any,\r\n      renderValue: () => any,\r\n    }) => unknown),\r\n    meta?: object // all value will put into column.columnDef.meta\r\n}\n'})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"Tanstack"})," introduce ",(0,a.jsx)(n.code,{children:"createColumnHelper"})," to works with core table & highest type-safety"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"// Define your row shape\r\ntype Person = {\r\n  firstName: string\r\n  lastName: string\r\n  age: number\r\n  visits: number\r\n  status: string\r\n  progress: number\r\n}\r\n\r\nconst columnHelper = createColumnHelper<Person>()\r\n\r\n// Make some columns!\r\nconst defaultColumns = [\r\n    // Display Column\r\n    columnHelper.display({\r\n        id: 'actions',\r\n        cell: props => <RowActions row={props.row} />,\r\n    }),\r\n    // Grouping Column\r\n    columnHelper.group({\r\n        header: 'Name',\r\n        columns: [\r\n            // Accessor Column\r\n            columnHelper.accessor('firstName', {\r\n                cell: info => info.getValue(),\r\n            }),\r\n            // Accessor Column\r\n            columnHelper.accessor(row => row.lastName, {\r\n                id: 'lastName',\r\n                cell: info => info.getValue(),\r\n                header: () => <span>Last Name</span>,\r\n            }),\r\n        ],\r\n    }),\r\n    // Grouping Column\r\n    columnHelper.group({\r\n        header: 'Info',\r\n        columns: [\r\n            // Accessor Column\r\n            columnHelper.accessor('age', {\r\n                header: () => 'Age',\r\n            }),\r\n            // Grouping Column\r\n            columnHelper.group({\r\n                header: 'More Info',\r\n                columns: [\r\n                    // Accessor Column\r\n                    columnHelper.accessor('visits', {\r\n                        header: () => <span>Visits</span>,\r\n                    }),\r\n                    // Accessor Column\r\n                    columnHelper.accessor('status', {\r\n                        header: 'Status',\r\n                    }),\r\n                    // Accessor Column\r\n                    columnHelper.accessor('progress', {\r\n                        header: 'Profile Progress',\r\n                    }),\r\n                ],\r\n            }),\r\n        ],\r\n    }),\r\n]\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-js",children:"[\r\n    columnHelper.accessor('dob'),\r\n    columnHelper.accessor('name.first', {\r\n        id: 'firstName'\r\n    }),\r\n    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {\r\n        id: 'fullName',\r\n    })\r\n]\r\n\r\n// OR\r\n\r\n[\r\n    {\r\n        accessorKey: 'dob',\r\n    },\r\n    {\r\n        accessorKey: 'name.first',\r\n        id: 'firstName'\r\n    },\r\n    {\r\n        id: 'fullName',\r\n        accessorFn: row => `${row.firstName} ${row.lastName}`,\r\n    }\r\n]\n"})}),"\n",(0,a.jsx)(n.h3,{id:"table",children:"Table"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type TableState = VisibilityTableState &\r\n  ColumnOrderTableState &\r\n  ColumnPinningTableState &\r\n  FiltersTableState &\r\n  SortingTableState &\r\n  ExpandedTableState &\r\n  GroupingTableState &\r\n  ColumnSizingTableState &\r\n  PaginationTableState &\r\n  RowSelectionTableState;\r\n\r\ntype PartialState = Partial<TableState>;\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type Updater<T> = T | (old: T) => T;\r\n\r\ntype useReactTable = <TData extends AnyData>({\r\n    data: TData[],\r\n    columns: ColumnDef<TData>[],\r\n    defaultColumn?: Partial<ColumnDef<TData>>, // show some cols before render initial\r\n    autoResetAll?: boolean,\r\n    initialState?: PartialState,\r\n    state?: PartialState,\r\n    onStateChange: (updater: Updater<TableState>) => void, // setTableState\r\n    meta?: object, // table.options.meta\r\n    getCoreRowModel: (table: Table<TData>) => () => RowModel<TData>,\r\n    getSubRow?: (originalRow: TData, index: number) => undefined | TData[],\r\n    getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string\r\n}) => Table<TData>\r\n// some development props ignore. \r\n// Full list here: https://tanstack.com/table/v8/docs/api/core/table\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type Table<T> = {\r\n    initialState: TableState,\r\n    reset: () => void, // tableState -> initialState\r\n    getState: () => TableState,\r\n    setState: (updater: Updater<TableState>) => void,\r\n    getCoreRowModel: () => {\r\n        rows: Row<TData>[],\r\n        flatRows: Row<TData>[],\r\n        rowsById: Record<string, Row<TData>>,\r\n    },\r\n    getRowModel: () => {\r\n        rows: Row<TData>[],\r\n        flatRows: Row<TData>[],\r\n        rowsById: Record<string, Row<TData>>,\r\n    }, // final model after all features applied\r\n    getAllColumns: () => Column<TData>[],\r\n    getAllFlatColumns: () => Column<TData>[], // flatten all sub-cols\r\n    getAllLeafColumns: () => Column<TData>[], // omit all parent cols\r\n    getColumn: (id: string) => Column<TData> | undefined,\r\n    getHeaderGroups: () => HeaderGroups<TData>[],\r\n    getFooterGroups: () => HeaderGroups<TData>[],\r\n    getFlatHeader: () => Header<TData>[], // flatten all sub-headers\r\n    getLeafHeader: () => Header<TData>[], // omit all parent headers\r\n    // get \r\n    // pinning? + <Left|Center|Right>\r\n    // hasSubHeaders? + <Flat|Leaf> >> () => Header<TData>[]  \r\n    // + <Header|Footer>\r\n    getLeftHeaderGroups: () => HeaderGroups<TData>[],\r\n    getCenterHeaderGroups: () => HeaderGroups<TData>[],\r\n    getRightHeaderGroups: () => HeaderGroups<TData>[]\r\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"column",children:"Column"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type Column = {\r\n    id: string,\r\n    depth: number, // group\r\n    accessorFn?: (originalRow: TData, index: number) => any,\r\n    columnDef: ColumnDef<TData>, // current col\r\n    columns: ColumnDef<TData>[], // all cols\r\n    parent?: Column<TData>,\r\n    getFlatColumns: () => Column<TData>[],\r\n    getLeafColumns: () => Column<TData>[],\r\n}\n"})}),"\n",(0,a.jsx)(n.h4,{id:"header",children:"Header"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type Header = {\r\n    id: string, \r\n    index: number,\r\n    depth: number,\r\n    column: Column<TData>,\r\n    headerGroup: HeaderGroup<TData>,\r\n    subHeaders: Header<TData>[],\r\n    colSpan: number,\r\n    rowSpan: number,\r\n    getLeafHeaders: () => Header<TData>[],\r\n    isPlaceholder: boolean,\r\n    placeholderId?: string,\r\n    getContext: () => {\r\n        table: Table<TData>,\r\n        header: Header<TData, TValue>,\r\n        column: Column<TData, TValue>,\r\n    }, // flexRender(header.column.columnDef.header, header.getContext())\r\n}\r\n\r\ntype HeaderGroup = {\r\n    id: string,\r\n    depth: number,\r\n    headers: Header<TData>[]\r\n}\n"})}),"\n",(0,a.jsx)(n.h4,{id:"row",children:"Row"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type Row = {\r\n    id: string,\r\n    depth: number,\r\n    index: number,\r\n    original: TData,\r\n    parentId?: string,\r\n    getValue: (columnId: string) => TValue,\r\n    getUniqueValues: (columnId: string) => TValue[], // if that col is arr\r\n    renderValue: (columnId: string) => TValue,\r\n    getAllCells: () => Cell<TData>[],\r\n}\r\n// View more props to handle subRows \r\n// https://tanstack.com/table/v8/docs/api/core/row\n"})}),"\n",(0,a.jsx)(n.h4,{id:"cell",children:"Cell"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"type Cell = {\r\n    id: string,\r\n    column: Column<TData, TValue>\r\n    row: Row<TData>\r\n    getValue: () => TTValue\r\n    renderValue: () => TTValue | null,\r\n    getContext: () => {\r\n        table: Table<TData>\r\n        column: Column<TData, TValue>\r\n        row: Row<TData>\r\n        cell: Cell<TData, TValue>\r\n        getValue: <TTValue = TValue,>() => TTValue\r\n        renderValue: <TTValue = TValue,>() => TTValue | null\r\n    } // flexRender(cell.column.columnDef.cell, cell.getContext())\r\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,a.jsx)(n.h3,{id:"sorting",children:"Sorting"}),"\n",(0,a.jsx)(n.h3,{id:"filtering",children:"Filtering"}),"\n",(0,a.jsx)(n.h3,{id:"pagination",children:"Pagination"}),"\n",(0,a.jsx)(n.h3,{id:"visibility",children:"Visibility"}),"\n",(0,a.jsx)(n.h3,{id:"ordering",children:"Ordering"}),"\n",(0,a.jsx)(n.h3,{id:"pinning",children:"Pinning"}),"\n",(0,a.jsx)(n.h3,{id:"expanding",children:"Expanding"}),"\n",(0,a.jsx)(n.h3,{id:"infinite-scrolling",children:"Infinite Scrolling"})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>s});var a=r(6540);const t={},l=a.createContext(t);function o(e){const n=a.useContext(l);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),a.createElement(l.Provider,{value:n},e.children)}}}]);