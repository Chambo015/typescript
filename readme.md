Задаем тип переменной

```ts
let revenue: number = 1000;
```

Константы

```ts
const a = 1; // тип будет не числа, а 1 потому что это Константа
let b: 1 = 1; // тоже самое что и const b = 1
b = 2; // ОШИБКА хоть и let но тип только 1
```

Задаем типы функциям, их аргументам и возвращаемый ими тип

```ts
function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

const getFullNameArrow = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};
```

Тип для объектов

```ts
function getFullName(userEntity: {
  firstName: string;
  lastName: string;
}): string {
  userEntity.city; // ОШИБКА такого свойства нет в типе
  return `${userEntity.firstName} ${userEntity.lastName}`;
}

let user = {
  firstName: 'Era',
  lastName: 'Aisahanov',
  city: 'Astana',
  age: 27,
  skills: {
    dev: true,
    back: true,
  },
};
```

### Массив

Массив однотипный

```ts
let skills: string[] = ['dev', 'devOps', 'testing']; // Массив строк
```

### Tuples

Tuples(кортежи) - упорядоченный набор фиксированной длины.

```ts
let skills: [number, string] = [1, 'dev']; // Четкое описание структуры массива

let id = skills[0];
let skillName = skills[1];
let other = skills[2]; // ОШИБКА Тип кортежа не имеет элемент с индексом "2"

skills.push('test');
console.log(skills); // [ 1, 'dev', 'test' ]
console.log(skills[2]); // ОШИБКА - не имеет элемент с индексом "2"
```

```ts
let arr: [number, string, ...(boolean | string)[]] = [
  1,
  'test',
  true,
  false,
  'ea',
];
// Может иметь сколько угодно boolean или string типов в конце, либо не иметь вообще - это spread синтаксис
```

### Модификатор `readonly`

```ts
let skills: readonly [number, string] = [1, 'dev']; // модификатор readonly
skills[0] = 5; // ОШИБКА так как это свойство, доступное только для чтения

let arr: readonly string[] = ['sty', 'back'];
let arr2: ReadonlyArray<string> = ['sty', 'back'];

arr.push('str'); // ОШИБКА
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
  if (typeof id === 'string') {
    // сужение типов
    console.log(id); // это точно строка
  } else {
    console.log(id); // точно число
  }
}

function logError(err: string | string[]) {
  console.log(err); // либо строка либо массив строк
  if (Array.isArray(err)) {
    console.log(err); // массив
  } else {
    console.log(err); // строка
  }
}

function logObject(obj: { a: number } | { b: string }) {
  console.log(obj.a); // ОШИБКА мы не можем вызвать свойства a или b так как не известно кто из них будет и тут Явно нужно делать сужение
  if ('a' in obj) {
    console.log(obj.a); // доступ к свойству есть , тип число
  } else {
    console.log(obj.b); // доступ к свойству есть , тип строка
  }
}

function logMultipleIds(a: string | number, b: string | boolean) {
  // есть общий тип строка
  if (typeof a === 'string' && typeof b === 'string') {
    console.log(a + b); // оба строки
  } else {
    console.log(a); // строка или число
    console.log(b); // строка или булево
  }
}
```

### Литеральный тип

```ts
const a = 1; // тип будет не Number, а 1 потому что это Константа
let b: 1 = 1; // тоже самое что и const b = 1
b = 2; // ОШИБКА хоть и let но тип только 1

function fetchAuth(url: string, method: 'post' | 'get') {}

let method = 'post'; // тип строка
const methodPost = 'post'; // тип 'post'
let method2: 'post' | 'get' = 'get'; // тип "post" | "get"

fetchAuth('/auth', method); // ОШИБКА method имеет тип строка а нужно 'post' или 'get'

fetchAuth('/auth', methodPost); // будет работать
fetchAuth('/auth', 'get'); // будет работать
fetchAuth('/auth', method2); // будет работать
```

### null, undefined, void и never

В JavaScript есть два значения для выражения отсутствия: null и undefined. TypeScript поддерживает их оба и имеет для них типы.

- тип undefined может иметь только одно значение — _undefined_
- типа null, который описывает только значение _null_

> undefined означает, что нечто еще не было определено, а null показывает отсутствие значения

- void — это возвращаемый тип функции, которая не возвращает ничего явно (например, console.log)
- never — это тип функции, которая никогда ничего не возвращает (выбрасывает исключение или выполняется бесконечно)

```ts
// (a) Функция, возвращающая число или null
function a(x: number) {
  if (x < 10) {
    return x;
  }
  return null;
}

// (b) Функция, возвращающая undefined
function b() {
  return undefined;
}

// (c) Функция, возвращающая void
function c() {
  let a = 2 + 2;
  let b = a * a;
}

// (d) Функция, возвращающая never
function d() {
  throw TypeError('I always error');
}

// (e) Другая функция, возвращающая never
function e() {
  while (true) {
    doSomething();
  }
}
```

| Type | Meaning  |
| --------- | -------------------------------------------------------------------------------------- |
| null      | Отсутствие значения                                                                    |
| undefined | Переменная, которой не присвоено значение                                              |
| void      | Функция, не имеющая оператора return                                                   |
| never     | Функция, никогда ничего не возвращающая (выбрасывает исключение или выполняется вечно) |


### type Aliases
Подобно тому как вы используете декларации (let, const и var) для объявления переменной, вы также можете объявлять тип
```ts
type MethodsHTTP = 'post' | 'get'

let method: MethodsHTTP = 'get'

type User = {
    name: string,
    age: number,
    method: MethodsHTTP
}

type Role = {
    id: number
    name: string[]
}

type UserWithRole = User | Role // & - обязательно поля нужны поля двух типов,
// | - обязательно нужны поля одного из типов либо обоих

let user: UserWithRole = {
    name: 'Jon',
    age: 22,
    method: 'post'
}

// Если типы имеют одинаковые поля при Объединений будет ошибки и путаницы
type User2 = { name: string,}

type Role2 = { name: string[] }

// Используйте такой тип объединения 
type UserWithRole2 = {
    user: User2,
    role: Role2
}

let user2: UserWithRole2 = {
    user : {
        name:  'Jon'
    },
    role: {
        name: ['Jon']
    }
}
```
### Интерфейсы
Подобно псевдонимам типов, интерфейсы являются способом назвать тип без необходимости определять его встроенным. `type` и `interface` — это в целом два синтаксиса для одной задачи (как выражения и декларации функций), но есть небольшие отличия.

```ts
interface User {
     name : string;
     age: number;
     skills: string[];
     log: (id: number)=> string
}

interface Role {
    roleId: number;
}

interface UserWithRole extends User, Role {
    createdAt: Date;
}

let user: UserWithRole = {
    name: 'Asf',
    age: 55,
    skills: ['er'],
    roleId: 2,
    createdAt: new Date(),
    log(id) {
        return ''
    }
}
```

#### interface ИЛИ type
```ts 
interface User {
    name: string
}

interface User { // merge интерфейса !плохая практика
    age: number 
}

const user: User = {
    name: 'as',
    age: 33
}

type ID = string | number; // type подходят и для примитивов

interface IDI {   // Интерфейсы для объектов
    ID: string | number
}
```

### Опциональный ?
```ts 
// Опциональность добавляет еще один тип | undefined

interface User {
    login: string,
    password?: string 
}

const user: User = {
    login: 'a'
}

function multiply(first: number, second?: number): number {
    return first * (second || 5)
}

function test(param? : string) {
    const t = param ?? multiply(5) // Нулиш будет смотреть на второй аперсанд если первый будет null или undefined
}
``` 

### unknown
```ts
async function getData(url: string) {
  try {
    await fetch(url);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    // Или 
    const e = error as Error;
    console.log(e.message);
  }
}
```

#### Исчерпывающая проверка
```ts
function isString(x: string | number): boolean {
    if(typeof x === 'string') {
        return true
    }
    if (typeof x === 'number') {
        return false
    }
    throw Error // Исчерпывающая проверка
}
```

### Приведение типов
```ts
let a = 5

let e: string = new String(a).valueOf()
let b: boolean = new Boolean(a).valueOf()


interface User {
    name: string;
    email: string;
    login: string;
}

const user = {
    name: 'Вася',
    email: 'a@.c',
    login: 'Vlad'
} as User

interface Admin {
    name: string;
    role: number
}

const admin: Admin = {
    ...user, // у админа будут лишние свойств такие как email и login
    role: 1
}

// Используйте Мапинг
function userToAdmin(user: User): Admin {
    return {
        name: user.name,
        role: 1
    }
}
```

### Пользовательские защиты типов
#### type guard
Для некоторых видов функций, возвращающих boolean, может быть недостаточно просто указать: «Эта функция возвращает boolean».
```ts
function isString(a: unknown): a is string {
    return typeof a === 'string'
}

// Сложные случаи
interface User {
    name: string;
    email: string;
    login: string;
}

interface Admin {
    name: string;
    role: number
}


function isAdmin(user: User | Admin): user is Admin {
    return 'role' in user // Если свойство role есть то это админ 
}

function setRole(user: User | Admin) {
    if (isAdmin(user)) {
        user.role = 0
    } else {
        // тут будет не Админ
        console.log('user не админ');
    }
}
```

## Классы