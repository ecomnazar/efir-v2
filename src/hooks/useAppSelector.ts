import { TypedUseSelectorHook, useSelector } from "react-redux"
import { store } from "../services/store"

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector