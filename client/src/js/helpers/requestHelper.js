import { API_URL } from "../constants/apiUrl";
import { ACCESS_TOKEN_KEY } from "../constants/localStorageKeys";
import { userApi } from "../requests/usersRequest"; //------------------//
import { navigateTo } from "../routers";
import localStorageHelper from "./localStorageHelper";

let isRepeat = false;

export default async function makeRequest({ entityName, id = '', method, body, headers = {} }) {
    const url = `${API_URL}/${entityName}/${id}`;
    const options = {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        }
    };

    const res = await fetch(url, options);
    const dataObj = await res.json();

    //----------------------// refreshToken is not valid
    if (res.status === 401 && url.includes('refresh')) {
        localStorageHelper.remove(ACCESS_TOKEN_KEY);

        navigateTo(location.origin + '/login');

        throw new Error('Please login again!');
    }

    //----------------------// update accessToken + retry request
    if (res.status === 401 && !isRepeat) {
        isRepeat = true;

        console.log(401);
        await userApi.refreshToken();

        const accessToken = localStorageHelper.get(ACCESS_TOKEN_KEY);
        
        const res = await fetch(url, {
            ...options,
            headers: { 
                ...options.headers,
                'Authorization': `Bearer ${accessToken}` ,
            }
        });
        const dataObj = await res.json();

        if (!res.ok) {
            throw new Error(dataObj.message);
        }

        localStorageHelper.set(ACCESS_TOKEN_KEY, accessToken);

        return dataObj;
    }
    //----------------------//

    if (!res.ok) {
        throw new Error(dataObj.message);
    }

    return dataObj;
}