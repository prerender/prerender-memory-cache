Prerender In-Memory Cache plugin
===========================

This is a plugin meant to be used with your Prerender server to cache responses in memory.

Run this from within your Prerender server directory:

```bash
$ npm install prerender-memory-cache --save
```
##### server.js
```js
const prerender = require('prerender');
const server = prerender();

server.use(require('prerender-memory-cache'))

server.start();
```
##### Test it:
```bash
curl http://localhost:3000/render?url=https://www.example.com/
```
Accessing that URL twice should render the page the first time and then serve it from the in-memory cache on the second request.

## Options

#### CACHE_MAXSIZE
Maximum number of items in the cache.

`export CACHE_MAXSIZE=1000`

default: 100

#### CACHE_TTL
Time to live for items in the cache (in seconds)

`export CACHE_TTL=600`

default: 60

## License

The MIT License (MIT)

Copyright (c) 2018 Todd Hooper &lt;todd@prerender.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
