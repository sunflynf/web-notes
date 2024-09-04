---
description: Systax and special display in Github.
tags:
    - Git
    - Github
    - Markdown
---

# Markdown syntax

## Header

```txt
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

## Plaintext

```txt
*italic* | _italic_
**bold** | __bold__
__*bold and italic*__
~~strikethrough~~
:smile: <- Emoji
```

## List

```txt
- item 1
  - item 1.1
  - item 1.2
- item 2

1. item 1
2. item 2

- [ ] Task 1
- [x] Task 2
```

## Link

```txt
Inline link: [Link Text](http://www.example.com)
Reference link: [Link Text][1]` and then `[1]: http://www.example.com
Image: ![Alt Text](http://www.example.com/image.jpg)
```

## Blockquote

```txt
> This is a quote
>
```

## Codeblocks

```txt
Code inline: `code`
Code block: (replace ' to `)
'''file-type
// code
'''
```

## Table

```txt
| Header 1 | Header 2 |
| --- | --- |
| Cell 1 | Cell 2 |
```

## Footnote

```txt
Here is a footnote[^1]
---
[^1]: This is the footnote.
```

Example for footnote, maybe show lastest of this page![^1]
[^1]: Footnote here!

## Diff file

```diff
-const firstName = "Fi";
+const firstName = "Phi";
// some comment here
```

## Block information

```md title="README.md"
<!-- Works on Github only -->
> [!Note]
>
> This is note

> [!Tip]
>
> Tips for nothing

> [!Warning]
>
> Bananaaaaaaaaaaaaaaaaa

> [!Caution]
>
> Just don't
```

For **Docusaurus**

:::note

Attention!

:::

:::info

Look over here!

:::

:::tip

Here your advise!

:::

:::warning

I remind you

:::

:::caution

Remember

:::

:::danger

Just don't

:::

## Expanding

<details>
  <summary>Click to expand!</summary>

  ~This is content inside~

  Yes, docs can **expand**
</details>
