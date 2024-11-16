import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
    posts: any;
    postUpdated: any;
    private apiUrl = 'http://localhost:3000/api/posts';
    constructor(private http: HttpClient, private router: Router){}
  private data: string[] = [];
  getPosts() {

    return this.http.get<any>(this.apiUrl)

    
}

  getPostById(id: string) {
    return  this.http.get<any>(`${this.apiUrl}/${id}`)
  }
  deletePost(id:string){
    return  this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
  createPost(data:any){
    return this.http.post<any>(`${this.apiUrl}/`, data).subscribe(() => {
        this.router.navigate(["/"])
      })
  }
  updatePost(id:string, data:any){
    console.log("called")
    return this.http.put<any>(`${this.apiUrl}/${id}`, data)
  }
}