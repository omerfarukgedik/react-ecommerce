# E-Commerce React Application

A modern, responsive e-commerce application built with React, Redux Toolkit, and TailwindCSS. This project demonstrates best practices in React development, state management, and responsive design.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- **Product Listing & Filtering**

  - Dynamic product grid with pagination
  - Advanced filtering by brand and model
  - Sort products by price and date
  - Real-time search functionality

- **Shopping Cart**

  - Add/remove products
  - Adjust quantities
  - Persistent cart state using localStorage
  - Real-time price calculations

- **Product Details**

  - Detailed product information
  - Image display
  - Add to cart functionality
  - Price and availability information

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layout for different screen sizes
  - Optimized user experience across devices

## 🔧 Technical Stack

- **Frontend Framework:** React 18.3
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM 7
- **Styling:**
  - TailwindCSS
  - SASS/SCSS
- **API Integration:** TanStack Query (React Query)
- **Build Tool:** Vite
- **Testing:**
  - Jest
  - React Testing Library
- **Code Quality:**
  - ESLint
  - Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone
cd react-ecommerce
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:5173 in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets (images, icons, styles)
├── components/      # Reusable React components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── store/          # Redux store configuration and slices
├── _tests_/        # Test files
└── constants.js    # Application constants
```

### Key Components

- `Header.jsx` - Main navigation and search
- `Product.jsx` - Product card component
- `Filter.jsx` - Product filtering interface
- `Summary.jsx` - Cart summary and checkout
- `Pagination.jsx` - Page navigation component

## 🧪 Testing

The project includes comprehensive test coverage using Jest and React Testing Library. Tests cover:

- Component rendering
- User interactions
- Redux state management
- Custom hooks
- API integration

Run tests with coverage report:

```bash
npm run test:coverage
```

## 🔄 State Management

The application uses Redux Toolkit for state management with the following features:

- Cart state management
- Persistent storage using localStorage
- Optimized re-renders
- Centralized state logic

## 🌐 API Integration

The application integrates with a mock API:

- Base URL: `https://5fc9346b2af77700165ae514.mockapi.io/products`
- Endpoints:
  - GET `/products` - List all products
  - GET `/products/:id` - Get single product

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 🙏 Acknowledgments

- Icons from [SVG Icons Library]
- Design inspiration from modern e-commerce platforms
- Mock API service provided by MockAPI
