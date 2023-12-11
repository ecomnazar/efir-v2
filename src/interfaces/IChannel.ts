import { TNumber, TString } from "./IGlobal";

export interface IChannel {
  avatar?: TString
  category?: TNumber;
  id: TNumber;
  name: TString;
}
