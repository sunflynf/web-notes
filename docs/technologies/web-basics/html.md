---
description: Hyper-Text Markup Languages
tags:
  - Frontend
---

# HTML

- Describes the structure of a Web page
- **HTML elements** tell the browser how to display the content
- Version (2023): HTML5 - HTML5.2

## Basic

### Page Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- contains metadata tag -->
    <title>Page title</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <!-- main content -->
    <h1 id="demo">Header</h1>
    <p>Some paragraph.</p>
  </body>
  <script>
    <!-- This is comment in HTML -->
    <!-- This tag use to add JavaScript - making dynamic web pages -->
    document.getElementById("demo").innerHTML = "This is Heading";
  </script>
  <noscript>Sorry, your browser does not support JavaScript!</noscript>
</html>
```

### Documents + Element

:::note

- HTML is **NOT Case Sensitive**
- `<tagname>Content or nest HTML element here!</tagname>`

:::

| Tag name               | Description                                                                                  | Example                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<!DOCTYPE html>`      | Declaration represents the document type. Helps browsers to display web pages correctly.     |                                                                                                                                 |
| **html**               | The root element and it defines the whole HTML document.                                     | `<html lang="en"><head></head><body></body></html>`                                                                             |
| **head**               | All configs for web page here!                                                               | `<head></head>`                                                                                                                 |
| link                   | Defines a link between a document and an external resource                                   | `<link rel="stylesheet" href="./styles.css">`                                                                                   |
| **body**               | Defines the document's body.                                                                 | `<body></body>`                                                                                                                 |
| h1, h2, h3, h4, h5, h6 | Heading from **most important** to _less important_                                          | ` <h1>First</h1>``<h2>Second</h2> `...`<h6>Last</h6>`                                                                           |
| p                      | Paragraph - automatically remove any extra spaces                                            | `<p>Some text</p>`                                                                                                              |
| pre                    | Defines preformatted text - Good for multiple lines show                                     |                                                                                                                                 |
| a                      | Use for link - redirect to link put in `href` when user click                                | `<a href="https://trustmebro.ccl" title="Click here!">My Facebook</a>`                                                          |
| img                    | Image show`src` for image link`alt` for description`height` and `width`can control[[#Image]] | `<img src="image-src.jpg" alt="Image desc" height="200" width="400" />`                                                         |
| br                     | A line break                                                                                 | `<br/>`                                                                                                                         |
| hr                     | A thematic break - display as **a horizontal rule**                                          | `<hr/>`                                                                                                                         |
| b, strong              | **Bold text, Important Text**                                                                | `<strong>Important</strong>`                                                                                                    |
| i, em                  | _Italic text, Emphasized text_                                                               | `<em>Emphasized</em>`                                                                                                           |
| mark                   | highlight text                                                                               | `<mark>Mark text</mark>`                                                                                                        |
| small                  | decrease text's font size                                                                    | `<small>Smaller text</small>`                                                                                                   |
| del                    | mark text with middle line                                                                   | `<del>Delete text</del>`                                                                                                        |
| ins                    | text with underline to mark                                                                  | `<ins>Insert text</ins>`                                                                                                        |
| sub                    | small text lower than others                                                                 | `<sub>2</sub>`                                                                                                                  |
| sup                    | small text higher then others                                                                | `<sup>x</sup>`                                                                                                                  |
| div                    | Defines a section in a document (block-level)                                                | [[#Block & Inline Elements]]                                                                                                    |
| span                   | Defines a section in a document (inline)                                                     | [[#Block & Inline Elements]]                                                                                                    |
| iframe                 | Used to display a web page within a web page.                                                | `<iframe src="https://www.w3schools.com/html/html_iframe.asp" style="height:200px;width:100%" title="Iframe Example"></iframe>` |

:::info ATTRIBUTES

- All HTML elements can have **attributes**
- Attributes provide **additional information** about elements
- Attributes are always specified in **the start tag**
- Attributes usually come in name/value pairs like: **name="value"**
- `id` attribute is used to specify **a unique** id for an HTML element.
- `class` attribute is used to specify a class for an HTML element, multiple HTML elements can share the same class.

:::

| Not famous tag | Description                                                                                           | Example                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| blockquote     | Defines a section that is quoted from another source.                                                 |                                                                    |
| q              | Defines a short quotation                                                                             | `This is an <q>Asian</q> boi.`                                     |
| abbr           | Marking abbreviations can give useful information to browsers, translation systems and search-engines | `<abbr title="Vo Nhat Phi">VNP</abbr>`                             |
| address        | Defines the contact information for the author/owner of a document or an article.                     |                                                                    |
| bdo            |                                                                                                       | `<bdo dir="rtl">Used to override the current text direction</bdo>` |
| code           | A piece of computer code                                                                              | `<code>var x = 1;</code>`                                          |
| samp           | Sample output from a computer program                                                                 |                                                                    |
| var            | A variable in programming or in a mathematical expression                                             |                                                                    |

### Link

The `target` attribute specifies where to open the linked document. It can have one of the following values:

- `_self` - Default. Opens the document in the same window/tab as it was clicked
- `_blank` - Opens the document in a new window or tab
- `_parent` - Opens the document in the parent frame
- `_top` - Opens the document in the full body of the window

:::info Special

Link to an Email Address - `<a href="mailto:someone@example.com">Send email</a>`

Button as a Link - `<button onclick="document.location='index.html'">HTML Tutorial</button>`

:::

:::note Making bookmarks

1. Use `id` to create bookmark: `<h2 id="C4">Chapter 4</h2>`
2. Put to `href` with ==#==: `<a href="#C4">Jump to Chapter 4</a>`

:::

### Image

| Abbreviation | File Format                           | File Extension                   |
| ------------ | ------------------------------------- | -------------------------------- |
| APNG         | Animated Portable Network Graphics    | .apng                            |
| GIF          | Graphics Interchange Format           | .gif                             |
| ICO          | Microsoft Icon                        | .ico, .cur                       |
| JPEG         | Joint Photographic Expert Group image | .jpg, .jpeg, .jfif, .pjpeg, .pjp |
| PNG          | Portable Network Graphics             | .png                             |
| SVG          | Scalable Vector Graphics              | .svg                             |

```html
<img src="workplace.jpg" alt="Workplace" usemap="#workmap" />
<map name="workmap">
    <area
    shape="rect"
    coords="34,44,270,350"
    alt="Computer"
    href="computer.htm"
  />
    <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm" />
    <area shape="circle" coords="337,300,44" alt="Coffee" href="coffee.htm" />
</map>
```

**picture** - gives web developers more flexibility in specifying image resources.

```html
<picture>
    
  <source media="(min-width: 650px)" srcset="img_food.jpg" />
    
  <source media="(min-width: 465px)" srcset="img_car.jpg" />
    <img src="img_girl.jpg" />
</picture>
```

### Favicon + Title

- [Custom Favicon tool](https://www.favicon.cc/)
- Format Support: ICO, PNG, GIF, JPEG, SVG

```html
<head>
    
  <title>My Page Title</title>
    
  <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
</head>
```

### Table

| head 1     | head 2     | head 3     |
| ---------- | ---------- | ---------- |
| body 1 1   | body 2 1   | body 3 1   |
| body 1 2   | body 2 2   | body 3 2   |
| body 1 ... | body 2 ... | body 3 ... |

```html
<table>
  <caption>
    Example table
  </caption>
  <thead>
    <tr>
      <th>head 1</th>
      <th>head 2</th>
      <th>head 3</th>
    </tr>
    <!-- other headers -->
  </thead>
  <tbody>
    <tr>
      <td>body 1 1</td>
      <td>body 2 1</td>
      <td>body 3 1</td>
    </tr>
    <!-- other contents -->
  </tbody>
  <tfoot>
    <!-- use tr td like body -->
  </tfoot>
</table>
```

:::info Table's tag

- `thead`, `tbody` and `tfoot` just use for group content. It can remove for special case (like vertical table, ...)
- `caption` use to name + description table (optional)
- `th` & `td` can use `colspan` to group **columns** and `rowspan` to group **rows**
- (2024) `colgroup` and `col` currently not famous, so avoid using them

:::

### Lists

- **Unordered**: ul > li \* n
- **Ordered**: ol > li \* n
  - Attribute
    - type="1" (default)
    - start="0"
- Description: dl > dt ~ dd

:::tip Ordered Type

- `1 -> 1 2 3`
- `A -> A B C`
- `a -> a b c`
- `I -> I II III IV`
- `i -> i ii iii iv`
:::

### Block & Inline Elements

- Block-level element always starts on a new line & takes up the full width available.

  ```html
  <address>
  <article>
  <aside>
  <blockquote>
  <canvas>
  <dd>
  <div>
  <dl>
  <dt>
  <fieldset>
  <figcaption>
  <figure>
  <footer>
  <form>
  <h1>-<h6>
  <header>
  <hr>
  <li>
  <main>
  <nav>
  <noscript>
  <ol>
  <p>
  <pre>
  <section>
  <table>
  <tfoot>
  <ul>
  <video>
  ```

- Inline-level element does not start on a new line & only takes up as much width as necessary.

  ```html
  <a>
  <abbr>
  <b>
  <bdo>
  <br>
  <button>
  <cite>
  <code>
  <dfn>
  <em>
  <i>
  <img>
  <input>
  <kbd>
  <label>
  <map>
  <object>
  <output>
  <q>
  <samp>
  <script></script>
  <select>
  <small>
  <span>
  <strong>
  <sub>
  <sup>
  <textarea>
  <time>
  <var>
  ```

### The Head element

The HTML `<head>` element is a container for the following elements: `<title>`, `<style>`, `<meta>`, `<link>`, `<script>`, and `<base>`

- `title` is **required** and it defines **_the title of the document_**.
- `style` is used to define style information **_for a single document_**.
- `meta` is typically used to specify the character set, page description, keywords, author of the document, and viewport settings.

  ```html
  <meta charset="UTF-8">
  <!-- good for search engines -->
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="description" content="Free Web tutorials">
  <meta name="author" content="John Doe">
  <!-- auto refresh -->
  <meta http-equiv="refresh" content="30"> 
  <!-- Setting the viewport (fit size on multiple devices). -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  ```

- `link` **tag** is most often used to link to external style sheets.
- `script` is used to define client-side [[JavaScript]].
- `base` specifies the base URL and/or target for all relative URLs in a page.

### HTML Semantic Elements

| Tag        | Description                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------- |
| article    | Defines independent, self-contained content                                                 |
| aside      | Defines content aside from the page content                                                 |
| figcaption | Defines a caption for a `<figure>` element                                                  |
| figure     | Specifies self-contained content, like illustrations, diagrams, photos, code listings, etc. |
| footer     | Defines a footer for a document or section                                                  |
| header     | Specifies a header for a document or section                                                |
| main       | Specifies the main content of a document                                                    |
| nav        | Defines navigation links                                                                    |
| section    | Defines a section in a document                                                             |
| details    | Defines additional details that the user can view or hide                                   |
| summary    | Defines a visible heading for a `details` element                                           |
| time       | Defines a date/time                                                                         |

## Form

Collect user input and sent to a server for processing.

```html
<form>
  <!-- Other form element here! -->
</form>
```

### Input tag

:::info

- Default: `<input type="text" />`
- Common attributes: `id`, `class`, `title`, `value`, `name` (add to url params), `hidden`, `disabled`, `required`, `form` - a part of specifies form
- Input with text (or number) attributes: `autofocus`, `autocomplete`, `readonly`, `size` - width, `maxlength`, `placeholder`, `pattern` - RegEx
- Input type _submit_ & _image_: `formaction`, `formenctype`, `formmethod`, `formtarget`
- Functions: `onclick`, `ondoubleclick`, `onblur`, `onfocus`

:::

| Type            | Special Atrributes                    |
| --------------- | ------------------------------------- |
| button          | value - text inside                   |
| submit          |                                       |
| reset           |                                       |
| color           |                                       |
| checkbox        | checked                               |
| radio           | checked                               |
| range           |                                       |
| file            | multiple                              |
| number          | min, max, step                        |
| email           |                                       |
| password        |                                       |
| search          |                                       |
| tel             |                                       |
| text            |                                       |
| url             |                                       |
| month           | min, max                              |
| week            | min, max                              |
| time            | min, max                              |
| date            | min, max                              |
| datetime-local  | min, max                              |
| hidden          |                                       |
| image           | src, height, width                    |

:::warning Input Form special attribute

- `formaction` - run override current `action`
- `formenctype` - submit with encode form data
- `formmethod` - submit override current `method`
- `formtarget` - override `target`

:::

### Label tag

- Useful for screen-reader users
- Helps users who have difficulty clicking on very small regions (such as radio buttons or checkboxes) - focus on `for` and `id`

```html
<label for="fname">First name:</label><br />
<input type="text" id="fname" name="fname" value="John" />
```

### Form attributes

| Attributes    | Description                                                                                                               | Example                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| action        | Defines the action to be performed when the form is submitted                                                             | `action="/login.asp"`                                       |
| target        | `_blank` - new window / tab `_self` - current window `_parent` - parent frame `_top` - full body of window                | `target="_blank"`                                           |
| method        | `GET` (default), `POST`, `PUT`, `PATCH`, `DELETE`                                                                         | `method="get"`                                              |
| autocomplete  | Allow browser auto fill - default is `on`                                                                                 | `autocomplete="off"`                                        |
| novalidate    | Specifies that the form-data (input) should not be validated when submitted                                               |                                                             |
| rel           | Specifies the relationship between a linked resource and the current document                                             | [See here](https://www.w3schools.com/tags/att_form_rel.asp) |

<!-- URL limit: 2048 characters -->

### Form elements

| Elements | Using | Attributes |
| ---- | ---- | ---- |
| button | | type |
| label | [Label tag](#label-tag) | |
| input | [Input tag](#input-tag) | list - use with `datalist` |
| textarea | A multi-line input | rows, cols |
| select | Drop-down list, contain collection of `option` | name, size (visible item), multiple |
| option | | selected |
| optgroup | Group of related options | |
| datalist | Specifies a list of pre-defined options for an `input` | |
| output | Defines the result of a calculation | |
| fieldset | Wrap group elements | |
| legend | Title for group elements wrap by `fieldset` | |

```html
<form>
  <fieldset>
    <legend>Personalia:</legend>

    <label for="fname">First name:</label><br />
    <input type="text" id="fname" name="fname" value="John" /><br />
    <label for="lname">Last name:</label><br />
    <input type="text" id="lname" name="lname" value="Doe" /><br /><br />

    <select id="cars" name="cars">   
      <optgroup label="Swedish Cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
      </optgroup>
      <optgroup label="German Cars">
        <option value="mercedes" selected>Mercedes</option>
        <option value="audi">Audi</option>
      </optgroup>
    </select>

    <input list="browsers" />        
    <datalist id="browsers">   
      <option value="Edge"></option>
      <option value="Firefox"></option>
      <option value="Chrome"></option>
      <option value="Opera"></option>
      <option value="Safari"></option>
    </datalist>

    <hr />
    <input type="submit" value="Submit" />    
  </fieldset>
</form>
```

## Graphics

| Canvas                                               | Scalable Vector Graphics                                                  |
| ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Draws 2D graphics, on the fly (with JavaScript)      | A language for describing 2D graphics in XML                              |
| Resolution dependent                                 | Resolution independent                                                    |
| No support for event handlers                        | Support for event handlers                                                |
| Poor text rendering capabilities                     | Best suited for applications with large rendering areas (Google Maps)     |
| You can save the resulting image as `.png` or `.jpg` | Slow rendering if complex (anything that uses the DOM a lot will be slow) |
| Well suited for graphic-intensive games              | Not suited for game applications                                          |

## Media

**Format** has **bold** is supported by all browser!

| Video Format               | File         | Developed                         | Description                                                                                               |
| -------------------------- | ------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| MPEG                       | _.mpg .mpeg_ | Moving Pictures Expert Group      | The first popular video format on the web. Not supported anymore in HTML.                                 |
| AVI Audio Video Interleave | _.avi_       | Microsoft                         | Commonly used in video cameras and TV hardware. Plays well on Windows computers, but not in web browsers. |
| WMVWindows Media Video     | _.wmv_       | Microsoft                         | Same above                                                                                                |
| QuickTime                  | _.mov_       | Apple                             | Commonly used in video cameras and TV hardware. Plays well on Apple computers, but not in web browsers.   |
| RealVideo                  | _.rm .ram_   | Real Media                        | Allow video streaming with low bandwidths. Does not play in web browsers.                                 |
| Flash                      | _.swf .flv_  | Macromedia                        | Often requires an extra component (plug-in) to play in web browsers.                                      |
| **Theora Ogg**             | _.ogg_       | Xiph. Org Foundation.             | Supported by HTML.                                                                                        |
| **WebM**                   | _.webm_      | Mozilla, Opera, Adobe, and Google | Supported by HTML.                                                                                        |
| **MPEG-4/MP4**             | _.mp4_       | Moving Pictures Expert Group      | Commonly used in video cameras and TV hardware. Supported by all browsers and  recommended by YouTube.    |

| Audio Format                             | File       | Developed             | Description                                                                                                                                                                                                                                       |
| ---------------------------------------- | ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MIDIMusical Instrument Digital Interface | .mid .midi |                       | Main format for all electronic music devices like synthesizers and PC sound cards. MIDI files do not contain sound, but digital notes that can be played by electronics. Plays well on all computers and music hardware, but not in web browsers. |
| RealAudio                                | .rm .ram   | Real Media            | Allow streaming of audio with low bandwidths. Does not play in web browsers.                                                                                                                                                                      |
| WMAWindows Media Audio                   | .wma       | Microsoft             | Plays well on Windows computers, but not in web browsers.                                                                                                                                                                                         |
| AACAdvanced Audio Coding                 | .aac       | Apple                 | The default format for iTunes. Plays well on Apple computers, but not in web browsers.                                                                                                                                                            |
| **WAV**                                  | .wav       | IBM and Microsoft     | Plays well on Windows, Macintosh, and Linux operating systems. Supported by HTML.                                                                                                                                                                 |
| **Ogg**                                  | .ogg       | Xiph. Org Foundation. | Supported by HTML.                                                                                                                                                                                                                                |
| **MP3**                                  | .mp3       |                       | The sound part of MPEG files. MP3 is the most popular format for music players. Combines good compression (small files) with high quality.                                                                                                        |
| MP4                                      | .mp4       |                       | MP4 is a video format, but can also be used for audio.                                                                                                                                                                                            |

### Video tag

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  <track
    src="fgsubtitles_en.vtt"
    kind="subtitles"
    srclang="en"
    label="English"
  />
  <track
    src="fgsubtitles_no.vtt"
    kind="subtitles"
    srclang="no"
    label="Norwegian"
  />
  Your browser does not support the video tag.
</video>
```

### Audio tag

```html
<audio controls autoplay muted>
  <source src="horse.ogg" type="audio/ogg" />
  <source src="horse.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

### YouTube videos

```html
<iframe
  width="420"
  height="315"
  src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1"
>
</iframe>
```

:::info Youtube API Params

Use after `?` and combine with `&`

- autoplay=1
- mute=1
- loop=1
- playlist=
- control=0 (not display) | 1 (default)

:::

## Resources

- [W3School](https://www.w3schools.com/htmL)
