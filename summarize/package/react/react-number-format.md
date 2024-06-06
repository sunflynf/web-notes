# React Number Format

> Solution for `onChange` without reset input's selectionIndex

```jsx
import { NumericFormat, PatternFormat } from 'react-number-format'

// NumbericFormat -> currency
// PatternFormat -> card numbers & phone
```

## Common Props

| Props | Value | Desc |
| --- | --- | --- |
| `getInputRef` | ref | control input's ref |
| `defaultValue` | string \| number |  |
| `type` | "text" \| "tel" \| "pasword" |  |
| `value` | string \| number |  |
| `displayType` | 'input' \| 'text' | OPTIONAL |
| `onValueChange` | `({ value, floatValue, formattedValue }, { event, source: "prop" \| "event" }) => void` |  |
| `` |  |  |
| `` |  |  |
| `` |  |  |

## NumericFormat

| Props | Value | Desc |
| --- | --- | --- |
| `isAllowed` | `({ value, floatValue, formattedValue }) => boolean` | Validate input value before change (stop if **false**) |
| `allowedNegative` | boolean |  |
| `allowedDecimalSeparators` | string[] | OPTIONAL: Press key in list turn to separator character |
| `decimalScale` | number | limits the number of digits after decimal point |
| `decimalSeparator` | string |  |
| `fixedDecimalScale` | boolean | Exp: `decimalScale={3}` turn 1.1 -> 1.100 |
| `customInput` | Component | Exp: `Form.Control` of react-bootstrap |
| `prefix` | string | character start |
| `subfix` | string | end character |
| `thousandsSeparator` | string |  |
| `thousandsGroupStyle` | 'thousand' <br> 'lakh' (India) <br> 'wan' (China) |  |

## PatternFormat

| Props | Value | Desc |
| --- | --- | --- |
| `format` | string | Exp: "+1 (###) ###-####", value will fit all # |
| `patternChar` | string | Exp: `format="%% (%%%)" patternChar="%"` |
| `valueIsNumericString` | boolean | Input number only |
| `allowEmptyFormatting` | boolean | fit empty space with `mask` character |
| `mask` | string \| string[] |  |
