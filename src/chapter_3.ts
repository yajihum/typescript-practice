// chapter3
console.log('chapter3');

// 3.1.3 オブジェクトリテラルのプロパティ名の指定方法

// プロパティ名を文字列リテラルで指定する
const obj = {
  one: 1,
  two: 2,
  'foo bar': -500,
};
console.log(obj.one);
console.log(obj['one']);
console.log(obj['foo bar']);

// 数値リテラルで指定する
const obj2 = {
  0: 1,
  1: 2,
  2: -500,
};
console.log(obj2[0]);

// 計算されたプロパティ名で指定する
const prefix = 'foo';
const obj3 = {
  [prefix + 'bar']: 'hello',
};
console.log(obj3.foobar);

// obj['foo bar'] のようなアクセスは[]の中身を式にできる
const num = 0;
const obj4 = {
  good: 'hello',
  bad: 'world',
};
console.log(obj4[num === 0 ? 'good' : 'bad']);

// 3.1.6
// ネストしたオブジェクトをスプレッド構文しても、ネストしたオブジェクトは同じオブジェクトを参照する
const obj5 = {
  foo: { bar: 'hello' },
};
const obj6 = { ...obj5 };
console.log(obj5.foo.bar);
obj5.foo.bar = 'world';
console.log(obj6.foo.bar); // worldになる

// 3.2.4
// interface宣言はオブジェクト型のみ扱える
interface FooBarObj {
  foo: number;
  bar: string;
}
const obj7: FooBarObj = {
  foo: 123,
  bar: 'hello',
};

// 3.2.5
// インデックスシグネチャ
type PriceData = {
  [key: string]: number;
};
const priceData: PriceData = {
  banana: 100,
  tomato: 200,
  lemon: 300,
};
priceData.chicken = 500; // 新しいプロパティを追加できる

// ただ、このインデックスシグネチャはTypeScriptが保証する型安全性を破壊するので注意する必要がある（noUncheckedIndexedAccessコンパイラオプションを使用すれば問題ない）
// これは存在しないプロパティにアクセスできてしまい、型の整合性が保証されなくなるため
const berry: number = priceData.berry; // これは存在しないプロパティなのでundefinedになるが、　型はnumberになってしまう
// インデックスシグネチャはMapオブジェクトで代替可能

// 3.2.7
// 読み取り専用プロパティ
type FooReadOnly = {
  readonly bar: number;
};
const fooReadOnly: FooReadOnly = {
  bar: 123,
};
// fooReadOnly.bar = 456; // これはエラーになる

// 3.2.8
// typeof
const commandList = ['foo', 'bar', 'baz'] as const;
type Command = (typeof commandList)[number];

// 3.3.1
// 部分型
type FooBar = {
  foo: number;
  bar: string;
};
type FooBarBaz = {
  foo: number;
  bar: string;
  baz: boolean;
};
const fooBarBaz: FooBarBaz = {
  foo: 123,
  bar: 'hello',
  baz: true,
};
const fooBar: FooBar = fooBarBaz; // FooBarBazはFooBarの部分型である
// FooBarBaz型はFooBar型の上位互換であり、これを部分型と呼ぶ
// TypeScriptのにおける部分型関係は、構造的部分型と呼ばれる
// 一方、名前的部分型というものもあるが、TypeScriptではサポートされていない

// 3.4.1
// 型引数を持つ型
type User2<T> = {
  name: string;
  child: T;
};
// 以下のように複数の型引数を持つこともできる
type Family<Parent, Child> = {
  father: Parent;
  mother: Parent;
  child: Child;
};

// 3.4.2
// 型引数を持つ型を使用する
const obj8: Family<number, string> = {
  father: 123,
  mother: 456,
  child: '1000',
};

// 3.4.3
// 型引数に部分型を指定する場合
type HasName = {
  name: string;
};
// ParetやChildはHasName型の部分型である必要がある
type Family2<Parent extends HasName, Child extends HasName> = {
  father: Parent;
  mother: Parent;
  child: Child;
};

type Animal = {
  name: string;
};
type Human = {
  name: string;
  age: number;
};
type T = Family2<Animal, Human>; // OK

// 3.4.4
// オプショナルな型引数
// 型が指定されなかった場合はAnimalのデフォルトの型になる
type Family3<Parent = Animal, Child = Animal> = {
  father: Parent;
  mother: Parent;
  child: Child;
};

// 3.5.2
// 配列もオブジェクトの一種
const arr = [0, 123, -456];
console.log(arr[0]);
console.log(arr['2']); // これもOK

// 3.5.3
// 配列型の宣言
const arr1: number[] = [11, 20];
const arr2: Array<{ name: string }> = [{ name: 'Jack' }, { name: 'Jane' }];

// 3.5.7
// タプル型
// タプル型とは、要素数が固定さている代わりに配列のそれぞれの要素に異なる型を指定できるもの
const tuple: [number, string] = [123, 'hello'];
const [t1, t2] = tuple; // t1はnumber型、t2はstring型になる
// useStateとかもタプル型を使用している

// 3.6.1
// 分割代入
const obj9 = { foo: 'hello', bar: 3, 'foo-bar': true };
const { foo, bar: barVar, 'foo-bar': foo_Bar } = obj9; // 識別子で書けないプロパティ名もこのようにかける

// 3.6.3
// 配列の分割代入
const arr3 = ['a', 'b', 'c'];
const [first, second, third] = arr3;
console.log(first, second, third); // a b c

const arr4 = { arr: arr3 };
const {
  arr: [foo1],
} = arr4;
console.log(foo1); // a

const [, , third1] = arr3; // これも可

const tupleArray: [string, number] = ['a', 123];
const [tuple1, tuple2] = tupleArray; // tuple1はstring型、tuple2はnumber型になる

// 3.6.4
// 分割代入のデフォルト値
type obj10Type = { foo_10?: number };
const obj10: obj10Type = {};
const { foo_10 = 1 } = obj10; // fooがundefinedの場合は1が代入される
const { foo_10: foo2 = 1 } = obj10; // fooがundefinedの場合は1が代入される
// デフォルト値はundefinedの場合にのみ代入される（nullは適用されないことに気をつける）

// 3.7.4
// Mapオブジェクト
const map = new Map<string, number>();
map.set('foo', 123);
console.log(map.get('foo')); // 123
console.log(map.get('bar')); // undefined

// 3.8 力試し
type User = {
  name: string;
  age: number;
  premiumUser: boolean;
};

const data: string = `
uhyo,26,1
John Smith,17,0
Mary Sue,14,1
`;

const users: User[] = data
  .split('\n')
  .filter((line) => line.trim() !== '')
  .map((line) => {
    const [name, age, premiumUser] = line.split(',');
    return {
      name,
      age: Number(age),
      premiumUser: Boolean(Number(premiumUser)),
    };
  });

for (const user of users) {
  if (user.premiumUser) {
    console.log(`${user.name}はプレミアム会員です`);
  } else {
    console.log(`${user.name}はプレミアム会員ではありません`);
  }
}
