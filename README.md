# 🥗 Cooco – Smart Meal Planning & Recipe Discovery App

A modern food planning & discovery application built with **React + TailwindCSS**, inspired by **iOS design principles** and crafted from Figma.

---

## 🔗 Figma Design
👉 (https://www.figma.com/design/3LS7KxG9vo9lIU5ilvgDvF/Cooco?node-id=0-1&p=f&t=qUPVJVFviNYpdwaS-0)

---

## 📌 Overview

Cooco is an intuitive app that helps users:

- 📅 Plan meals for the week  
- 🍽 Manage daily dishes  
- 🛒 Add meals to groceries *(future feature)*  
- 🌤 View weather for meal planning  
- 🔍 Discover recipes from creators  

### 🎯 Focus

- Clean iOS-style UI  
- Smooth UX interactions  
- Scalable component architecture  
- Dark mode consistency  
- Modern modal-driven UX  

---

## 🚀 Features

### 🥗 Meal Plan

- **Smart Meal Generation**  
  Automatically fill in missing days without overwriting existing data.

- **Dynamic Meal Management**  
  Add/remove meals dynamically with per-day and per-meal actions.

- **Weather Integration**  
  View weather to plan meals accordingly.

#### 🔮 Planned Actions

- Add meals to groceries  
- Generate missing days in the current week  
- Clear the current week  
- Show weather for meal planning  

---

### 🔍 Discover Recipes

- **Feed-based discovery**  
  Explore recipes from creators or suggested content.

- **Follow Creators**  
  Inject creator content directly into your feed.

- **Interactive Modals**  
  View recipe details, add new recipes, follow creators.

- **Empty State**  
  Guide users to follow creators when no feed exists.

- **Infinite Scroll**  
  Load more feed content dynamically.

---

## 🌙 Dark Mode (System-based)

- Uses CSS variables (`--color-*`)  
- Smooth transition animations  
- Consistent across all pages  

---

## 🧱 Tech Stack

| Tech            | Purpose            |
|-----------------|-------------------|
| React           | UI framework       |
| TailwindCSS     | Styling system     |
| Lucide Icons    | Icon library       |
| React Router    | Navigation         |
| Figma           | UI/UX Design       |

---

## 📱 Discover Page

The Discover Page allows users to explore recipes and interact with creators.

### 🔹 Feed Patterns

- Suggested Feeds (when empty)
- Feed Items (thumbnail, title, creator, actions)
- Infinite Scroll

---

### 🔹 Modals

| Modal                 | Purpose                    |
|----------------------|---------------------------|
| AddRecipeModal       | Add a new recipe          |
| FeedDetailModal      | View recipe details       |
| SuggestedFeedsModal  | Follow creators           |

#### Behavior

- Portal-based modals  
- Click outside / Close to dismiss  
- Smooth animations (fade, slide, scale)  

---

## 🎛 State & Logic Patterns

- Incremental state updates (no overwrite)
- Reusable dropdown/menu system
- Global dark mode handling
- Weather integration (future enhancements)

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

- **State Management**: useState, minimal prop drilling  
- **Component Reuse**: modular reusable components  
- **Responsive Design**: mobile-first, iOS-style  
- **Animations**: smooth transitions & interactions  
- **Design Tokens**: centralized colors, spacing  
- **Incremental Updates**: append data safely  

---

## 🧑‍💻 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
