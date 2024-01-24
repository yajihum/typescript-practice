// 5.6 力試し

{
    class User {
        name: string;
        #age: number;

        constructor(name: string, age: number) {
            if(name === ""){
                throw new Error("名前は空にできません！");
            }
            this.name = name;
            this.#age = age;
        }

        getMessage(message: string) {
            return `${this.name} (${this.#age}) 「${message}」`;
        }
    }

    const rorisu = new User("rorisu", 23);
    console.log(rorisu.getMessage("こんにちは！")); // rorisu (23) 「こんにちは！」
}

// 5.6.3

{
    const createUser = (name: string, age: number) => {
        const getMessage = (message: string) => {
            return `${name} (${age}) 「${message}」`;
        }
        return getMessage;
    }

    const getMessage = createUser("rorisu", 23);
    console.log(getMessage("こんにちは！")); // rorisu (23) 「こんにちは！」
    // getMessageという関数はmessageしか渡していないのにnameとageが返ってくる
    // このように関数の中にデータが内包されていることをクロージャと呼ぶ
}