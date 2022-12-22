export class InvalidWaMessageObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaMessageObjError.prototype);
    }
}

export class InvalidWaMessageTextObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaMessageTextObjError.prototype);
    }
}

export class InvalidWaMediaMessageObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaMediaMessageObjError.prototype);
    }
}

export class InvalidWaListMessageObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaListMessageObjError.prototype);
    }
}

export class InvalidWaButtonMessageObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaButtonMessageObjError.prototype);
    }
}

export class InvalidWaBusinessProfileObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaBusinessProfileObjError.prototype);
    }
}

export class InvalidWaInteractiveMessageObjError extends Error {
    constructor(msg: string, public code: number | undefined = undefined) {
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, InvalidWaInteractiveMessageObjError.prototype);
    }
}