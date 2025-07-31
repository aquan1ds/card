import { Article, Category, Tag, Author, HomePageData } from '@/types/blog';

// Mock Authors
export const mockAuthors: Author[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@blog.com',
    avatar: '/images/avatars/admin.jpg',
    bio: 'Quản trị viên website',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Tech Writer',
    email: 'tech@blog.com',
    avatar: '/images/avatars/tech.jpg',
    bio: 'Chuyên gia công nghệ',
    role: 'author'
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Công nghệ', slug: 'cong-nghe', postCount: 15, color: '#3B82F6' },
  { id: '2', name: 'Tips & Mẹo', slug: 'tips', postCount: 23, color: '#10B981' },
  { id: '3', name: 'Review', slug: 'review', postCount: 12, color: '#F59E0B' },
  { id: '4', name: 'Giáo dục', slug: 'giao-duc', postCount: 8, color: '#8B5CF6' },
  { id: '5', name: 'Ẩm thực', slug: 'am-thuc', postCount: 18, color: '#EF4444' },
  { id: '6', name: 'Du lịch', slug: 'du-lich', postCount: 11, color: '#06B6D4' },
  { id: '7', name: 'Làm đẹp', slug: 'lam-dep', postCount: 14, color: '#EC4899' }
];

// Mock Tags
export const mockTags: Tag[] = [
  { id: '1', name: 'JavaScript', count: 15 },
  { id: '2', name: 'React', count: 12 },
  { id: '3', name: 'Next.js', count: 8 },
  { id: '4', name: 'CSS', count: 18 },
  { id: '5', name: 'HTML', count: 8 },
  { id: '6', name: 'Node.js', count: 6 },
  { id: '7', name: 'WordPress', count: 10 },
  { id: '8', name: 'SEO', count: 14 },
  { id: '9', name: 'Mobile', count: 9 },
  { id: '10', name: 'Design', count: 7 }
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Những xu hướng công nghệ hot nhất năm 2024',
    slug: 'xu-huong-cong-nghe-2024',
    excerpt: 'Khám phá những công nghệ đột phá sẽ thay đổi thế giới trong năm 2024, từ AI generative đến Web3...',
    content: `
      <h2>Artificial Intelligence và Machine Learning</h2>
      <p>AI tiếp tục là xu hướng hàng đầu với những đột phá mới trong việc xử lý ngôn ngữ tự nhiên...</p>
      
      <h2>Web3 và Blockchain</h2>
      <p>Công nghệ blockchain không chỉ dừng lại ở cryptocurrency mà còn mở rộng ra nhiều lĩnh vực khác...</p>
    `,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    category: mockCategories[0],
    tags: ['AI', 'Machine Learning', 'Web3', 'Blockchain'],
    author: mockAuthors[1],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    status: 'published',
    featured: true,
    views: 1250,
    readingTime: 5,
    seo: {
      metaTitle: 'Top xu hướng công nghệ 2024 - Không thể bỏ qua',
      metaDescription: 'Cập nhật những xu hướng công nghệ mới nhất 2024 từ AI, Web3 đến IoT',
      keywords: ['công nghệ 2024', 'AI', 'Web3', 'xu hướng tech']
    }
  },
  {
    id: '2',
    title: '10 mẹo tiết kiệm điện hiệu quả cho gia đình',
    slug: 'meo-tiet-kiem-dien',
    excerpt: 'Hướng dẫn chi tiết cách giảm hóa đơn tiền điện mỗi tháng với những mẹo đơn giản nhưng hiệu quả...',
    content: `
      <h2>1. Sử dụng thiết bị tiết kiệm năng lượng</h2>
      <p>Đầu tư vào các thiết bị có nhãn Energy Star để tiết kiệm điện năng dài hạn...</p>
      
      <h2>2. Tối ưu hóa việc sử dụng điều hòa</h2>
      <p>Điều chỉnh nhiệt độ phù hợp và bảo dưỡng định kỳ để tiết kiệm tối đa...</p>
    `,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    category: mockCategories[1],
    tags: ['Tiết kiệm điện', 'Gia đình', 'Mẹo hay'],
    author: mockAuthors[0],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'published',
    featured: true,
    views: 890,
    readingTime: 3
  },
  {
    id: '3',
    title: 'Review chi tiết iPhone 15 Pro Max: Đáng mua hay không?',
    slug: 'review-iphone-15-pro-max',
    excerpt: 'Đánh giá toàn diện về thiết kế, hiệu năng, camera và thời lượng pin của iPhone 15 Pro Max...',
    content: `
      <h2>Thiết kế và chất lượng xây dựng</h2>
      <p>iPhone 15 Pro Max với khung titan mới mang lại cảm giác premium và nhẹ hơn...</p>
      
      <h2>Hiệu năng chip A17 Pro</h2>
      <p>Chip A17 Pro được sản xuất trên tiến trình 3nm mang lại hiệu năng vượt trội...</p>
    `,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=400&fit=crop',
    category: mockCategories[2],
    tags: ['iPhone', 'Apple', 'Smartphone', 'Review'],
    author: mockAuthors[1],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'published',
    featured: false,
    views: 2100,
    readingTime: 8
  },
  {
    id: '4',
    title: 'Cách tạo blog cá nhân với Next.js và TypeScript',
    slug: 'tao-blog-nextjs-typescript',
    excerpt: 'Hướng dẫn từng bước tạo blog cá nhân hiện đại với Next.js 15, TypeScript và Tailwind CSS...',
    content: `
      <h2>Cài đặt và thiết lập dự án</h2>
      <p>Bắt đầu với việc tạo project Next.js mới và cấu hình TypeScript...</p>
      
      <h2>Thiết kế giao diện với Tailwind CSS</h2>
      <p>Sử dụng Tailwind CSS để tạo giao diện responsive và đẹp mắt...</p>
    `,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    category: mockCategories[0],
    tags: ['Next.js', 'TypeScript', 'Blog', 'Web Development'],
    author: mockAuthors[1],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    status: 'published',
    featured: false,
    views: 567,
    readingTime: 12
  },
  {
    id: '5',
    title: 'Top 5 ứng dụng học tiếng Anh hiệu quả nhất 2024',
    slug: 'app-hoc-tieng-anh-2024',
    excerpt: 'Tổng hợp những ứng dụng học tiếng Anh được đánh giá cao nhất với phương pháp học tương tác...',
    content: `
      <h2>1. Duolingo - Học qua game</h2>
      <p>Duolingo biến việc học tiếng Anh thành trò chơi thú vị với hệ thống điểm và level...</p>
      
      <h2>2. Babbel - Học theo tình huống thực tế</h2>
      <p>Babbel tập trung vào việc dạy ngôn ngữ trong các tình huống thực tế hàng ngày...</p>
    `,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    category: mockCategories[3],
    tags: ['Tiếng Anh', 'Học tập', 'Mobile App', 'Giáo dục'],
    author: mockAuthors[0],
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    updatedAt: new Date(Date.now() - 345600000).toISOString(),
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    status: 'published',
    featured: false,
    views: 743,
    readingTime: 6
  }
];

// Utility functions
export const getFeaturedArticles = (): Article[] => {
  return mockArticles.filter(article => article.featured);
};

export const getLatestArticles = (limit: number = 6): Article[] => {
  return mockArticles
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getPopularArticles = (limit: number = 5): Article[] => {
  return mockArticles
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (categorySlug: string): Article[] => {
  return mockArticles.filter(article => article.category.slug === categorySlug);
};

export const searchArticles = (query: string): Article[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getHomePageData = (): HomePageData => {
  return {
    featuredArticles: getFeaturedArticles(),
    latestArticles: getLatestArticles(),
    popularArticles: getPopularArticles(),
    categories: mockCategories,
    tags: mockTags
  };
};