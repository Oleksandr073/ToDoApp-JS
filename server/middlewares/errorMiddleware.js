import ApiError from "../helpers/ApiError.js";

export default function (err, req, res, next) {
    console.log('error', err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Server error' });
}