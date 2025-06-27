export interface IAirportInfo {
  code: string;
  name: string;
  seoName: string;
  aliases: string[];
  base: boolean;
  city: {
    name: string;
    code: string;
  };
  region: {
    name: string;
    code: string;
  };
  country: {
    code: string;
    iso3code: string;
    name: string;
    currency: string;
    defaultAirportCode: string;
    schengen: boolean;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timeZone: string;
}

export interface IDestinationInfoItem {
  arrivalAirport: IAirportInfo;
  recent: boolean;
  seasonal: boolean;
  operator: string;
  tags: string[];
}
