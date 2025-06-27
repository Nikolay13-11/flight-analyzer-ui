interface Price {
  value: number;
  valueMainUnit: string;
  valueFractionalUnit: string;
  currencyCode: string;
  currencySymbol: string;
}

export interface Fare {
  day: string;
  arrivalDate: string | null;
  departureDate: string | null;
  price: Price | null;
  soldOut: boolean;
  unavailable: boolean;
}

interface FareDetails {
  day: string;
  arrivalDate: string;
  departureDate: string;
  price: Price;
  soldOut: boolean;
  unavailable: boolean;
}

interface Outbound {
  fares: Fare[];
  minFare: FareDetails;
  maxFare: FareDetails;
}

export interface FlightFaresResponse {
  outbound: Outbound;
}
