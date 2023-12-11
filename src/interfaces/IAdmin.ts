import { TBoolean, TString } from "./IGlobal";

export interface IAdmin {
  created_at: TString;
  gender: TString;
  id: TString;
  is_staff: TBoolean;
  is_superuser: TBoolean;
  phone_number: TString;
  region: TString;
  username: TString;
}

export interface IAddAdmin {
    username: string;
    password: string;
    region: string;
    phone_number: string;
    gender: string;
}