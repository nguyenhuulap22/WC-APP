🚻📱 Public Toilet Smart App

Ứng dụng tìm kiếm, sử dụng và quản lý nhà vệ sinh công cộng thông minh

Ứng dụng di động giúp người dùng tìm kiếm – sử dụng – đánh giá nhà vệ sinh công cộng và hỗ trợ nhà cung cấp quản lý cơ sở vật chất, tài chính, bảo trì một cách hiệu quả.

React Native · Expo · TypeScript

📋 Mục Lục

Tính Năng Chính

Đối Tượng Sử Dụng

Công Nghệ Sử Dụng

Yêu Cầu Hệ Thống

Hướng Dẫn Cài Đặt

Cách Sử Dụng

Cấu Trúc Project

Mô Tả Chức Năng Chi Tiết

Giải Quyết Sự Cố

Phát Triển Tiếp Theo

Tác Giả & Giấy Phép

✨ Tính Năng Chính
👤 Đối với Người Dùng

🗺️ Tìm kiếm nhà vệ sinh công cộng trên bản đồ Google Map

📍 Xác định vị trí GPS hiện tại

🔍 Lọc theo dịch vụ: có nhà tắm, có khăn, hoạt động 24h

ℹ️ Xem thông tin chi tiết:

Giờ mở / đóng

Các dịch vụ: WC, nhà tắm, xà phòng, khăn, dầu gội…

💳 Thanh toán sử dụng dịch vụ:

Thanh toán QR

Gói thường niên

Ví điện tử

📷 Quét QR bằng camera để mở cửa

⭐ Đánh giá & bình luận sau khi sử dụng

🤖 Chat AI hỗ trợ và tư vấn người dùng

🏢 Đối với Nhà Cung Cấp

📊 Dashboard điều khiển

Doanh thu trong ngày

Lượt sử dụng

Đánh giá trung bình

Số sự cố

🧱 Quản lý cơ sở vật chất

Thêm / sửa / xoá dịch vụ (WC, nhà tắm…)


💰 Quản lý tài chính

Cập nhật giá dịch vụ (VD: WC từ 10.000đ → 15.000đ)

Thống kê & báo cáo doanh thu

🛠️ Vận hành & bảo trì

Nhận sự cố từ người dùng (hỏng vòi, hết giấy…)

Quản lý tồn kho vật tư

Lập lịch vệ sinh, bảo dưỡng (chỉnh giờ linh hoạt)

💬 Xem phản hồi người dùng theo thời gian thực

👥 Đối Tượng Sử Dụng

Người dân, khách du lịch cần tìm nhà vệ sinh công cộng

Đơn vị quản lý nhà vệ sinh công cộng

Doanh nghiệp cung cấp dịch vụ vệ sinh công cộng

🛠️ Công Nghệ Sử Dụng

React Native + Expo

TypeScript

React Navigation

Expo Camera & Barcode Scanner

Expo Location (GPS)

React Native Maps (Google Map)

AsyncStorage (lưu dữ liệu cục bộ)

Context API (quản lý trạng thái đánh giá)

🖥️ Yêu Cầu Hệ Thống

Node.js >= 16

npm hoặc yarn

Expo CLI (chạy bằng npx)

Android Emulator API 33–34 hoặc thiết bị Android thật

Expo Go (trên điện thoại)

🚀 Hướng Dẫn Cài Đặt
1️⃣ Clone Project
git clone <link-repo>
cd mobile-app

2️⃣ Cài Thư Viện
npm install

3️⃣ Chạy Ứng Dụng
npx expo start


Quét QR bằng Expo Go

Hoặc chạy trên Android Emulator

📖 Cách Sử Dụng
🔐 Đăng Nhập & Phân Quyền

Chọn Người dùng hoặc Nhà cung cấp

Mỗi vai trò có giao diện & chức năng riêng

🗺️ Tìm Kiếm Nhà Vệ Sinh

Mở Trang chủ

Xem bản đồ + các điểm nhà vệ sinh

Lọc theo dịch vụ mong muốn

💳 Thanh Toán & Sử Dụng

Chọn hình thức thanh toán

Quét QR để mở cửa

Sử dụng dịch vụ

⭐ Đánh Giá

Chấm sao

Viết bình luận

Phản hồi hiển thị ngay bên phía nhà cung cấp

📁 Cấu Trúc Project
mobile-app/
├── App.tsx
├── index.ts
├── package.json
├── assets/
│   ├── icon.png
│   ├── splash.png
│   └── images/
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── user/
│   │   ├── HomeScreen.tsx
│   │   ├── ToiletDetailScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   ├── QRScannerScreen.tsx
│   │   ├── RatingScreen.tsx
│   │   └── ChatAIScreen.tsx
│   └── provider/
│       ├── DashboardScreen.tsx
│       ├── FacilityScreen.tsx
│       ├── FinanceScreen.tsx
│       ├── MaintenanceScreen.tsx
│       ├── FeedbackScreen.tsx
│       ├── ReportScreen.tsx
│       └── IncidentScreen.tsx
├── store/
│   └── RatingContext.tsx
└── README.md

🧠 Mô Tả Luồng Hoạt Động

Người dùng đánh giá → lưu vào Context

Nhà cung cấp mở tab Phản hồi → thấy ngay đánh giá

Cập nhật giá → ảnh hưởng trực tiếp đến thanh toán

Sự cố → hiển thị trong bảo trì

🔧 Giải Quyết Sự Cố
❌ Không chạy emulator

Không dùng API 35–36

Dùng API 33 hoặc 34

Ưu tiên chạy máy thật

❌ Không navigate được

Kiểm tra screen đã đăng ký trong Stack Navigator

❌ Không hiển thị icon / ảnh

Kiểm tra đúng đường dẫn assets/

Restart Expo với:

npx expo start -c

🚀 Phát Triển Tiếp Theo

Tích hợp backend (Firebase / Node.js)

Thanh toán thật (VNPay, MoMo)

AI phân tích đánh giá

Thống kê theo thời gian thực

Dark mode

Đa ngôn ngữ

👨‍💻 Tác Giả

Đồ án học phần Phát triển ứng dụng di động
Khoa Công Nghệ Thông Tin
Trường Đại học Sư phạm TP. Hồ Chí Minh

📄 Giấy Phép

MIT License – Tự do sử dụng cho mục đích học tập và nghiên cứu.
