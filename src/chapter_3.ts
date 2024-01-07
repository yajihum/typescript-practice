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
