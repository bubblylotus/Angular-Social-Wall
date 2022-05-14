import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    //redirect to login if currently not
    // if(this.userService.user == undefined || this.userService.user == null){
    //   let str = localStorage.getItem('user');
    //   if(str != null){
    //     this.userService.user = str;
    //   }
    //   else{
    //     this.router.navigate(['/login']);
    //   }
      
    // }

    this.postForm = new FormGroup({
      postText: new FormControl(''), 
      imgFile: new FormControl(null)
    })
  }


  postSchema = {
    username: '', 
    imageUrl: '', 
    text: '', 
    likes: [], 
    comments: [{username: '', comment: ''}]
  }
  selectedFile: any;
  onFileSelected($event: any){
    this.selectedFile = $event.target.files[0];
    console.log($event);
  }

  uploadImage() {
    return new Promise((resolve, reject) => {
      let n = Date.now();
      const file = this.selectedFile;
      const filePath = `images/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`images/${n}`, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          let imageURL = fileRef.getDownloadURL();
          imageURL.subscribe((url: any) => {
            if (url) {
              console.log(url);
              resolve(url);
            }
          });
        })
      ).subscribe(
        (url)=>{
          if(url){
            console.log(url);
          }
        }
      );
    });
  }

  post(){
    if(this.selectedFile != undefined || this.selectedFile != null){
      this.uploadImage().then(
        (imageURL) => {
          console.log(imageURL);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
