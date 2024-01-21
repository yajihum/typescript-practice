// 5.2 クラスの型

// 5.2.1 クラス宣言はインスタンスの型をつくる
class User11 {
	name: string;
	age: number;
	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}
const user11: User11 = new User11("rorisu", 5); // User11というクラスを作成すると同時にUser11型も作成される
// Typescriptでが構造的部分片づけを採用しているため、これも可能
// ただし、これができるのはクラス宣言のみで、クラス式ではできない
const user12: User11 = {
	name: "rorisu",
	age: 5,
};

// 5.2.2 newシグネチャによるインスタンス化可能性の表現
class User21 {
	name = "";
	age = 0;
}

type MyUserConstructor = new (name: string, age: number) => User21; // newシグネチャを使ってインスタンス化可能性を表現する
const MyUser: MyUserConstructor = User21; // MyUserConstructor型の変数にUser21クラスを代入する
const u = new MyUser("rorisu", 5);

// 5.2.3 isntanceof演算子による型の絞り込み
console.log(u instanceof User21); // true
console.log(user12 instanceof User11); // false user12はUser11型ではあるが、User11のインスタンスではないため
