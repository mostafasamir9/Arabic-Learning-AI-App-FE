import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post, PaginatedPosts } from '../models/post.model'; // Import PaginatedPosts
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LookupValueService } from '../services/lookup-value.service'; // Import LookupValueService
import { LookupValue } from '../models/lookup-value.model'; // Import LookupValue

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  levels: LookupValue[] = [];
  topics: LookupValue[] = [];
  selectedLevelCode: string = ''; // Changed to store the level code
  selectedTopicCode: string = ''; // Changed to store the topic code

  constructor(
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private lookupValueService: LookupValueService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadLookupValues();
  }

  loadPosts(): void {
    // Pass the selected codes to the service
    this.postService.getAllPosts(this.currentPage, this.pageSize, this.selectedLevelCode, this.selectedTopicCode).subscribe({
      next: (data: PaginatedPosts) => {
        this.posts = data.content;
        this.totalPages = data.totalPages;
        console.log('Fetched paginated posts:', data);
        console.log('Extracted posts:', this.posts);
        const postWithVoice = this.posts.find(p => p.voiceFileBase64);
        if (postWithVoice) {
          console.log('Base64 for first post with voice:', postWithVoice.voiceFileBase64);
          console.log('Full Data URL for first post with voice:', 'data:audio/mpeg;base64,' + postWithVoice.voiceFileBase64);
        }
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  loadLookupValues(): void {
    this.lookupValueService.getLookupValuesByCode('LEVEL').subscribe({
      next: (data) => {
        this.levels = data;
      },
      error: (error) => {
        console.error('Error fetching level lookup values:', error);
      }
    });

    this.lookupValueService.getLookupValuesByCode('TOPIC').subscribe({
      next: (data) => {
        this.topics = data;
      },
      error: (error) => {
        console.error('Error fetching topics:', error);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPosts();
    }
  }

  applyFilters(): void {
    this.currentPage = 0; // Reset to the first page when applying filters
    this.loadPosts();
  }

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
