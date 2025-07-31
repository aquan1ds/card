import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { formatDistance } from 'date-fns'
import { vi } from 'date-fns/locale'

const ArticleCard = ({ article }) => {
  const shareUrl = `${window.location.origin}/article/${article.slug}`
  
  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    }
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400')
    }
  }

  return (
    <article className="article-card group">
      {/* Article Image */}
      <div className="relative overflow-hidden">
        <Link to={`/article/${article.slug}`}>
          <img
            src={article.image || '/api/placeholder/400/240'}
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
        
        {/* Category Badge */}
        {article.category && (
          <Link
            to={`/category/${article.category.slug}`}
            className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-primary-600 transition-colors duration-200"
          >
            {article.category.name}
          </Link>
        )}

        {/* Share Button */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="relative group/share">
            <button className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200">
              <Share2 size={16} />
            </button>
            
            {/* Share Dropdown */}
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[120px] opacity-0 group-hover/share:opacity-100 transform scale-95 group-hover/share:scale-100 transition-all duration-200 z-10">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Facebook size={16} className="mr-2 text-blue-600" />
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Twitter size={16} className="mr-2 text-blue-400" />
                Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Linkedin size={16} className="mr-2 text-blue-700" />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-4">
        {/* Title */}
        <Link to={`/article/${article.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors duration-200">
            {article.title}
          </h3>
        </Link>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.excerpt || article.summary}
        </p>

        {/* Meta Information */}
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
              <span>{article.author || 'Admin'}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{article.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Read More Button */}
        <Link
          to={`/article/${article.slug}`}
          className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm transition-colors duration-200"
        >
          Đọc tiếp →
        </Link>
      </div>
    </article>
  )
}

const ArticleGrid = ({ articles = [], loading = false, className = '' }) => {
  if (loading) {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card animate-pulse">
            <div className="bg-gray-300 h-48"></div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-300 h-4 rounded"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              <div className="bg-gray-300 h-3 rounded"></div>
              <div className="bg-gray-300 h-3 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Không có bài viết nào</h3>
        <p className="text-gray-500">Hãy quay lại sau để xem thêm nội dung mới.</p>
      </div>
    )
  }

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {articles.map((article) => (
        <ArticleCard key={article._id || article.id} article={article} />
      ))}
    </div>
  )
}

export default ArticleGrid