import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Image } from './models/image.model';
import { PhotoService } from './photo.service';
import { UpdateImage } from './models/update-image.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css'
})
export class PhotoComponent implements OnInit, OnDestroy{

  images$?: Observable<Image[]>;

  imageUpdateSubscription?: Subscription;
  constructor(private photoService: PhotoService) {

  }
  ngOnDestroy(): void {
    this.imageUpdateSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.images$ = this.photoService.getAllPhotos();
  }

  toggleLike(image: Image) {
    image.likes = image.likes + 1;
    var updateImage: UpdateImage ={
      likes: image.likes
    }
    this.imageUpdateSubscription = this.photoService.updatePhoto(image.id, updateImage)
    .subscribe({
      next: (response) => {

      }
    });

  }
}
