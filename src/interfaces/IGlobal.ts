import React from "react";

export type TChildren = React.ReactNode;
export type TString = string;
export type TNumber = number;
export type TBoolean = boolean;

export interface IChildren {
  children: React.ReactNode;
}

export interface IRegion {
  id: number;
  slug: string;
  name: string;
}

export interface ICity {
  id: number;
  slug: string;
  name: string;
  region: number;
}
