class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message; //  this.greeting - это публичное свойство класса
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
 
let greeter = new Greeter("world");
greeter.greet() // 