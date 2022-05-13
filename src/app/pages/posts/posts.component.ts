import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

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

}
