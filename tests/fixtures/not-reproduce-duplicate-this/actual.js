class Blah {
  constructor() {
    this.batman = '33';
    this.myFunction = this.myFunction.bind(this);
  }
  stubFunction() {
    const myPrips = this.batman;
    if (this.batman === '123') {
      return null;
    }
  }
}
