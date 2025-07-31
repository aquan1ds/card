import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Liên hệ', path: '/contact' },
    { name: 'Chính sách bảo mật', path: '/privacy' },
    { name: 'Điều khoản sử dụng', path: '/terms' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'Youtube', icon: Youtube, url: 'https://youtube.com' },
  ]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold">Blog</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Website blog chia sẻ những thông tin hữu ích, tips và mẹo trong cuộc sống. 
              Cập nhật những xu hướng mới nhất và review sản phẩm chất lượng.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    <IconComponent size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-300 mb-4">
              Nhận thông báo về những bài viết mới nhất
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
              />
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Blog Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer