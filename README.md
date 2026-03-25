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

- **Dynamic Shopping List**: Quản lý danh sách nguyên liệu cần mua với khả năng tương tác cao.
- **iOS-style Card UI**: Mỗi nguyên liệu là một thẻ (card) riêng biệt với bo góc lớn (22px), sử dụng hệ màu sắc từ thiết kế gốc.
- **Smart Add Selection**: 
  - Cho phép chọn nhanh danh sách nguyên liệu từ công thức nấu ăn.
  - **Floating Action Buttons**: Hệ thống nút "Deselect All" và "Add Items" được thiết kế nổi (fixed) đè lên danh sách, sử dụng hiệu ứng **Glassmorphism** (backdrop-blur) và đổ bóng chuyên nghiệp.
- **Pro Calculator Modal**: 
  - Bộ phím bấm (Keypad) mô phỏng máy tính iOS nhưng được tùy chỉnh màu sắc theo bảng màu thiết kế.
  - Hỗ trợ nhập liệu phân số nhanh (1/4, 1/2...) và chuyển đổi đơn vị (Cup, Tablespoon, Mills...).
  - Cấu trúc Header thông minh: Nút chức năng nằm ở các góc, thông tin số lượng và tên món tập trung ở giữa để tối ưu thị giác.

### 🥗 Meal Plan
- **Smart Meal Generation**: Tự động lấp đầy các ngày còn trống mà không ghi đè dữ liệu cũ.
- **Dynamic Meal Management**: Thêm/xóa bữa ăn linh hoạt theo từng ngày.

### 🔍 Discover Recipes
- **Feed-based discovery**: Khám phá công thức từ cộng đồng người sáng tạo.
- **Infinite Scroll**: Tự động tải thêm nội dung khi cuộn trang giúp trải nghiệm không bị ngắt quãng.
- **Interactive Modals**: Sử dụng Portal-based modals cho cảm giác đóng/mở mượt mà.

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
│   ├── Discover/
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

---

## 🧑‍💻 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
