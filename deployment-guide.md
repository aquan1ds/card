# Hướng dẫn Deploy Blog Website

## 🚀 Deploy trên Vercel (Khuyên dùng)

### Chuẩn bị
1. Tạo tài khoản GitHub và Vercel
2. Push code lên GitHub repository

### Các bước deploy
1. **Truy cập Vercel**: Đăng nhập vào [vercel.com](https://vercel.com)
2. **Import Project**: 
   - Click "New Project"
   - Chọn GitHub repository của bạn
   - Click "Import"
3. **Cấu hình**:
   - Framework Preset: Next.js
   - Root Directory: `./` (mặc định)
   - Build Command: `npm run build`
   - Output Directory: `.next` (auto-detect)
4. **Environment Variables** (nếu cần):
   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_SITE_NAME=Blog Website
   ```
5. **Deploy**: Click "Deploy"

### Sau khi deploy
- Vercel sẽ tự động generate domain: `your-project.vercel.app`
- Có thể custom domain trong Settings
- Auto-deploy khi push code mới

## 🐳 Deploy với Docker

### Dockerfile
```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Docker Commands
```bash
# Build image
docker build -t blog-nextjs .

# Run container
docker run -p 3000:3000 blog-nextjs
```

## ☁️ Deploy trên VPS/Cloud Server

### Yêu cầu
- Server với Node.js 18+
- Nginx (reverse proxy)
- PM2 (process manager)

### 1. Cài đặt dependencies
```bash
# Trên server
sudo apt update
sudo apt install nodejs npm nginx

# Cài PM2
sudo npm install -g pm2
```

### 2. Clone và build project
```bash
git clone <your-repo>
cd blog-nextjs
npm install
npm run build
```

### 3. Cấu hình PM2
Tạo file `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'blog-nextjs',
    script: 'npm',
    args: 'start',
    cwd: '/path/to/your/project',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Chạy PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Cấu hình Nginx
Tạo file `/etc/nginx/sites-available/blog`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. SSL với Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring và Analytics

### Google Analytics
1. Tạo GA4 property
2. Thêm tracking ID vào environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Thêm vào `layout.tsx`:
   ```tsx
   import Script from 'next/script'
   
   <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
   <Script id="google-analytics">
     {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
     `}
   </Script>
   ```

### Google Search Console
1. Verify domain ownership
2. Submit sitemap: `https://your-domain.com/sitemap.xml`
3. Monitor search performance

## 🔧 Production Optimizations

### Environment Variables
```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Blog Website
NEXT_PUBLIC_GA_ID=your-ga-id
```

### Performance Monitoring
- Vercel Analytics (tự động với Vercel)
- Google PageSpeed Insights
- Web Vitals monitoring

### CDN Setup
- Vercel tự động setup CDN
- Với VPS: Cloudflare hoặc AWS CloudFront

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next
npm install
npm run build
```

### Memory Issues
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Image Issues
- Kiểm tra remote patterns trong `next.config.ts`
- Optimize images trước khi upload

## 📝 Checklist Deploy

- [ ] Code pushed to repository
- [ ] Environment variables configured
- [ ] Domain setup (if custom)
- [ ] SSL certificate installed
- [ ] Analytics tracking setup
- [ ] Google Search Console verified
- [ ] Sitemap submitted
- [ ] Performance testing done
- [ ] Backup strategy implemented

## 🔄 CI/CD với GitHub Actions

Tạo `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📞 Support

Nếu gặp vấn đề trong quá trình deploy:
1. Kiểm tra logs: `pm2 logs` (VPS) hoặc Vercel dashboard
2. Review build output
3. Kiểm tra environment variables
4. Test local production build: `npm run build && npm start`