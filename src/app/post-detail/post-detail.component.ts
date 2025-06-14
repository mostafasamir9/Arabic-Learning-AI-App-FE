import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  showEnglishTranslation: boolean = true; // Toggle for English translation
  showTashkeel: boolean = true; // Toggle for Tashkeel

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = params.get('id');
      if (postId) {
        this.postService.getPostById(+postId).subscribe({
          next: (data) => {
            this.post = data;
            console.log('Fetched post details:', this.post);
          },
          error: (error) => {
            console.error('Error fetching post details:', error);
          }
        });
      }
    });
  }

  toggleEnglishTranslation(): void {
    this.showEnglishTranslation = !this.showEnglishTranslation;
  }

  toggleTashkeel(): void {
    this.showTashkeel = !this.showTashkeel;
  }

  getSafeAudioUrl(base64: string | undefined): SafeUrl | undefined {
    if (base64) {
      const dataUrl = 'data:audio/mpeg;base64,' + base64;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return undefined;
  }

  getSafeImageUrl(base64: string | undefined): SafeUrl | undefined {
    if (base64) {
      const dataUrl = 'data:image/jpeg;base64,' + base64;
      return this.sanitizer.bypassSecurityTrustUrl(dataUrl);
    }
    return undefined;
  }
}
