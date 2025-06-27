import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightFaresResponse } from '../../models/fares.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  getFlightFares(fromCode: string, toCode: string, date: string) {
    return this.http.get<FlightFaresResponse>(
      `/api/get-flight-fares?fromCode=${fromCode}&toCode=${toCode}&date=${date}`
    );
  }

  startFlightToAnalyzing(fromCode: string, toCode: string, date: string) {
    return this.http.get(
      `/api/start-flight-to-analyzing?fromCode=${fromCode}&toCode=${toCode}&date=${date}`
    );
  }

  stopFlightFromAnalyzing(fromCode: string, toCode: string, date: string) {
    return this.http.get(
      `/api/stop-flight-from-analyzing?fromCode=${fromCode}&toCode=${toCode}&date=${date}`
    );
  }
}
