import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadImageService {

  constructor(private http : HttpClient) { }

  postUserFile(caption: string, fileToUpload: File) {
    const serverUrl = 'http://localhost:50181/api/UploadUserImage';
    const formData: FormData = new FormData();

    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(serverUrl, formData);
  }

  postCarFile(caption: string, fileToUpload: File) {
    const serverUrl = 'http://localhost:50181/api/UploadCarImage';
    const formData: FormData = new FormData();

    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(serverUrl, formData);
  }

}