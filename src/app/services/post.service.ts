import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpParams
import { Observable } from 'rxjs';
import { Post, PostRequest, PaginatedPosts } from '../models/post.model'; // Import PaginatedPosts
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) { }

  getAllPosts(page: number = 0, size: number = 10, level?: string, topic?: string): Observable<PaginatedPosts> { // Add optional level and topic parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (level) {
      params = params.set('level', level);
    }
    if (topic) {
      params = params.set('topic', topic);
    }

    return this.http.get<PaginatedPosts>(`${this.apiUrl}/paginated`, { params }); // Pass params object
  }

  createPost(postRequest: PostRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/translate-and-save`, postRequest);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
}
