import { createContext, useContext } from "react"
import ActivityStore from "./ActivityStore";
import CommonStore from "./CommonStore";
import UserStore from "./UserStore";
import ModalStore from "./ModalStore";

// interfejs Store (zawiera w sobie magazyny danych)
interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

// tworzymy obiekt typu Store i inicjalizujemy jego pola
export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

// tworzymy kontekst dla magazynu danych
export const StoreContext = createContext(store);

// funkcja useStore zwracająca hooka useContext
export function useStore() {
    return useContext(StoreContext);
}