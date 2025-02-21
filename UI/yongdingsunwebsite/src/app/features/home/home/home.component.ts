import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Weather } from './models/weather-model';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  weather?: Weather
  time: string = '';
  apiKey: string = '872e1e75eb4d39a904e2119eb69da138';
  homeSubscription?: Subscription;
  constructor(private homeService: HomeService) {}

  ngOnDestroy(): void {
    this.homeSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserLocation();
    setInterval(() => this.updateTime(), 1000); // Update time every second
  }
  
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeather(lat, lon);
        },
        (error) => {
          console.error('Error fetching location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getWeather(lat: number, lon: number) {
    this.homeSubscription = this.homeService.getWeather(lat,lon,this.apiKey)
    .subscribe({
      next: (response) => {
        this.weather = response;
      }
    });
  }
  updateTime() {
    this.time = new Date().toLocaleTimeString();
  }
}
