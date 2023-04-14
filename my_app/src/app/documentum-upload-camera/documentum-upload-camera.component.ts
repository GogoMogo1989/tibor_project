import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { WebcamImagesServices } from '../services/webcamimageservices';
import { AuthService } from '../services/loginservices';

@Component({
  selector: 'app-documentum-upload-camera',
  templateUrl: './documentum-upload-camera.component.html',
  styleUrls: ['./documentum-upload-camera.component.css']
})
export class DocumentumUploadCameraComponent {

  public videoOptions: any = {}; // videoOptions objektum a kamera beállításainak tárolására
  public triggerObservable: Subject<void> = new Subject<void>();
  public optionSelected!: string;
  public email: string|null = null;

  constructor(
    private webcamImagesServices: WebcamImagesServices,
    private authService: AuthService,
    ){
      this.email = authService.getEmail()
    }

  ngOnInit(): void {
    // Rendelkezésre álló médiaeszközök lekérdezése
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        // Hátsó kamera keresése
        const backCamera = devices.find(device => device.label.toLowerCase().includes('back'));
        if (backCamera) {
          this.videoOptions.deviceId = { exact: backCamera.deviceId };
        } else {
          console.error('Nincs hátsókamera.');
        }
      })
      .catch(error => {
        console.error('Hiba a médiaeszközöknél:', error);
      });
  }

  // Kamerák közötti váltás
  public switchCamera(): void {
    if (this.videoOptions.deviceId.exact === 'front') {
      this.videoOptions.deviceId.exact = 'rear';
    } else {
      this.videoOptions.deviceId.exact = 'front';
    }
  }

  // Webkamera képének rögzítése
  public webcamImageCapture(): void {
    this.triggerObservable.next();
  }

  // Webkamera inicializálási hiba kezelése
  public handleInitError(error: WebcamInitError): void {
    console.error('Webkamera iniciálása közben hiba lépett fel:', error);
  }

 // imageCapture esemény kezelése
  public handleImageCapture(event: WebcamImage): void {
    const email = this.authService.getEmail();
    console.log(email)
    console.log(this.optionSelected)
    console.log(event.imageAsDataUrl)
    console.log(event)
    if (!event || !event.imageAsDataUrl || !this.optionSelected || !email) {
      console.error('Hiányzó adatok a kép elküldése során!');
      alert("Hiányzó adatok a kép elküldése során!")
      return;
    }
    this.webcamImagesServices.sendImage(event.imageAsDataUrl, this.optionSelected, email).subscribe(
      (response) => {
        console.log('Hiba a képe elküldése során', response);
        alert('Hiba a kép elküldése során!');
      },
      (error) => {
        console.error('Kép sikeresen mentve!', error);
        alert('Kép sikeresen mentve!')
      }
    );
  }
}
