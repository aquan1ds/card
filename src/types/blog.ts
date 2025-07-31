export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'admin' | 'editor' | 'author';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  images?: string[];
  category: Category;
  tags: string[];
  author: Author;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  views: number;
  readingTime: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface ArticleListResponse {
  articles: Article[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface HomePageData {
  featuredArticles: Article[];
  latestArticles: Article[];
  popularArticles: Article[];
  categories: Category[];
  tags: Tag[];
}

export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'latest' | 'popular' | 'oldest';
  page?: number;
  limit?: number;
}

export interface Comment {
  id: string;
  articleId: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  replies?: Comment[];
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo?: string;
  favicon?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  seo: {
    defaultMetaDescription: string;
    defaultKeywords: string[];
    ogImage: string;
    googleAnalyticsId?: string;
    googleSiteVerification?: string;
  };
  features: {
    comments: boolean;
    newsletter: boolean;
    search: boolean;
    darkMode: boolean;
  };
}