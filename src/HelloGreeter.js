
export default class HelloGreeter {

  pattern: string

  constructor(pattern?: string = 'Hello :name!') {
    this.pattern = pattern
  }

  sayHello(name?: string = 'john') {
    console.log(this.pattern.replace(':name', name))
  }

}
