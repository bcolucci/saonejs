# between

Extract sequences based on a test function.

**Parameters**

-   `opts` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default { test: Function })** Options
    -   `opts.test` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The test function

Returns **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** The between fonction to call on a stream

# defOnError

Default onStream error function

# stream

Creates a Readable/Writable stream

**Parameters**

-   `transformer` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default identity)** 
-   `onError` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default defOnError)** = defOnError

Returns **Transform** 
