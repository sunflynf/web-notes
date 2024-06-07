# React Toastify

## Quick start

```bash
npm i react-toastify
```

```jsx
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App(){
    const notify = () => toast("Wow so easy!");

    return (
        <div>
            <button onClick={notify}>Notify!</button>
            <ToastContainer />
        </div>
    );
}
```

## CommonOptions

| Props \| Options | Type | Default | Desc |
| --- | --- | --- | --- |
| position | (top\|bottom)-(left\|center\|right) | top-right |  |
| autoClose | boolean \| number | 5000 | Delay (ms) before close, manual close if `false` |
| closeButton | Component \| boolean |  | custom or `false` to hide |
| transition | Component | Bounce | Use `react-transition-group` \| **Transition** component |
| hideProgressbar | boolean | false |  |
| pauseOnHover | boolean | true |  |
| pauseOnFocusLoss | boolean | true | Pause when window loses focus  |
| closeOnClick | boolean | false | Dismiss toast if click inside |
| className | string |  | container class |
| style | object |  | container styles |
| toastClassName | string |  |  |
| bodyClassName | string |  | toast's body class |
| progressClassName | string |  |  |
| progressStyle | object |  |  |
| draggable | boolean \| "mouse" \| "touch" | touch |  |
| draggablePercent | number | 80 | drag to dismiss when toast's width below (number) |
| draggableDirection | "x" \| "y" |  |  |
| containerId | string \| number |  | Use in case app have multiples ToastContainer |
| role | string | alert | define ARIA role |

## Toast Container

| Props | Type | Default | Desc |
| --- | --- | --- | --- |
| rtl | boolean | false | Support content right to left |
| stacked | boolean | false | **Newest** on top |
| newestOnTop | boolean | false |  |
| limit | number |  | limits toast show in screen |
| theme | "light" \| "dark" \| "colored" | light |  |

## Toast Emitter

| Option | Type | Desc |
| --- | --- | --- |
| toastId | string \| number | Custom ID |
| type | success \| info <br> warn \| error |  |
| onOpen | `(props) => void` |  |
| onClose | `(props) => void` |  |
| onClick | `(props) => void` |  |
| delay | number |  |
| render | Component | available for `toast.update` |
| isLoading | boolean | available for `toast.loading` |
| data | object | anything you want to put in toast but not affect toast |

```js
toast(message | Component, options);

toast.success(message | Component, options?);
toast.info(message | Component, options?);
toast.warn(message | Component, options?);
toast.error(message | Component, options?);

toast.dismiss(toastId?); // Remove all if not provide param
toast.dismiss({ id: "", containerId });

toast.isActive(toastId);

toast.update(toastId, { type, render }); // ?

toast.clearWaitingQueue(); // clear waiting queue when working with limit
toast.clearWaitingQueue({ containerId });

toast.done(toastId); // completes progressbar

// control timer
toast.play({ id });
toast.pause({ id });
```

## cssTransition

> References: [Animate Document](https://animate.style/#documentation)

```jsx
const Effect = cssTransition({
  // required
  enter: 'effect_start', 
  exit: 'effect_end', 
  // optional: default
  appendPosition: false,
  collapse: true,
  collapseDuration: 300
});
```

```jsx
import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";

const bounce = cssTransition({
  enter: "animate__animated animate__bounceIn",
  exit: "animate__animated animate__bounceOut"
});

export default function App() {
  function animateCss() {
    toast.dark("Hey 👋, see how easy!", {
    //   transition: bounce
    });
  }

  return (
    <>
      <div className="App">
        <div className="btn-group">
          <button className="btn" onClick={animateCss} id="animate.css">
            Example using animate.css
          </button>
        </div>
      </div>
      <ToastContainer transition={bounce} />
    </>
  );
}
```
