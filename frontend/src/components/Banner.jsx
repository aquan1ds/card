import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react'
import { formatDistance } from 'date-fns'
import { vi } from 'date-fns/locale'

const Banner = ({ featuredArticles = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    if (featuredArticles.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [featuredArticles.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArticles.length) % featuredArticles.length)
  }

  if (!featuredArticles.length) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Blog</h1>
            <p className="text-xl opacity-90">Nơi chia sẻ những thông tin hữu ích và thú vị</p>
          </div>
        </div>
      </div>
    )
  }

  const currentArticle = featuredArticles[currentSlide]

  return (
    <div className="relative h-96 rounded-lg overflow-hidden group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ 
          backgroundImage: `url(${currentArticle.image || '/api/placeholder/800/400'})` 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-4 pb-8">
          <div className="max-w-2xl text-white">
            <div className="flex items-center space-x-4 mb-3 text-sm opacity-90">
              <span className="bg-primary-500 px-3 py-1 rounded-full text-xs font-medium">
                {currentArticle.category?.name || 'Tin tức'}
              </span>
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>
                  {formatDistance(new Date(currentArticle.createdAt), new Date(), { 
                    addSuffix: true, 
                    locale: vi 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <User size={16} />
                <span>{currentArticle.author || 'Admin'}</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {currentArticle.title}
            </h1>
            
            <p className="text-lg opacity-90 mb-6 line-clamp-2">
              {currentArticle.excerpt || currentArticle.summary}
            </p>
            
            <Link
              to={`/article/${currentArticle.slug}`}
              className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Đọc tiếp
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {featuredArticles.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {featuredArticles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Banner