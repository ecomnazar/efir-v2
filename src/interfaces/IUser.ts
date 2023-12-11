import { TBoolean, TNumber, TString } from "./IGlobal";

export interface IUser {
  avatar: TString;
  bio: TString;
  city: { id: TNumber; slug: TString; name: TString; region: TNumber };
  count_stars: TNumber;
  created_at: TString;
  data: { post_count: TNumber; like_count: TNumber };
  expires_at?: null | TString;
  id: TString;
  is_commentable: TBoolean;
  is_premium: TBoolean;
  level: TNumber;
  phone_number: TString;
  post_limit: TNumber;
  premium_at?: null;
  qr_code: TString;
  region: { id: TNumber; slug: TString; name: TString };
  username: TString;
}

export interface IAddUser {
  username?: TString;
  region: TNumber;
  city: TNumber;
  bio: TString;
  address: TString;
  avatar: TString;
  is_channel: TBoolean;
}