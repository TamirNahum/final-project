import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-info.service';
import { MyLink } from './my-link.service';

@Injectable()
export class UploadImageService {

  constructor(private http : HttpClient,private myUserService:UserService) { }

  postUserFile(caption: string, fileToUpload: File) {
    const serverUrl = MyLink.link+'/api/UploadUserImage';
    const formData: FormData = new FormData();

    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(serverUrl, formData);
  }

  postCarFile(caption: string, fileToUpload: File) {
    const serverUrl = MyLink.link+'/api/UploadCarImage';
    const formData: FormData = new FormData();

    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(serverUrl, formData);
  }

}