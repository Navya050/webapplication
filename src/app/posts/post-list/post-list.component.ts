import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../posts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  public posts:any;
  public newPost: Post = new Post('', '');
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private postService: PostsService, private router: Router) { }

  public  items = [
    {
      title: 'Item 1',
      description: 'This is the first item',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      title: 'Item 2',
      description: 'This is the second item',
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      title: 'Item 3',
      description: 'This is the third item',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ];

  ngOnInit(){
    this.loadPosts();
  }
  editItem(item: any) {
    console.log('Editing item:', item);
  }

  deleteItem(item: any) {
    console.log('Deleting item:', item);
  }
  public loadPosts() {
    console.log("Fetching posts...");

    this.postService.getPosts().subscribe(
        (posts) => {
            console.log('Posts loaded:', posts);
            this.posts = posts; // Set the posts to the component property
        },
        (error) => {
            console.error('Error loading posts:', error);
        }
    );
}

  public addPost(){
    this.http.post<any>(`${this.apiUrl}/`, this.newPost).subscribe(() => {
      this.loadPosts();
    })
  }

  public editPost(post: any) {
    this.http.put<any>(`${this.apiUrl}/${post.id}`, post).subscribe(() => {
      this.loadPosts();
    });
  }

  public navigatetopost(post: any) {
    this.router.navigate(["/", post._id])
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((item:any) => item._id != id )
    })
  }
}

