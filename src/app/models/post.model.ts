export interface Post {
  id?: number;
  textArabic: string;
  textEnglish: string;
  voiceFileBase64?: string;
  textWithTashkeel: string;
  headerPhotoBase64?: string;
  title?: string; // Added title
  level?: string; // Added level
  topic?: string; // Added topic
}

export interface PostRequest {
  arabicText: string;
  voiceFileBase64?: string;
  headerPhotoBase64?: string;
  title?: string; // Added title
  level?: string; // Added level
  topic?: string; // Added topic
}

// Interface for pagination details
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

// Interface for the paginated response
export interface PaginatedPosts {
  content: Post[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}