import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{
  form: FormGroup;
  public posts:any;
  post: Post = {_id: '', title: '', content: ''}
  mode: string = 'create';
  private postId: string = '';
  public newPost: Post = new Post('', '');
  private apiUrl = 'http://localhost:3000';

  
  constructor(private fb: FormBuilder,private http: HttpClient, public route:ActivatedRoute, private postService: PostsService, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')){
        this.mode ='edit';
        this.postId = <string>paramMap.get('postId');
        this.loadpost(this.postId)
      }else{
        this.mode = 'create';
        this.postId = '';
      }
    } );
    console.log(this.mode)
  }

  loadpost(id: string){
    this.postService.getPostById(id).subscribe(
      (posts) => {
          console.log('Posts loaded:', posts);
          this.post = posts;
          this.form = this.fb.group({
            title: [posts.title,Validators.required],
            content: [posts.content, Validators.required]
          });
      },
      (error) => {
          console.error('Error loading posts:', error);
      }
  );


  }

  onSubmit() {
    if (this.form.valid) {
      const { title, content } = this.form.value;
      console.log('Form Submitted:', { title, content });
      if(this.mode == 'create'){
        this.postService.createPost(this.form.value)
      }else{
        this.postService.updatePost(this.postId, this.form.value).subscribe(() => {
          this.router.navigate(["/"])
        })
      }
      // You can handle the form data here (e.g., send it to a server)
    }
  }
}
