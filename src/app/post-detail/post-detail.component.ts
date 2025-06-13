import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { PostService } from '../services/post.service'; // Import PostService
import { Post } from '../models/post.model'; // Import Post model
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Import DomSanitizer and SafeUrl

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined; // Property to hold the post details

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private postService: PostService, // Inject PostService
    private sanitizer: DomSanitizer // Inject DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.postService.getPostById(+postId).subscribe({ // Use + to convert string to number
          next: (data) => {
            this.post = data;
            console.log('Fetched post details:', this.post); // Log the fetched post
          },
          error: (error) => {
            console.error('Error fetching post details:', error);
            // Handle error, e.g., display an error message to the user
          }
        });
      }
    });
  }

  // Method to sanitize the base64 audio data URL
  getSafeAudioUrl(base64: string | undefined): SafeUrl | undefined {
    if (base64) {
      const dataUrl = 'data:audio/mpeg;base64,' + base64;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return undefined;
  }

  // Method to sanitize the base64 image data URL
  getSafeImageUrl(base64: string | undefined): SafeUrl | undefined {
    if (base64) {
      const dataUrl = 'data:image/jpeg;base64,' + base64;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return undefined;
  }
}
