import { TNumber, TString } from "./IGlobal";

export interface IStory {
  channel: {
    id: TNumber;
    name: TString;
    avatar: TString;
    category: TNumber;
  };
  created_at: TString;
  id: TNumber;
  image: TString;
  link: TString | null;
  type: TString;
  video: TString | null;
}
