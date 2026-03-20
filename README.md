# 🥗 Cooco – Smart Meal Planning & Recipe Discovery App

> A modern food planning & discovery application built with React + TailwindCSS, inspired by iOS design principles and crafted from Figma.

🔗 **Figma Design:**  
👉 https://www.figma.com/design/3LS7KxG9vo9lIU5ilvgDvF/Cooco?node-id=0-1&p=f&t=qUPVJVFviNYpdwaS-0

---

## 📌 Overview

**Cooco** is a UI-first application that helps users:

- 📅 Plan meals for the week
- 🍽 Manage daily dishes
- 🛒 Add meals to groceries (future feature)
- 🌤 View weather for meal planning
- 🔍 Discover recipes from creators

The project focuses on:

- Clean iOS-style UI
- Smooth UX interactions
- Scalable component architecture
- Dark mode consistency

---

## 🚀 Features

### 🥗 Meal Plan

- Generate missing days in current week (NOT overwrite existing data)
- Add / remove meals dynamically
- Per-day and per-meal dropdown actions
- Smart UI state handling

**Actions:**
- Add to groceries *(planned)*
- Generate missing days
- Clear current week
- Show weather

---

### 🔍 Discover

- Feed-based recipe discovery
- Follow creators → inject content into feed
- Empty state → onboarding experience
- Modal-driven interactions

---

### 🌙 Dark Mode (System-based)

- Uses CSS variables (`--color-*`)
- Shared across entire app (MealPlan + Discover)
- Smooth transition animation

---

## 🧱 Tech Stack

| Tech | Purpose |
|------|--------|
| React | UI framework |
| TailwindCSS | Styling system |
| Lucide Icons | Icon system |
| React Router | Navigation |
| Figma | UI/UX Design |

---

## 📱 Discover Page

**Discover Page** là nơi người dùng khám phá công thức mới và tương tác với các creator. Thiết kế dựa trên Figma, bao gồm:

- Feed-based content: hiển thị công thức theo creator hoặc đề xuất
- Empty state: hướng dẫn người dùng follow creator để hiển thị feed
- Modals: mở chi tiết công thức, thêm công thức mới hoặc các hành động tương tác

### 🔹 Feed Patterns

- **Suggested Feeds:** Hiển thị các creator gợi ý khi feed trống
- **Feed Items:** Hình ảnh + tiêu đề + creator + tương tác (like/share)
- **Infinite Scroll:** Có thể load thêm feed khi scroll

### 🔹 Modals

| Modal | Purpose |
|-------|---------|
| AddRecipeModal | Thêm công thức mới |
| FeedDetailModal | Xem chi tiết feed |
| SuggestedFeedsModal | Follow creator gợi ý |

**Behavior:**
- Modal portal-based
- Click outside hoặc nút Close để dismiss
- Animations: fade, slide-in, scale

---

## 🎛 State & Logic Patterns

- **Incremental state update:** không overwrite toàn bộ data, chỉ thêm mới
- **Dropdown / Menu system:** 
  - AppBar: menu chung
  - DaySection: menu cho từng ngày
  - MealItem: menu cho từng món
- **Dark mode:** đồng bộ giữa MealPlan & Discover, CSS variables + smooth transition
- **Weather integration:** hiển thị thời tiết hiện tại, chuẩn bị cho tính năng đề xuất meal dựa trên thời tiết

---
## 📁 Project Structure
```text
src/
├── components/
│ ├── PortalDropdown.jsx # Dropdown / Portal logic
│ └── ...
├── pages/
│ ├── MealPlan/
│ │ ├── MealPlan.jsx
│ │ ├── DaySection.jsx
│ │ └── MealItem.jsx
│ ├── Discover/
│ │ ├── Discover.jsx
│ │ ├── AddRecipeModal.jsx
│ │ ├── FeedDetailModal.jsx
│ │ └── SuggestedFeedsModal.jsx
├── hooks/
│ └── useTheme.js # Dark mode toggle
├── styles/
│ └── index.css # Tailwind + CSS variables
```

---

## 🔧 Best Practices Applied

- **State Management:** React useState + minimal prop drilling
- **Component Reuse:** DaySection, MealItem, MenuItem reusable
- **Responsive & Adaptive UI:** Follows mobile-first, iOS style
- **Animation & Feedback:** Hover, focus, fade, slide-in
- **Scalable Design Tokens:** Colors, shadows, spacing centralized
- **Incremental Data Update:** Always append missing days, preserve meals

---

## 🧑‍💻 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
