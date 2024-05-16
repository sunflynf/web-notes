### Table of contents

### Introduce
- Node.js is an open source server environment
- Node.js uses JavaScript on the server
- Node.js runs single-threaded, non-blocking, asynchronous programming
- Node.js can
  - Generate dynamic page content
  - Create, open, read, write, delete, and close files on the server
  - Collect form data
  - Add, delete, modify data in database

```cmd
> node --version
> node file.js
```

### Modules
```js
// myFirstModule.js
exports.myDateTime = function () {
  return Date();
};
// { myDateTime: func }

// other file
const dt = require('./myFirstModule');
console.log(dt.myDateTime());
```

### HTTP
```js
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt); // Add to body
}).listen(8080);

// http://localhost:8080/?year=2017&month=July -> "2017 July"
```

