type AnyObject = Record<string, any>;

export const isObjectSame = (objA: AnyObject, objB: AnyObject) =>
	objA.length === objB.length && objA.every((value: any, index: number) => value === objB[index]);
