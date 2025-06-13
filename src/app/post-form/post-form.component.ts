import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule here
import { PostService } from '../services/post.service';
import { LookupValueService } from '../services/lookup-value.service'; // Import LookupValueService
import { PostRequest } from '../models/post.model';
import { LookupValue } from '../models/lookup-value.model'; // Import LookupValue model
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  levels: LookupValue[] = []; // Property to store level lookup values
  topics: LookupValue[] = []; // Property to store topic lookup values

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private lookupValueService: LookupValueService, // Inject LookupValueService
    private router: Router
  ) {
    this.postForm = this.fb.group({
      arabicText: ['', Validators.required],
      voiceFile: [null],
      headerPhoto: [null],
      level: [''], // Added level form control
      topic: ['']  // Added topic form control
    });
  }

  ngOnInit(): void {  

    // Fetch level lookup values
    this.lookupValueService.getLookupValuesByCode('LEVEL').subscribe({
      next: (data) => {
        this.levels = data;
      },
      error: (error) => {
        console.error('Error fetching level lookup values:', error);
      }
    });

    // Fetch topic lookup values
    this.lookupValueService.getLookupValuesByCode('TOPIC').subscribe({
      next: (data) => {
        this.topics = data;
      },
      error: (error) => {
        console.error('Error fetching topic lookup values:', error);
      }
    });
  }

  onFileChange(event: any, fileType: 'voice' | 'photo'): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // Extract Base64 string from data URL
        const base64String = reader.result as string;
        const base64Content = base64String.split(',')[1];
        console.log(`Extracted Base64 for ${fileType}:`, base64Content); // Add this line

        if (fileType === 'voice') {
          this.postForm.patchValue({
            voiceFile: base64Content
          });
        } else {
          this.postForm.patchValue({
            headerPhoto: base64Content
          });
        }
      };
    }
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const postRequest: PostRequest = {
      arabicText: this.postForm.value.arabicText,
      voiceFileBase64: this.postForm.value.voiceFile,
      headerPhotoBase64: this.postForm.value.headerPhoto,
      level: this.postForm.value.level, // Include level in request
      topic: this.postForm.value.topic  // Include topic in request
    };

    this.postService.createPost(postRequest).subscribe({
      next: (response) => {
        this.successMessage = 'Post created successfully!';
        this.loading = false;
        this.postForm.reset();
        // Optionally navigate to the post list page after successful creation
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        this.errorMessage = 'Error creating post. Please try again.';
        this.loading = false;
      }
    });
  }
}
