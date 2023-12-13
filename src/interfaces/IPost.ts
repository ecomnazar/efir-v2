import { TBoolean, TNumber, TString } from "./IGlobal";

export interface IPost {
  created_at: TString;
  description: TString;
  id: TString;
  images: TString[];
  video?: TString; 
  is_commentable: TBoolean;
  liked: TBoolean;
  likes: TNumber;
  saved: TBoolean;
  tags: TString;
  updated_at: TString;
  type?: TString;
  user: {
    id: TString;
    username: TString;
    avatar: TString;
  };
}

export interface IAddPost {
  id?: TString;
  user: TString;
  image_1?: TString;
  description: TString;
  tags: TString;
  is_commentable: TBoolean | TString;
}