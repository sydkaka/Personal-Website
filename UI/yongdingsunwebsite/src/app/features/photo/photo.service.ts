import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from './models/image.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UpdateImage } from './models/update-image.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  getAllPhotos() : Observable<Image[]> {
    return this.http.get<Image[]>(`${environment.apiBaseUrl}/api/Images`);
  }

  updatePhoto(id: string, updatedImage: UpdateImage): Observable<Image> {
    return this.http.put<Image>(`${environment.apiBaseUrl}/api/Images/${id}`, updatedImage);
  }
}
