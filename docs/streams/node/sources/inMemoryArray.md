# inMemoryArray

TODO We probably don't need this, we could use a generator

**Parameters**

-   `items` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** The source array from which will came the stream items

# defOnError

Default onStream error function

# stream

Creates a Readable/Writable stream

**Parameters**

-   `transformer` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default identity)** 
-   `onError` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default defOnError)** = defOnError

Returns **Transform** 