class Blah {
  constructor() {
    const _this = this;

    _this.batman = '33';
    _this.myFunction = _this.myFunction.bind(this);
  }
  stubFunction() {
    const _this = this;

    const myPrips = _this.batman;
    if (_this.batman === '123') {
      return null;
    }
  }
}
