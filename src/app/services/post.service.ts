import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostRequest, PaginatedPosts } from '../models/post.model'; // Import PaginatedPosts

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/posts'; // Assuming your backend runs on localhost:8080

  constructor(private http: HttpClient) { }

  getAllPosts(page: number = 0, size: number = 10): Observable<PaginatedPosts> {
    return this.http.get<PaginatedPosts>(`${this.apiUrl}/paginated?page=${page}&size=${size}`);
  }

  createPost(postRequest: PostRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/translate-and-save`, postRequest);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
}
