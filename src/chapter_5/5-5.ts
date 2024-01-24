// 5.5 例外処理

// finallyの使用
{
    const throwError = () => {
        const error =  new Error("エラーが発生しました");
        throw error;
    }

    try{
        throwError();
    }
    finally{
        console.log("finally"); // エラーが起こるかどうかに関わらず実行される
        // finallyはtryからの脱出が実行される直前に実行される
    }
}