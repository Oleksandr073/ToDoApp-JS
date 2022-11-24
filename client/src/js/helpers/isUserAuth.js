import { ACCESS_TOKEN_KEY } from '../constants/localStorageKeys';
import localStorageHelper from '../helpers/localStorageHelper';

export default function isUserAuth() {
    return Boolean(localStorageHelper.get(ACCESS_TOKEN_KEY));
}