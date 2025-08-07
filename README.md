# CRM No-code/Low-code System

## 🚀 Tổng quan

Hệ thống CRM (Customer Relationship Management) no-code/low-code được xây dựng với React.js, tích hợp AI và được thiết kế để dễ dàng triển khai trên Netlify. Hệ thống cung cấp giao diện hiện đại, responsive và đầy đủ tính năng quản lý khách hàng, leads, và analytics.

## ✨ Tính năng chính

### 🎯 Quản lý Leads/Khách hàng
- ✅ Bảng danh sách leads với đầy đủ thông tin
- ✅ Tính năng lọc, tìm kiếm và sắp xếp
- ✅ Thêm, sửa, xóa leads
- ✅ Hiển thị trạng thái với màu sắc trực quan
- ✅ Pagination và bulk actions
- ✅ Validation và xác thực dữ liệu

### 📊 Dashboard và Báo cáo Real-time
- ✅ Biểu đồ tròn phân bố khách hàng theo loại
- ✅ Biểu đồ cột thống kê doanh số theo thời gian
- ✅ Metrics quan trọng với KPIs chính
- ✅ Dashboard responsive và cập nhật real-time
- ✅ Cards hiển thị thông tin tổng quan

### 🤖 Tự động hóa với AI
- ✅ Tự động phân loại leads
- ✅ Gợi ý hành động tiếp theo
- ✅ Nhắc nhở tự động cho nhân sự
- ✅ Phân tích xu hướng và dự đoán
- ✅ AI insights và recommendations

### 🎨 Giao diện người dùng
- ✅ Thiết kế modern, clean với màu tím chủ đạo (#6366f1)
- ✅ Responsive design cho mobile và desktop
- ✅ Navigation menu với đầy đủ các trang
- ✅ Dark/Light mode toggle
- ✅ Sidebar navigation với animations

### 🔧 Tính năng bổ sung
- ✅ Export data (CSV, JSON)
- ✅ Bulk operations
- ✅ Advanced filtering
- ✅ Settings management
- ✅ User profile management
- ✅ Notification system

## 🛠️ Công nghệ sử dụng

### Frontend
- **React.js** v19+ với Vite
- **Tailwind CSS** v4+ để styling
- **DaisyUI** components
- **Chart.js** với react-chartjs-2 cho biểu đồ
- **React Router** cho navigation

### State Management
- **Zustand** cho state management
- **LocalStorage** persistence
- **React Hook Form** với Zod validation

### Icons & UI
- **Lucide React** icons
- **Heroicons** 
- **Framer Motion** cho animations

### Deploy & Build
- **Vite** build tool
- **Netlify** deployment ready
- **PostCSS** với Autoprefixer

## 📁 Cấu trúc dự án

```
/
├── src/
│   ├── components/
│   │   ├── Charts/           # Biểu đồ (Pie, Bar, Line)
│   │   ├── Dashboard/        # Components Dashboard
│   │   ├── Layout/           # Layout chính và Sidebar
│   │   └── Leads/            # Components quản lý Leads
│   ├── pages/
│   │   ├── Dashboard.jsx     # Trang Dashboard chính
│   │   ├── Leads.jsx         # Trang quản lý Leads
│   │   ├── Analytics.jsx     # Trang phân tích
│   │   └── Settings.jsx      # Trang cài đặt
│   ├── store/
│   │   ├── leadsStore.js     # State management cho Leads
│   │   ├── authStore.js      # State management cho Auth
│   │   └── settingsStore.js  # State management cho Settings
│   ├── data/
│   │   └── mockData.js       # Mock data với 150+ leads
│   └── styles/
│       └── globals.css       # CSS toàn cục
├── public/                   # Static assets
├── netlify.toml             # Cấu hình Netlify
├── tailwind.config.js       # Cấu hình Tailwind
└── package.json             # Dependencies
```

## 🚀 Cài đặt và Chạy

### 1. Clone repository
```bash
git clone <repository-url>
cd CRM-No-code-Low-code
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Chạy development server
```bash
npm run dev
```

Mở http://localhost:5173 để xem ứng dụng.

### 4. Build cho production
```bash
npm run build
```

## 🌐 Deploy lên Netlify

### Cách 1: Netlify Drop (Nhanh nhất)
1. Chạy `npm run build` để tạo thư mục `dist`
2. Kéo thả thư mục `dist` vào https://app.netlify.com/drop
3. Ứng dụng sẽ chạy ngay lập tức!

### Cách 2: Connect Git Repository
1. Push code lên GitHub
2. Đăng nhập vào Netlify
3. Chọn "New site from Git"
4. Kết nối với repository
5. Netlify sẽ tự động build và deploy

### Cách 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## 📊 Mock Data

Hệ thống bao gồm:
- **150+ sample leads** với thông tin đầy đủ
- **Dữ liệu thống kê realistic** cho dashboard
- **Multiple lead statuses** và categories
- **Sample activities** và AI insights
- **Phân bố địa lý** theo các tỉnh thành Việt Nam

## 🎨 Theme & Customization

### Màu sắc chính
- **Primary**: #6366f1 (Indigo)
- **Primary Dark**: #4f46e5
- **Primary Light**: #818cf8

### Dark/Light Mode
Hệ thống hỗ trợ chuyển đổi theme tự động với DaisyUI themes.

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🤖 AI Features

### Lead Scoring
- Tự động chấm điểm leads dựa trên behavior
- Predictive analytics cho conversion rate

### Smart Insights
- Phân tích xu hướng dữ liệu
- Gợi ý hành động tối ưu
- Cảnh báo rủi ro tự động

### Automation
- Auto follow-up suggestions
- Smart notifications
- Lead categorization

## 📱 Mobile Support

Ứng dụng được thiết kế mobile-first với:
- ✅ Touch-friendly interface
- ✅ Responsive navigation
- ✅ Optimized charts cho mobile
- ✅ Swipe gestures hỗ trợ

## 🔒 Bảo mật

- Local storage encryption
- Input validation với Zod
- XSS protection
- CSRF protection ready

## 🌍 Hỗ trợ ngôn ngữ

- **Tiếng Việt** (mặc định)
- **English** (có thể cấu hình)
- Định dạng tiền tệ VND
- Múi giờ Asia/Ho_Chi_Minh

## 📈 Performance

- **Bundle size**: ~500KB (gzipped: ~160KB)
- **First Paint**: < 1s
- **Interactive**: < 2s
- **Code splitting** với dynamic imports
- **Lazy loading** cho charts

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build
```

### Development Server Issues
```bash
# Restart dev server
npm run dev -- --force
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🆘 Support

Nếu gặp vấn đề:
1. Kiểm tra [Issues](https://github.com/mrsonly86/CRM-No-code-Low-code/issues)
2. Tạo issue mới với mô tả chi tiết
3. Đính kèm screenshots nếu có

---

**📞 Demo URL**: [Sẽ cập nhật sau khi deploy]

**🔗 Repository**: https://github.com/mrsonly86/CRM-No-code-Low-code

**👨‍💻 Phát triển bởi**: CRM Development Team

---

*Hệ thống CRM này được thiết kế để dễ dàng tùy chỉnh và mở rộng. Hãy fork và customize theo nhu cầu của bạn!* 🚀
