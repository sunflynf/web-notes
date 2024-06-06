# React Number Format

> Solution for `onChange` without reset input's selectionIndex

## Common Props

| Props | Value | Desc |
| --- | --- | --- |
| `getInputRef` | ref | control input's ref |
| `defaultValue` | string \| number |  |
| `value` | string \| number |  |
| `displayType` | 'input' \| 'text' | OPTIONAL |
| `` |  |  |
| `` |  |  |
| `` |  |  |

## NumericFormat

```jsx
import { NumericFormat } from 'react-number-format';

<NumericFormat
  getInputRef={ref}
  {/* for using ref */}
  defaultValue
  {/* number | string */}
  value
  {/* number | string */}
  displayType
  {/* OPTIONAL: 'input' | 'text' */}
  isAllowed
  {/* OPTIONAL: (currentValue) => boolean. Validate input value before change (stop if false) */}
  
  
  
  
  
  
/>
```

## PatternFormat

```jsx
import { PatternFormat } from 'react-number-format';

<PatternFormat
  getInputRef={ref}
  defaultValue
  value
  displayType
  format
  {/* string - Exp: "+1 (###) ###-####", value will fit all # */}  
  {/*  */}  
  
  
  
  
  
/>
```
