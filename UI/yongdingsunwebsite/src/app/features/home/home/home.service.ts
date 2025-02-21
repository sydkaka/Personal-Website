import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from './models/weather-model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number, apiKey: string) : Observable<Weather> {
      return this.http.get<Weather>(`${environment.openWeatherUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    }
}
