# pipe

Pipe a stream into a transform stream

**Parameters**

-   `transformer` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default identity)** The transform function we can apply on each stream element

Returns **[Stream](https://nodejs.org/api/stream.html)** The piped stream

# defOnError

Default onStream error function

# stream

Creates a Readable/Writable stream

**Parameters**

-   `transformer` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default identity)** 
-   `onError` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default defOnError)** = defOnError

Returns **Transform** 
