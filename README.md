# Blog Website - Next.js 15

Website blog hiện đại được xây dựng với Next.js 15, TypeScript và Tailwind CSS. Dự án được tối ưu hóa cho hiệu suất và SEO với hỗ trợ Server-Side Rendering (SSR) và Static Site Generation (SSG).

## 🚀 Tính năng chính

### Frontend
- **Modern UI**: Giao diện đẹp và responsive với Tailwind CSS
- **SEO Optimized**: Tối ưu SEO với metadata, structured data và sitemap
- **Performance**: Tối ưu hiệu suất với Next.js Image, lazy loading
- **TypeScript**: Type safety cho toàn bộ dự án
- **Server Components**: Sử dụng React Server Components mới nhất

### Tính năng Blog
- ✅ Trang chủ với banner slider và danh sách bài viết
- ✅ Trang chi tiết bài viết với breadcrumb và sharing
- ✅ Sidebar với bài viết phổ biến, danh mục, tag cloud
- ✅ Responsive design cho mọi thiết bị
- ✅ Tích hợp social media sharing
- ✅ Structured data cho Google (JSON-LD)
- ✅ Sitemap và robots.txt tự động

### SEO & Performance
- ✅ Open Graph và Twitter Card metadata
- ✅ Canonical URLs
- ✅ Image optimization với Next.js Image
- ✅ Automatic sitemap generation
- ✅ Google-friendly structured data
- ✅ Lazy loading và code splitting

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Build Tool**: Next.js built-in
- **Deployment**: Vercel Ready

## 📦 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 18.17 trở lên
- npm hoặc yarn

### Cài đặt
```bash
# Clone repository
git clone <your-repo-url>
cd blog-nextjs

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

### Scripts có sẵn

```bash
# Development
npm run dev          # Chạy development server

# Production
npm run build        # Build production
npm run start        # Chạy production server

# Utilities
npm run lint         # Kiểm tra code quality
```

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── article/[slug]/     # Dynamic article pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # Shared components
├── lib/                   # Utilities và data
│   └── data.ts           # Mock data
├── types/                 # TypeScript types
│   └── blog.ts           # Blog-related types
public/                    # Static assets
├── images/               # Images
└── favicon.ico           # Favicon
```

## 🎨 Customization

### Thay đổi màu sắc chủ đạo
Cập nhật `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',  // Màu chính
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Thay đổi font
Cập nhật `src/app/layout.tsx`:

```typescript
import { Inter } from "next/font/google";

const inter = Inter({ 
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});
```

### Thêm data thực
1. Thay thế mock data trong `src/lib/data.ts`
2. Kết nối với CMS hoặc database
3. Cập nhật TypeScript types trong `src/types/blog.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Kết nối repository với Vercel
3. Deploy tự động

### Manual Deployment
```bash
# Build project
npm run build

# Start production server
npm run start
```

## 📊 SEO Features

### Metadata tự động
- Title và description cho mỗi trang
- Open Graph tags cho social sharing
- Twitter Card metadata
- Canonical URLs

### Structured Data
- Article schema cho bài viết
- Organization schema cho website
- Breadcrumb schema

### Sitemap
- Tự động generate sitemap.xml
- Include tất cả articles và categories
- Update timestamp tự động

## 🔧 Configuration

### Environment Variables
Tạo file `.env.local`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=Blog Website

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Database (for future)
DATABASE_URL=your-database-url
```

### Next.js Config
Cấu hình trong `next.config.ts`:
- Image optimization
- Security headers
- Compression
- Remote patterns cho images

## 📱 Responsive Design

Website hoạt động tốt trên:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔍 SEO Checklist

- ✅ Meta tags đầy đủ
- ✅ Open Graph và Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Image alt tags
- ✅ Semantic HTML
- ✅ Page speed optimization

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

- Website: [https://yourdomain.com](https://yourdomain.com)
- Email: contact@yourdomain.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework  
- [Lucide React](https://lucide.dev/) - Icon library
- [Unsplash](https://unsplash.com/) - Stock photos
