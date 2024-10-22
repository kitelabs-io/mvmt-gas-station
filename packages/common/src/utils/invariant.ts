export class InvariantError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class UnreachableError extends Error {
	statusCode: number;

	constructor() {
		super("Internal Server Error");
		this.statusCode = 500;
	}
}

export function invariant400(
	condition: any,
	message: string,
): asserts condition {
	if (!condition) {
		throw new InvariantError(message, 400);
	}
}

export function invariant500(condition: any): asserts condition {
	if (!condition) {
		throw new UnreachableError();
	}
}
