# Rename-this
[![CircleCI](https://circleci.com/gh/PlayMa256/rename-this-keyword/tree/master.svg?style=svg)](https://circleci.com/gh/PlayMa256/rename-this-keyword/tree/master)

## Why?
So, the idea to create this `babel-plugin` started when i saw one of my workmates' code which had a bunch of `const _this = this` and that was totally weird to me.

I went to him and asked why that type of variables, and then he explained me. 

The real deal of doing this is because `uglifyjs` or any other `minifier/uglifier` does not reduce the name of `this` keyword, which ends up creating a bigger code, in terms of `bytes`.

Using babels website [repl](https://babeljs.io/repl/), if we choose the `minify` option.

Inserting the following code as input:
```javascript
class Blah {
  constructor() {
    this.batman = '33';
    this.myFunction = this.myFunction.bind(this);
  }
  stubFunction() {
    const myProps = this.batman;
    if (this.batman === '123') {
      return null;
    }
  }
}
```

We are going to get the follow:
```javascript
var Blah = (function() {
  function a() {
    _classCallCheck(this, a),
      (this.batman = "33"),
      (this.myFunction = this.myFunction.bind(this));
  }
  return (
    _createClass(a, [
      {
        key: "stubFunction",
        value: function stubFunction() {
          this.batman;
          if ("123" === this.batman) return null;
        }
      }
    ]),
    a
  );
})();
```
As you can see, `this` keyword remains the same, meaning that the file size will be a little bigger.
 
TODO: Insert uglify examples.

## Roadmap
- [X] Write a better introduction and reasons why this was created.
- [X] Publish this direct into npm
- [ ] Add more test cases


## Must Update
* There is a unknown issue that when it inserts a variable `_then` it also inserts a `\n`. Not that it is a major problem or something like that, ` uglify` will remove blank spaces during build, but still an impovement.