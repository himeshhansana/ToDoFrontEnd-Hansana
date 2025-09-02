# 📝 ToDoFrontEnd-Hansana

A beautiful and modern Todo application built with React Native and Expo, featuring stunning animations, gradient designs, and a seamless user experience.

## ✨ Features

### 🎨 **Beautiful UI/UX**
- **Gradient Buttons**: Eye-catching gradient designs for Add Todo and Logout buttons
- **Welcome Animation**: Smooth welcome screen with logo rotation, fade-in effects, and loading dots
- **Modern Design**: Clean, minimalist interface with thoughtful spacing and typography
- **Responsive Layout**: Optimized for both iOS and Android devices

### 🚀 **Core Functionality**
- **User Authentication**: Secure sign-in and sign-up system
- **Todo Management**: Create, read, update, and delete todos
- **Todo Completion**: Mark todos as complete/incomplete with visual feedback
- **Expandable Cards**: Tap todos to expand and access delete functionality
- **Real-time Updates**: Instant UI updates when adding or modifying todos

### 🎭 **Animations & Interactions**
- **Welcome Screen**: Multi-layered entrance animation with logo rotation
- **Loading States**: Animated loading dots and smooth transitions
- **Button Interactions**: Satisfying press animations and visual feedback
- **Page Transitions**: Smooth navigation between screens
- **Success Messages**: Celebratory alerts with emojis

### 🔧 **Technical Features**
- **TypeScript**: Full type safety throughout the application
- **Async Storage**: Persistent user authentication
- **Error Handling**: Comprehensive error management and user feedback
- **Clean Architecture**: Separated concerns with organized file structure
- **Performance Optimized**: Efficient rendering and smooth animations

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v7
- **Styling**: StyleSheet with centralized theme system
- **Animations**: React Native Animated API
- **Gradients**: Expo Linear Gradient
- **Storage**: AsyncStorage for persistence
- **Platform**: Cross-platform (iOS & Android)

## 📱 Screenshots

```
🎯 Home Screen           📝 Add Todo Modal       ✅ Todo List
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  My Todos    [+]│     │  Add New Todo   │     │ ○ Buy groceries │
│  2 active, 1... │     │                 │     │ ✓ Call mom      │
│                 │     │ ┌─────────────┐ │     │ ○ Finish proj.. │
│ ○ Buy groceries │     │ │Todo Title   │ │     │                 │
│ ✓ Call mom      │     │ │             │ │     │ [Tap to expand] │
│ ○ Finish proj.. │     │ └─────────────┘ │     │                 │
│                 │     │                 │     │                 │
│                 │     │ [Cancel][Add]   │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ToDoFrontEnd-Hansana
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## 📁 Project Structure

```
ToDoFrontEnd-Hansana/
├── 📱 App.tsx                 # Main app component with navigation
├── 📝 index.ts               # App entry point
├── 📋 app.json               # Expo configuration
├── 🔧 package.json           # Dependencies and scripts
├── ⚙️  tsconfig.json          # TypeScript configuration
│
├── 🎨 assets/                # Static assets
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
│
└── 📂 src/
    ├── 🔌 APIs/              # API integration
    │   └── APIs.ts           # Todo CRUD operations
    │
    ├── 🎨 css/               # Styling
    │   ├── HomeScreen.styles.ts    # Home screen styles
    │   └── SignIn-UpScreen.styles.ts # Auth screen styles
    │
    ├── 📱 screens/           # App screens
    │   ├── Home.tsx          # Main todo interface
    │   ├── SignIn.tsx        # Login screen
    │   └── SignUp.tsx        # Registration screen
    │
    └── 🔧 utill/             # Utilities
        └── AsyncStorage.ts   # Local storage helpers
```

## 🎨 Design System

### **Colors**
```typescript
Colors = {
  primary: "#007AFF",        // iOS Blue
  secondary: "#5856D6",      // Purple
  background: "#F2F2F7",     // Light gray
  surface: "#FFFFFF",        // White
  text: "#1C1C1E",          // Dark text
  // ... and more
}
```

### **Gradients**
```typescript
gradients: {
  primary: ['#00ff9dff', '#5856D6'],      // Green to Purple
  logout: ['#dd0808ff', '#c06d3eff'],     // Red to Orange
  primaryDisabled: ['#E5E5EA', '#E5E5EA'] // Gray
}
```

## 🎭 Animation System

### **Welcome Animation Sequence**
1. **Logo Animation**: Fade in + Scale + Rotate (800ms)
2. **Text Slide**: Slide up from bottom (600ms)
3. **Content Fade**: Final elements fade in (500ms)
4. **Auto Transition**: Switches to main content (1000ms delay)

### **Loading Dots**
- Sequential pulsing animation
- 200ms staggered timing
- Smooth opacity transitions

## 🔧 API Integration

The app connects to a backend API for todo management:

```typescript
// Example API calls
fetchUserTodos()    // GET /todos
addTodo(title)      // POST /todos
deleteTodo(id)      // DELETE /todos/:id
```

## 📋 Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
```

## 🎯 Key Components

### **Home Screen (`src/screens/Home.tsx`)**
- Main todo interface
- Welcome animation system
- Todo CRUD operations
- Modal-based todo creation

### **Authentication (`src/screens/SignIn.tsx`, `src/screens/SignUp.tsx`)**
- User login/registration
- AsyncStorage integration
- Form validation

### **Styling (`src/css/HomeScreen.styles.ts`)**
- Centralized style system
- Animation utility functions
- Theme constants

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Style

- **TypeScript**: Strict typing for all components
- **ESLint**: Consistent code formatting
- **Component Structure**: Functional components with hooks
- **Styling**: StyleSheet with centralized theme system

## 🐛 Troubleshooting

### **Common Issues**

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS Simulator not loading**
   ```bash
   npx expo run:ios
   ```

3. **Android build errors**
   ```bash
   npx expo run:android
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** for the amazing development platform
- **React Native Community** for the robust ecosystem
- **Design Inspiration** from modern mobile design patterns

## 📞 Contact

**Developer**: Hansana  
**Project**: ToDoFrontEnd-Hansana  
**Version**: 1.0.0  

---

**Made with ❤️ and ☕ by Hansana**

> *"Productivity is never an accident. It is always the result of a commitment to excellence, intelligent planning, and focused effort."*
