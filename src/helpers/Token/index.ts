import { TString } from "../../interfaces/IGlobal";
import Cookies from 'js-cookie'

export const saveToken = (token: TString) => Cookies.set('token', token) || ''

export const getToken = () => Cookies.get('token')

export const removeToken = () => Cookies.remove('token')