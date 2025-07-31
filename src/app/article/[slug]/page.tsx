import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Clock, Share2, ArrowLeft } from 'lucide-react'
import { getArticleBySlug, mockArticles } from '@/lib/data'
import { formatDistance } from 'date-fns'
import { vi } from 'date-fns/locale'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return mockArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: 'Bài viết không tồn tại',
    }
  }

  return {
    title: article.seo?.metaTitle || article.title,
    description: article.seo?.metaDescription || article.excerpt,
    keywords: article.seo?.keywords || article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.seo?.ogImage || article.image || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.seo?.ogImage || article.image || '/og-image.jpg'],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Blog Website',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourdomain.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yourdomain.com/article/${article.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
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
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-blue-500">Trang chủ</Link>
            <span>/</span>
            <Link href={`/category/${article.category.slug}`} className="hover:text-blue-500">
              {article.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-blue-500 mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Quay lại trang chủ
            </Link>

            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Article Header */}
              <div className="relative h-64 md:h-96">
                <Image
                  src={article.image || '/images/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600"
                  >
                    {article.category.name}
                  </Link>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>
                      {formatDistance(new Date(article.createdAt), new Date(), { 
                        addSuffix: true, 
                        locale: vi 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{article.readingTime} phút đọc</span>
                  </div>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
                    <Share2 size={16} />
                    <span>Chia sẻ</span>
                  </button>
                </div>

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Từ khóa:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/search?q=${encodeURIComponent(tag)}`}
                          className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center space-x-4">
                  <Image
                    src={article.author.avatar || '/images/avatars/default.jpg'}
                    alt={article.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{article.author.name}</h4>
                    <p className="text-gray-600">{article.author.bio}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <p className="text-gray-400">
                © 2024 Blog Website. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}