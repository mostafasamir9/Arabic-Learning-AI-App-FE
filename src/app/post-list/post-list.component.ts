import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Import DomSanitizer and SafeUrl
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer, // Inject DomSanitizer
    private router: Router // Inject Router
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.content; // Extract the array of posts from the 'content' property
        console.log('Fetched paginated posts:', data); // Log the full paginated response
        console.log('Extracted posts:', this.posts); // Log the extracted posts array
        // Log base64 and the full data URL for the first post with voice data, if any
        const postWithVoice = this.posts.find(p => p.voiceFileBase64);
        if (postWithVoice) {
          console.log('Base64 for first post with voice:', postWithVoice.voiceFileBase64);
          console.log('Full Data URL for first post with voice:', 'data:audio/mpeg;base64,' + postWithVoice.voiceFileBase64); // Log the full data URL
        }
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        // Handle error, e.g., display an error message to the user
      }
    });
  }

  // Method to sanitize the base64 data URL
  getSafeAudioUrl(base64: string | undefined): SafeUrl | undefined {
    if (base64) {
      const dataUrl = 'data:audio/mpeg;base64,' + base64;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return undefined;
  }

  viewPostDetails(postId: number | undefined): void {
    if (postId) {
      this.router.navigate(['/posts', postId]);
    }
  }
}
