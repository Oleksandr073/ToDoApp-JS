export default class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'User is unauthorized');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}