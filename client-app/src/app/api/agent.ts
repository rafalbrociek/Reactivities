import axios, {AxiosResponse} from "axios";
import { Activity } from "../models/activity";

// pomocnicza metoda mająca symulować "oczekiwanie" na odpowiedź serwera
// za każdym razem jak wykonujemy zapytanie, to robimy krótkie opóźnienie
// symulacja pracy w "realnej" sieci
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

// zdefiniowanie bazowego url
axios.defaults.baseURL = 'http://localhost:5000/api';

// korzystamy z 'przechwytywaczy' w celu zasymulowania opóźnienia
// za każdym razem jak dostajemy odpowiedź serwera, opóźnienie wynosi 1000ms
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

// definiujemy obiekt zwracający body odpowiedzi serwera
// używamy typu generycznego <T>
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

// definiujemy zapytania
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

// lista pobranych aktywności
const Activities = {
    // zwracana jest lista aktywności
    list: () => requests.get<Activity[]>('/activities'),
    // zwracana jest pojedyncza aktywność
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    // w pozostałych przypadkach nic nie zwracamy
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;