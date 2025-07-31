import React from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, Tag, Calendar, User } from 'lucide-react'
import { formatDistance } from 'date-fns'
import { vi } from 'date-fns/locale'

const PopularPosts = ({ posts = [] }) => {
  if (!posts.length) return null

  return (
    <div className="card p-4 mb-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <TrendingUp className="mr-2 text-primary-500" size={20} />
        Bài viết phổ biến
      </h3>
      <div className="space-y-4">
        {posts.slice(0, 5).map((post, index) => (
          <article key={post._id || post.id} className="flex space-x-3 group">
            <div className="flex-shrink-0">
              <Link to={`/article/${post.slug}`}>
                <img
                  src={post.image || '/api/placeholder/80/60'}
                  alt={post.title}
                  className="w-20 h-15 object-cover rounded-lg group-hover:opacity-75 transition-opacity duration-200"
                />
              </Link>
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/article/${post.slug}`}>
                <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary-500 transition-colors duration-200 mb-1">
                  {post.title}
                </h4>
              </Link>
              <div className="flex items-center text-xs text-gray-500 space-x-2">
                <div className="flex items-center space-x-1">
                  <Calendar size={10} />
                  <span>
                    {formatDistance(new Date(post.createdAt), new Date(), { 
                      addSuffix: true, 
                      locale: vi 
                    })}
                  </span>
                </div>
                {post.views && (
                  <span>• {post.views} lượt xem</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

const CategoriesList = ({ categories = [] }) => {
  if (!categories.length) return null

  return (
    <div className="card p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Danh mục</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category._id || category.id}
            to={`/category/${category.slug}`}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span className="text-gray-700 group-hover:text-primary-500 transition-colors duration-200">
              {category.name}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {category.postCount || 0}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

const TagCloud = ({ tags = [] }) => {
  if (!tags.length) return null

  // Generate random sizes for tag cloud effect
  const getTagSize = (count) => {
    if (count > 10) return 'text-lg'
    if (count > 5) return 'text-base'
    return 'text-sm'
  }

  return (
    <div className="card p-4 mb-6">
      <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <Tag className="mr-2 text-primary-500" size={20} />
        Từ khóa phổ biến
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link
            key={index}
            to={`/search?q=${encodeURIComponent(tag.name)}`}
            className={`inline-block bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 px-3 py-1 rounded-full transition-colors duration-200 ${getTagSize(tag.count)}`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

const AdBanner = ({ ad }) => {
  if (!ad) {
    return (
      <div className="card p-4 mb-6">
        <div className="text-center">
          <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
            <span className="text-gray-500 text-sm">Quảng cáo</span>
          </div>
          <p className="text-xs text-gray-500">Không gian quảng cáo</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card overflow-hidden mb-6">
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-75 transition-opacity duration-200"
      >
        <img
          src={ad.image}
          alt={ad.title}
          className="w-full h-auto"
        />
        {ad.title && (
          <div className="p-3">
            <h4 className="text-sm font-medium text-gray-800">{ad.title}</h4>
            {ad.description && (
              <p className="text-xs text-gray-600 mt-1">{ad.description}</p>
            )}
          </div>
        )}
      </a>
    </div>
  )
}

const Newsletter = () => {
  return (
    <div className="card p-4 bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Đăng ký nhận tin</h3>
      <p className="text-sm text-gray-600 mb-4">
        Nhận thông báo về những bài viết mới nhất qua email
      </p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Địa chỉ email"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
        <button
          type="submit"
          className="w-full btn-primary text-sm"
        >
          Đăng ký ngay
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        Chúng tôi cam kết không spam và bảo vệ thông tin cá nhân của bạn.
      </p>
    </div>
  )
}

const Sidebar = ({ 
  popularPosts = [], 
  categories = [], 
  tags = [], 
  ad = null,
  showNewsletter = true 
}) => {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      <PopularPosts posts={popularPosts} />
      <CategoriesList categories={categories} />
      <TagCloud tags={tags} />
      <AdBanner ad={ad} />
      {showNewsletter && <Newsletter />}
    </aside>
  )
}

export default Sidebar