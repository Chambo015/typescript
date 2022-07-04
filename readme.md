Задаем тип переменной 
```ts 
let revenue: number = 1000;
```

Константы
```ts 
const a = 1 // тип будет не числа, а 1 потому что это Константа
let b: 1 = 1 // тоже самое что и const b = 1
b = 2 // ОШИБКА хоть и let но тип только 1
```

Задаем типы функциям, их аргументам и возвращаемый ими тип
```ts
function getFullName (firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
}

const getFullNameArrow = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`
}
```

Тип для объектов
```ts
function getFullName (userEntity: {firstName: string, lastName: string}): string {
    userEntity.city // ОШИБКА такого свойства нет в типе
    return `${userEntity.firstName} ${userEntity.lastName}`
}

let user = {
    firstName: 'Era',
    lastName: 'Aisahanov',
    city: 'Astana',
    age: 27,
    skills: {
        dev: true,
        back: true
    }
}
```
### Массив
Массив однотипный
```ts 
let skills: string[] = ['dev', 'devOps', 'testing'] // Массив строк
```
### Tuples
Tuples(кортежи) -  упорядоченный набор фиксированной длины.
```ts 
let skills: [number, string] = [1, 'dev'] // Четкое описание структуры массива

let id = skills[0];
let skillName = skills[1];
let other = skills[2] // ОШИБКА Тип кортежа не имеет элемент с индексом "2"

skills.push('test')
console.log(skills); // [ 1, 'dev', 'test' ]
console.log(skills[2]); // ОШИБКА - не имеет элемент с индексом "2"
```
```ts 
let arr: [number, string, ...(boolean|string)[]] = [1, 'test', true, false, 'ea' ] 
// Может иметь сколько угодно boolean или string типов в конце, либо не иметь вообще - это spread синтаксис
```

### Модификатор `readonly`
```ts 
let skills: readonly [number, string] = [1, 'dev'] // модификатор readonly
skills[0] = 5 // ОШИБКА так как это свойство, доступное только для чтения

let arr: readonly string[] = ['sty', 'back'];
let arr2: ReadonlyArray<string> = ['sty', 'back']

arr.push('str') // ОШИБКА
```
есть тип const - исключает расширение типа и рекурсивно отмечает его члены как readonly даже в глубоко вложенных структурах данных:
```TypeScript
let e = [1, {x: 2}] as const // readonly [1, {readonly x: 2}]
```

### Enum
Enum является способом перечисления возможных значений типа. Он представляет собой неупорядоченную структуру данных, которая сопоставляет ключи и значения.
```ts 
enum StatusCode {
    SUCCESS = 5, 
    IN_PROCESS, // будет равен 6, идет после 5
    FAILED = 'f' // можете использовать строчные значения 
}

const code = StatusCode.IN_PROCESS
console.log(code);

console.log(StatusCode.IN_PROCESS); // 6
console.log(StatusCode['FAILED']); // 'f'
console.log(StatusCode[5]); // SUCCESS - это обратный просмотр
console.log(StatusCode[70]); // undefined

function fu(status: StatusCode): StatusCode{
    return status
}

console.log(fu(70)); // 70 - не должно быть возможности получить StatusCode[70], но TypeScript вас не останавливает. 
// Мы можем попросить его предотвращать подобное небезопасное обращение с помощью const enum

const enum Language {
    English, = 5, 
    Spanish,
    Russian = 'f'
}

console.log(Language[5]); // ОШИБКА обратиться к константному члену перечисления можно только с помощью строчного литерала.
console.log(Language.Spanish); // 6
```

### Union
TypeScript предоставляет специальные операторы типов для описания объединений и пересечений: | для объединения и & для пересечения.
#### Объединение (|)
```ts 
let strOrArr: string | number[] = [5, 2]; // или строка или массив чисел

let arr: (string | number)[] = ['str', 5, 2, 'era']; // массив строк или чисел или того и другого

function log(id: string | number) {
  console.log(id); // может быть как число так и строка
  if (typeof id === 'string') { // сужение типов
    console.log(id); // это точно строка 
  } else {
    console.log(id) // точно число
  }
}

function logError(err: string | string[] ) {
    console.log(err); // либо строка либо массив строк
    if(Array.isArray(err)) {
        console.log(err) // массив
    } else {
        console.log(err) // строка
    }
}

function logObject(obj: { a: number } | {b: string} ) {
    console.log(obj.a); // ОШИБКА мы не можем вызвать свойства a или b так как не известно кто из них будет и тут Явно нужно делать сужение
    if('a' in obj) {
        console.log(obj.a) // доступ к свойству есть , тип число
    } else {
        console.log(obj.b) // доступ к свойству есть , тип строка
    }
}

function logMultipleIds(a: string | number, b: string | boolean) { // есть общий тип строка
    if(typeof(a) === 'string' && typeof(b) === 'string') {
        console.log(a + b); // оба строки
    } else {
        console.log(a); // строка или число 
        console.log(b); // строка или булево
    }
}
```

### Литеральный тип
```ts 
const a = 1 // тип будет не числа, а 1 потому что это Константа
let b: 1 = 1 // тоже самое что и const b = 1
b = 2 // ОШИБКА хоть и let но тип только 1

function fetchAuth ( url: string, method: 'post' | 'get') {

}

let method = 'post' // тип строка 
const methodPost = 'post' // тип 'post'
let method2:'post' | 'get' = 'get' // тип "post" | "get"

fetchAuth('/auth', method) // ОШИБКА method имеет тип строка а нужно 'post' или 'get' 

fetchAuth('/auth', methodPost) // будет работать 
fetchAuth('/auth', 'get') // будет работать 
fetchAuth('/auth', method2) // будет работать 
```