import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../posts.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: any;
  public newPost: Post = new Post('', '');
  private apiUrl = 'http://localhost:3000';
  public isLoading = true;
  private authStatusSub: Subscription = new Subscription();
  userIsAuthenticated: boolean = false;

  constructor(
    private http: HttpClient,
    private postService: PostsService,
    private router: Router,
    private authService: AuthService
  ) {}

  public items = [
    {
      title: 'Item 1',
      description: 'This is the first item',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Item 2',
      description: 'This is the second item',
      content:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      title: 'Item 3',
      description: 'This is the third item',
      content:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((status) => {
        this.userIsAuthenticated = status;
      });
    this.loadPosts();
  }
  editItem(item: any) {
    console.log('Editing item:', item);
  }

  deleteItem(item: any) {
    console.log('Deleting item:', item);
  }
  public loadPosts() {
    console.log('Fetching posts...');

    this.postService.getPosts().subscribe(
      (posts) => {
        console.log('Posts loaded:', posts);
        this.isLoading = false;
        this.posts = posts; 
      },
      (error) => {
        console.error('Error loading posts:', error);
      }
    );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((status) => {
        this.userIsAuthenticated = status;
      });
  }

  public addPost() {
    this.http.post<any>(`${this.apiUrl}/`, this.newPost).subscribe(() => {
      this.loadPosts();
    });
  }

  public editPost(post: any) {
    this.http.put<any>(`${this.apiUrl}/${post.id}`, post).subscribe(() => {
      this.loadPosts();
    });
  }

  public navigatetopost(post: any) {
    this.router.navigate(['/edit/', post._id]);
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((item: any) => item._id != id);
    });
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}
