import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IAirportInfo,
  IDestinationInfoItem,
} from '../../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class RyanairService {
  http = inject(HttpClient);

  getAllDestinations(): Observable<IAirportInfo[]> {
    return this.http.get<IAirportInfo[]>(
      'https://www.ryanair.com/api/views/locate/5/airports/en/active'
    );
  }

  getDestinationsForSpecificCode(
    code: string
  ): Observable<IDestinationInfoItem[]> {
    return this.http.get<IDestinationInfoItem[]>(
      `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${code}`
    );
  }

  getAvailabilitiesByCodes(
    codeFrom: string,
    codeTo: string
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `https://www.ryanair.com/api/farfnd/3/oneWayFares/${codeFrom}/${codeTo}/availabilities`
    );
  }
}
