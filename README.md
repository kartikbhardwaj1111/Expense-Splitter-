# 💰 Expense Splitter - Complete Implementation

> **A fully functional React + TypeScript application for tracking and splitting group expenses**

**Developed by:** Kartik Bhardwaj | Squad 63 | JECRC University

---

## 🌐 Live Demo & Resources

- **🚀 Live Application:** [expense-splitter.vercel.app](https://expense-splitter-git-main-kartik-bhardwajs-projects-ce1937d6.vercel.app/)
- **🎥 Demo Video:** [Watch Full Demo](https://drive.google.com/file/d/1pUtZi9gxpui_0bK70dJexNNfba0kgvVm/view?usp=drive_link)
- **💻 Source Code:** Available in this repository

---

## 🎯 Project Overview

This application solves the common problem of splitting expenses among friends, roommates, or travel groups. It automatically calculates who owes whom and suggests the minimum number of transactions needed to settle all debts.

### ✨ Key Features Implemented
- **👥 People Management** - Add/remove group members with validation
- **💸 Expense Tracking** - Record expenses with equal or custom splits
- **🧮 Smart Calculations** - Real-time balance calculations and debt optimization
- **📱 Responsive Design** - Works seamlessly on mobile and desktop
- **🔄 Live Updates** - All components sync automatically

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## 🎬 Implementation Showcase

### Before vs After Transformation

**BEFORE:** Static UI mockup with zero functionality
- ❌ Forms didn't submit
- ❌ Buttons didn't work  
- ❌ No data flow between components
- ❌ Everything showed $0.00

**AFTER:** Fully functional expense splitter
- ✅ Complete people management system
- ✅ Advanced expense tracking with custom splits
- ✅ Real-time balance calculations
- ✅ Intelligent debt simplification
- ✅ Comprehensive form validation
- ✅ Seamless component communication

### 🎥 Watch It In Action
[**📺 Full Demo Video**](https://drive.google.com/file/d/1pUtZi9gxpui_0bK70dJexNNfba0kgvVm/view?usp=drive_link) - See every feature working perfectly!

---

## 🛠️ Technical Implementation

### Architecture Decisions

**State Management Strategy:**
- Centralized state in `App.tsx` using React hooks
- Props drilling for component communication
- Clean separation of concerns

**Key Technologies:**
- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Build Tool:** Vite
- **Deployment:** Vercel

### 🔧 Core Features Implemented

#### 1. **People Management System**
```typescript
// Smart validation and real-time updates
- Add people with duplicate prevention
- Remove people with cascade updates
- Form validation with error handling
- Live count display
```

#### 2. **Advanced Expense Tracking**
```typescript
// Flexible expense recording
- Equal split calculations
- Custom amount distributions
- Form validation and error handling
- Real-time balance updates
```

#### 3. **Intelligent Balance Calculations**
```typescript
// Mathematical precision
- Individual balance tracking
- Debt simplification algorithm
- Color-coded visual feedback
- Settlement optimization
```

#### 4. **Interactive Expense Management**
```typescript
// User-friendly interactions
- Expandable expense details
- One-click expense deletion
- Split information display
- Dynamic content updates
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── PeopleManager.tsx       # ✅ People management with validation
│   ├── ExpenseForm.tsx         # ✅ Complete expense form with custom splits
│   ├── BalanceView.tsx         # ✅ Real-time calculations & settlements
│   └── ExpenseList.tsx         # ✅ Interactive expense list with details
├── utils/
│   ├── calculations.ts         # 🆕 Mathematical algorithms
│   └── calculations.test.ts    # 🆕 Unit tests for calculations
├── test/
│   └── PeopleManager.test.tsx  # 🆕 Component tests
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # 🔄 State management hub
├── initialData.ts              # Sample data
└── main.tsx                    # App entry point
```

### 🆕 New Files Added
- **`utils/calculations.ts`** - Core mathematical functions
- **`*.test.ts/tsx`** - Comprehensive test suite
- **Enhanced components** - Full functionality implementation

---

## 🧪 Testing & Quality Assurance

### Test Coverage
```bash
✅ Unit Tests - Mathematical calculations
✅ Component Tests - UI functionality  
✅ Integration Tests - Component communication
✅ Manual Testing - Full user workflows
```

### Code Quality Standards
- **TypeScript:** Strict typing throughout
- **ESLint:** Code quality enforcement
- **React Best Practices:** Hooks, component patterns
- **Clean Architecture:** Separation of concerns

---

## 🚀 Deployment & Performance

**Live Application:** [expense-splitter.vercel.app](https://expense-splitter-git-main-kartik-bhardwajs-projects-ce1937d6.vercel.app/)

### Performance Optimizations
- ⚡ Fast initial load with Vite
- 📱 Responsive design for all devices
- 🔄 Real-time updates without page refresh
- 💾 Efficient state management

---

## 👨💻 Developer Information

**Created by:** Kartik Bhardwaj  
**Institution:** JECRC University, Squad 63  
**Technologies:** React, TypeScript, Tailwind CSS, Vite  
**Deployment:** Vercel  

### 📞 Contact & Links
- **Demo Video:** [Watch Implementation](https://drive.google.com/file/d/1pUtZi9gxpui_0bK70dJexNNfba0kgvVm/view?usp=drive_link)
- **Live App:** [Try It Now](https://expense-splitter-git-main-kartik-bhardwajs-projects-ce1937d6.vercel.app/)

---

## 🎉 Implementation Success

**Challenge Completed:** ✅ Fully Functional Expense Splitter  
**All Requirements Met:** ✅ People Management, Expense Tracking, Balance Calculations  
**Bonus Features:** ✅ Debt Optimization, Comprehensive Testing, Production Deployment  

*This project demonstrates proficiency in React, TypeScript, state management, mathematical algorithms, and modern web development practices.*
