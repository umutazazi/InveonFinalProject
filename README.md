# Inveon Mini Course - E-Learning Platform

A modern, responsive e-learning platform built with React.js and .NET Entity Framework. This application provides a comprehensive course marketplace where users can browse, purchase, and manage online courses.

## ✨ Features

### 🎓 Core Functionality

- **Course Catalog**: Browse through a variety of courses with search and pagination
- **User Authentication**: Secure login and registration system with JWT tokens
- **Shopping Cart**: Add courses to cart and manage purchases
- **Payment Processing**: Integrated payment system for course purchases
- **User Profiles**: Manage user information and view purchase history
- **Instructor Dashboard**: Course creation and management for instructors
- **Responsive Design**: Modern, mobile-first UI design

### 🎨 UI/UX Enhancements

- **Modern Design**: Clean, professional interface with custom CSS styling
- **Interactive Elements**: Hover effects, smooth transitions, and animations
- **Enhanced Cards**: Beautiful course cards with improved layout
- **Better Forms**: Styled input fields with icons and validation feedback
- **Improved Navigation**: Modern navbar with gradient background
- **Loading States**: Elegant loading spinners and empty state designs
- **Typography**: Custom fonts (Inter) for better readability

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- .NET Core backend API running on `https://localhost:7003`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd inveon-mini-course
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Built With

### Frontend Technologies

- **React 19.0.0** - UI library
- **React Router DOM 7.1.1** - Client-side routing
- **Bootstrap 5.3.3** - CSS framework
- **Axios 1.7.9** - HTTP client
- **React Hook Form 7.54.2** - Form management
- **JWT Decode 4.0.0** - JWT token handling
- **Day.js 1.11.13** - Date manipulation
- **AlertifyJS 1.14.0** - Notification system
- **React Icons 5.4.0** - Icon library
- **Font Awesome 6.0.0** - Additional icons
- **Google Fonts (Inter)** - Typography

### Custom Styling

- **Custom CSS** - Enhanced UI components with modern design
- **CSS Variables** - Consistent color scheme and spacing
- **Responsive Design** - Mobile-first approach
- **CSS Animations** - Smooth transitions and hover effects

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CourseCard.js   # Enhanced course display card
│   ├── NavBar.js       # Navigation component
│   ├── Pagination.js   # Improved pagination component
│   ├── SearchBar.js    # Enhanced search functionality
│   └── Spinner.js      # Loading component
├── context/            # React Context providers
│   ├── authContext.js  # Authentication state management
│   ├── cartContext.js  # Shopping cart state
│   └── courseContext.js # Course data management
├── pages/              # Application pages
│   ├── Cart.js         # Enhanced shopping cart page
│   ├── CourseDetails.js # Improved course detail view
│   ├── Home.js         # Enhanced homepage with hero section
│   ├── Instructor.js   # Course creation page
│   ├── Login.js        # Improved login form
│   ├── Payment.js      # Payment processing
│   ├── PrivateRoute.js # Route protection
│   ├── Purchase.js     # Purchase confirmation
│   ├── Register.js     # Enhanced registration form
│   └── UserProfile.js  # User profile management
├── services/           # API services
│   ├── api.js         # API endpoint functions
│   └── axiosInstance.js # Configured axios instance
├── styles/            # Custom styling
│   └── custom.css     # Enhanced UI styles
└── App.js             # Main application component
```

## 🎨 UI Improvements Made

### Design Enhancements

1. **Modern Color Scheme**: Custom CSS variables for consistent theming
2. **Enhanced Typography**: Inter font family for improved readability
3. **Card Redesign**: Beautiful course cards with hover effects and better imagery
4. **Button Styling**: Gradient buttons with hover animations
5. **Form Improvements**: Better input styling with icons and placeholders
6. **Navigation**: Modern navbar with backdrop blur and gradient background
7. **Loading States**: Professional loading spinners and empty state designs
8. **Responsive Design**: Mobile-first approach with improved breakpoints

### User Experience

1. **Hero Section**: Engaging homepage with clear call-to-action
2. **Search Enhancement**: Styled search bar with icon and improved UX
3. **Pagination**: Better pagination with navigation arrows
4. **Empty States**: Informative empty state designs with icons
5. **Course Details**: Enhanced course detail page with better layout
6. **Cart Design**: Improved shopping cart with order summary
7. **Animations**: Smooth transitions and fade-in effects

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (< 768px)

## 🔧 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## 🔐 Authentication

The application uses JWT-based authentication with:

- Access tokens for API requests
- Refresh tokens for session management
- Role-based access control (Student/Instructor)
- Protected routes for authenticated users

## 🛒 Shopping Cart Features

- Add/remove courses from cart
- Persistent cart state using React Context
- Order summary with pricing
- Integration with payment system
- Purchase history tracking

## 🎯 Key Features by User Role

### Students

- Browse and search courses
- View course details
- Add courses to cart
- Make purchases
- View purchase history
- Manage profile

### Instructors

- All student features
- Create and manage courses
- View course analytics
- Manage course content

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Bootstrap for the CSS framework
- Font Awesome for icons
- Unsplash for placeholder images
- Google Fonts for typography
- React community for excellent documentation

---

**Made with ❤️ for modern e-learning experiences**
