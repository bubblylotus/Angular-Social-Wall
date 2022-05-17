import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  saveNewPost(post: any){
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/posts', post).subscribe(
        (response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
