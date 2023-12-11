import { useDispatch } from "react-redux";
import { store } from "../services/store";

export const useAppDispatch: () => typeof store.dispatch = useDispatch