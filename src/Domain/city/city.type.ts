export interface IItemCity {
  adminCode1?: number;
  lng: number;
  geonameId?: number;
  toponymName?: string;
  countryId?: number;
  fcl?: string;
  population?: number;
  countryCode?: string;
  name: string;
  fclName?: string;
  adminCodes1?: {
    ISO3166_2: string;
  };
  countryName?: string;
  fcodeName?: string;
  adminName1?: string;
  lat: number;
  fcode?: string;
}

export interface ICity {
  keyword: string;
  city: IItemCity | null;
  loadingCity: boolean;
  errorCity: unknown;
}
