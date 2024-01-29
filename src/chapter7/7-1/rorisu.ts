export const name = "rorisu";
export const age = 5;

export type Animal = {
	species: string;
};

// 何もエクスポートするものがないが、ファイルをスクリプトではなくモジュールにしたい場合は以下のようにからのオブジェクトを返すといい
//export {};
