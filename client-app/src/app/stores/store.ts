import { createContext, useContext } from "react"
import ActivityStore from "./ActivityStore";

// interfejs Store (zawiera w sobie magazyny danych)
interface Store {
    activityStore: ActivityStore
}

// tworzymy obiekt typu Store i inicjalizujemy jego pola
export const store: Store = {
    activityStore: new ActivityStore()
}

// tworzymy kontekst dla magazynu danych
export const StoreContext = createContext(store);

// funkcja useStore zwracająca hooka useContext
export function useStore() {
    return useContext(StoreContext);
}