import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, TrendingUp, Tag } from 'lucide-react';
import { getHomePageData } from '@/lib/data';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Khám phá những bài viết mới nhất về công nghệ, tips & tricks, review sản phẩm và nhiều chủ đề thú vị khác.',
};

// Server Component for better SEO and performance
export default function HomePage() {
  const { featuredArticles, latestArticles, popularArticles, categories, tags } = getHomePageData();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Blog</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                Trang chủ
              </Link>
              <Link href="/category" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                Danh mục
              </Link>
              <Link href="/search" className="text-gray-600 hover:text-blue-500 font-medium transition-colors">
                Tìm kiếm
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Banner */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={featuredArticles[0].image || '/images/hero-bg.jpg'}
                alt={featuredArticles[0].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="relative h-full flex items-end">
                <div className="p-8 text-white max-w-2xl">
                  <span className="bg-blue-500 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block">
                    {featuredArticles[0].category.name}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {featuredArticles[0].title}
                  </h1>
                  <p className="text-lg opacity-90 mb-6 line-clamp-2">
                    {featuredArticles[0].excerpt}
                  </p>
                  <Link
                    href={`/article/${featuredArticles[0].slug}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 inline-block"
                  >
                    Đọc tiếp
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Bài viết mới nhất</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestArticles.map((article) => (
                  <article key={article.id} className="article-card">
                    <div className="relative">
                      <Image
                        src={article.image || '/images/placeholder.jpg'}
                        alt={article.title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover"
                      />
                      <Link
                        href={`/category/${article.category.slug}`}
                        className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-600"
                      >
                        {article.category.name}
                      </Link>
                    </div>
                    <div className="p-4">
                      <Link href={`/article/${article.slug}`}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-500 transition-colors">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>
                              {formatDistance(new Date(article.createdAt), new Date(), { 
                                addSuffix: true, 
                                locale: vi 
                              })}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User size={12} />
                            <span>{article.author.name}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                      >
                        Đọc tiếp →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 space-y-6">
            {/* Popular Posts */}
            <div className="card p-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <TrendingUp className="mr-2 text-blue-500" size={20} />
                Bài viết phổ biến
              </h3>
              <div className="space-y-4">
                {popularArticles.slice(0, 5).map((post) => (
                  <article key={post.id} className="flex space-x-3">
                    <Image
                      src={post.image || '/images/placeholder.jpg'}
                      alt={post.title}
                      width={80}
                      height={60}
                      className="w-20 h-15 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <Link href={`/article/${post.slug}`}>
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-blue-500 transition-colors mb-1">
                          {post.title}
                        </h4>
                      </Link>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{post.views} lượt xem</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="card p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh mục</h3>
              <div className="space-y-2">
                {categories.slice(0, 6).map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700 hover:text-blue-500">
                      {category.name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {category.postCount}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="card p-4">
              <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <Tag className="mr-2 text-blue-500" size={20} />
                Từ khóa phổ biến
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 10).map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/search?q=${encodeURIComponent(tag.name)}`}
                    className="inline-block bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-bold">Blog</span>
              </Link>
              <p className="text-gray-300 mb-4 max-w-md">
                Website blog chia sẻ những thông tin hữu ích, tips và mẹo trong cuộc sống. 
                Cập nhật những xu hướng mới nhất và review sản phẩm chất lượng.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-blue-500">Về chúng tôi</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-blue-500">Liên hệ</Link></li>
                <li><Link href="/privacy" className="text-gray-300 hover:text-blue-500">Chính sách bảo mật</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Nhận thông báo về những bài viết mới nhất
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Blog Website. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
