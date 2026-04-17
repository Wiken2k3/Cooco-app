# 🥗 Cooco – Smart Meal Planning & Recipe Discovery App

A modern food planning & discovery application built with **React + TailwindCSS**, inspired by **iOS design principles** and crafted from Figma.

---

## 🔗 Figma Design
👉 [Cooco Design on Figma](https://www.figma.com/design/3LS7KxG9vo9lIU5ilvgDvF/Cooco?node-id=0-1&p=f&t=qUPVJVFviNYpdwaS-0)

---

## 📌 Overview

Cooco is an intuitive app that helps users:
- 📅 Plan meals for the week
- 🍽 Manage daily dishes
- 🛒 **Smart Grocery Management** (Just Added!)
- 🌤 View weather for meal planning
- 🔍 Discover recipes from creators

---

## 🚀 Features

### 🛒 Grocery Management (New!)
Hệ thống quản lý mua sắm được thiết kế theo ngôn ngữ **Apple Design Guidelines**, tập trung vào trải nghiệm mượt mà và màu sắc pastel hiện đại.

- **Dynamic Shopping List**  
  Quản lý danh sách nguyên liệu cần mua với khả năng tương tác cao.

- **iOS-style Card UI**  
  Mỗi nguyên liệu là một thẻ (card) riêng biệt với bo góc lớn (22px), sử dụng hệ màu sắc từ thiết kế gốc.

- **Smart Add Selection**  
  - Cho phép chọn nhanh danh sách nguyên liệu từ công thức nấu ăn.  
  - **Floating Action Buttons**: Hệ thống nút "Deselect All" và "Add Items" được thiết kế nổi (fixed), sử dụng hiệu ứng **Glassmorphism** (backdrop-blur) và đổ bóng chuyên nghiệp.

- **Pro Calculator Modal**  
  - Bộ phím bấm (Keypad) mô phỏng máy tính iOS nhưng được tùy chỉnh theo bảng màu thiết kế.  
  - Hỗ trợ nhập liệu phân số nhanh (1/4, 1/2...) và chuyển đổi đơn vị (Cup, Tablespoon, ml...).  
  - Header thông minh: Nút chức năng nằm ở các góc, thông tin số lượng và tên món tập trung ở giữa để tối ưu thị giác.

---

### 🥗 Meal Plan
- **Smart Meal Generation**  
  Tự động lấp đầy các ngày còn trống mà không ghi đè dữ liệu cũ.

- **Dynamic Meal Management**  
  Thêm/xóa bữa ăn linh hoạt theo từng ngày.

- **Weekly Sync Logic**  
  Tự động đồng bộ dữ liệu theo tuần hiện tại, đảm bảo tính nhất quán giữa các ngày.

---

### 🔍 Discover Recipes
- **Feed-based Discovery**  
  Khám phá công thức từ cộng đồng người sáng tạo.

- **Local Persistence**  
  Lưu trữ feeds và trạng thái đã thêm bằng `localStorage`.

- **Interactive Modals**  
  Sử dụng Portal-based modals cho trải nghiệm đóng/mở mượt mà.

- **Smart Add Feed System**  
  Tránh trùng lặp dữ liệu và đồng bộ trực tiếp với nguồn `discoverFeeds`.

---

### 🍳 Recipe Management (Updated!)
Hệ thống quản lý công thức toàn diện, tối ưu hóa cho trải nghiệm nấu ăn thực tế.

- **Smart Recipe Grid**  
  - Hiển thị thẻ công thức với hình ảnh tràn viền.  
  - Thông tin nhanh: khẩu phần (servings) và thời gian nấu (time).  
  - Hỗ trợ tìm kiếm thời gian thực (real-time search).

- **Pro Dropdown Import Menu**  
  - Menu theo phong cách iOS với hiệu ứng **Glassmorphism**.  
  - Hỗ trợ nhiều phương thức nhập:
    - Manual (nhập tay)
    - Website scraping
    - QR Code
    - Camera AI
    - Image / Text parsing

- **Hands-Free Cooking Mode**  
  - Giao diện step-by-step với font lớn (~42px), tối ưu cho việc nhìn từ xa khi nấu.  
  - **Smart Keyword Highlighting**:  
    Sử dụng Regex (word boundary) để nhận diện và highlight:
    - nhiệt độ (°C)
    - thời gian (minutes)
    - nguyên liệu  
  → tránh lỗi highlight sai trong code/text.

- **Segmented Progress Bar**  
  Thanh tiến trình dạng phân đoạn giúp theo dõi từng bước nấu ăn một cách trực quan.

---

### 🔎 Smart Search (New!)
- Tìm kiếm realtime trên nhiều module:
  - Recipes
  - Tags (FAQ)
  - Grocery items (future-ready)
- Không thay đổi UI, chỉ thêm logic phía sau (non-intrusive UX enhancement).

---

## ✨ UX Highlights

- **iOS-native feel** với animation mượt và phản hồi vật lý (`active:scale`)
- **Glassmorphism UI** cho các modal & floating components
- **Consistent Design System** giữa MealPlan, Grocery, Discover, Recipes
- **Dark Mode Ready** với CSS variables
- **Zero-lag interactions** (local state + localStorage)

---
## 📦 Future Improvements

- 🔥 AI Meal Recommendation dựa trên dislikes (FAQ)
- 🔥 Auto Grocery từ Meal Plan
- 🔥 Cloud Sync (Firebase / Supabase)
- 🔥 Offline-first support (PWA)

---

## 🎨 Design System (Grocery Variables)

Hệ thống màu sắc được trích xuất trực tiếp từ bảng màu thiết kế của dự án:

| Component | Background Color | Text Color |
|-----------|------------------|------------|
| **Num Keys** | `#C0EEE3` | `#00CD86` |
| **Action Keys** | `#D1EFF8` | `#019AF5` |
| **Suggest Keys** | `#EFDFF6` | `#C662EC` |
| **Delete Key** | `#F7DEDD` | `#FF685E` |
| **Card Background** | `#FFFFFF / dark: #1C1C1E` | `#000000 / dark: #F2F2F7` |
| **FAB Background** | `#F7F7F7 / dark: #2C2C2E` | `#000000 / dark: #FFFFFF` |

---

## 🧱 Tech Stack

| Tech | Purpose |
|-----------------|-------------------|
| **React** | UI Framework |
| **TailwindCSS** | Styling System & Design Tokens |
| **Lucide Icons**| Icon Library |
| **LocalStorage**| Data Persistence |
| **React Router v6**| Navigation & Routing |
| **Fetch API**| Weather Data Integration |

---

## 📱 Project Structure

```text
src/
├── components/
│   ├── PortalDropdown.jsx
│   └── ...
├── pages/
│   ├── MealPlan/
│   │   ├── MealPlan.jsx
│   │   └── DaySection.jsx
    ├── Recipes/
│   │   ├── Recipes.jsx       # Grid hiển thị & Import Menu
│   │   ├── RecipeDetail.jsx  # Chi tiết & Nguyên liệu
│   │   ├── RecipeSteps.jsx   # Cooking Mode: Step-by-Step
│   │   ├── RecipeFolders.jsx # Quản lý bộ sưu tập (Collections)
│   │   ├── ImportWebsite.jsx # Import từ URL
│   │   ├── ManualEntry.jsx   # Form nhập liệu tay
│   │   └── ScanRecipe.jsx    # Camera AI Scan giả lập
│    ├── Settings/
│   │   └── Settings.jsx      # Trang cài đặt tổng thể & Profile
    ├── Discover/
│   │   ├── Discover.jsx
│   │   ├── AddRecipeModal.jsx
│   │   └── SuggestedFeedsModal.jsx
│   ├── Grocery/
│   │   ├── Grocery.jsx               # Danh sách mua sắm chính
│   │   ├── GroceryCalculateModal.jsx # Modal tính toán số lượng
│   │   └── AddToGroceryModal.jsx     # Modal chọn nguyên liệu nhanh
├── hooks/
│   └── useTheme.jsx                  # Theme toggle Dark/Light
├── config/
│   └── navigation.js                 # Tab Bar config
├── data/
│   └── discoverFeeds.js              # Mock data cho Discover
├── styles/
│   └── index.css                     # Tailwind + Custom iOS CSS Variables
├── App.jsx
└── main.jsx
```

---

## 🔧 Best Practices Applied
Floating Action Buttons (FABs): Always visible on top of scrollable content using absolute + z-index.
Glassmorphism: backdrop-blur and semi-transparent backgrounds for depth.
UX Feedback: Active state scaling (active:scale-95) on buttons for tactile feel.
Clean Architecture: Separation of concerns between Calculator logic, Selection logic, and UI components.
LocalStorage Sync: Automatic persistence of Grocery and Discover data.
Responsive Design: Max width 430px to mimic mobile viewport while allowing web preview.
Smart Regex Formatting: Sử dụng \b (Word Boundary) trong Regex để highlight từ khóa chính xác, tránh ghi đè vào các thuộc tính HTML trong chuỗi string.
UX Tactile Feedback: Áp dụng active:scale-95 cho toàn bộ các nút bấm và thẻ công thức để tạo cảm giác phản hồi xúc giác.
Responsive Viewport: Thiết kế cố định bề ngang tối đa 430px để giữ đúng tỷ lệ Mobile khi xem trên trình duyệt Web.

---

## 🧑‍💻 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
