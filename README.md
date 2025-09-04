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




import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView,
  Animated, ActivityIndicator, Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { styles, Colors } from "../css/UserScreen.styles";
import { getUserProfile, updateUserName } from "../APIs/APIs";
import { getUserEmail, clearUserEmail, getUserName, storeUserName } from "../utill/AsyncStorage";

type UserNavigationProps = NativeStackNavigationProp<RootParamList, "User">;

interface UserData {
  name: string;
  email: string;
}

export default function User() {
  const navigator = useNavigation<UserNavigationProps>();

  // User data state
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Edit name states
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isUpdatingName, setIsUpdatingName] = useState<boolean>(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Initial animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const userEmail = await getUserEmail();

      if (userEmail) {
        // Try to get profile from API first
        const result = await getUserProfile();

        if (result.success) {
          // If API call succeeds, use the data from API
          setUserData(result.user);
          setNewName(result.user.name);
          // Also store locally for offline access
          await storeUserName(result.user.name);
        } else {
          // If API call fails, fallback to AsyncStorage
          const userName = await getUserName();
          const userData = {
            name: userName || "User",
            email: userEmail,
          };
          setUserData(userData);
          setNewName(userData.name);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Fallback to AsyncStorage on error
      try {
        const userEmail = await getUserEmail();
        const userName = await getUserName();
        if (userEmail) {
          const userData = {
            name: userName || "User",
            email: userEmail,
          };
          setUserData(userData);
          setNewName(userData.name);
        }
      } catch (fallbackError) {
        console.error("Error with fallback:", fallbackError);
        Alert.alert("Error", "Failed to load user profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    setIsUpdatingName(true);
    try {
      // Try to update via API first
      const result = await updateUserName(newName.trim());

      if (result.success) {
        // Update local state
        setUserData(prev => prev ? { ...prev, name: newName.trim() } : null);
        setIsEditingName(false);
        // Also store locally for offline access
        await storeUserName(newName.trim());
      } else {
        // If API fails, just show the error (already shown by the API function)
        // Don't fallback to local storage only, as we want server sync
        console.error("Failed to update name via API:", result.error);
      }
    } catch (error) {
      console.error("Error updating name:", error);
      Alert.alert("Error", "Failed to update name. Please check your connection and try again.");
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await clearUserEmail();
            navigator.reset({
              index: 0,
              routes: [{ name: "SignIn" }],
            });
          },
        },
      ]
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const cancelNameEdit = () => {
    setNewName(userData?.name || "");
    setIsEditingName(false);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>User Profile</Text>
                <Text style={styles.subtitle}>Manage your account information</Text>
              </View>

              {/* Profile Information Card */}
              <View style={styles.profileCard}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {userData ? getInitials(userData.name) : "U"}
                  </Text>
                </View>

                <Text style={styles.sectionTitle}>Profile Information</Text>

                {/* Email Display - Read Only */}
                <View style={styles.emailSection}>
                  <Text style={styles.emailLabel}>Email Address</Text>
                  <Text style={styles.emailText}>{userData?.email}</Text>
                </View>
              </View>

              {/* Edit Name Section */}
              <View style={styles.editCard}>
                <View style={styles.formSection}>
                  <View style={styles.toggleButton}>
                    <Text style={styles.sectionTitle}>Display Name</Text>
                    {!isEditingName && (
                      <TouchableOpacity onPress={() => setIsEditingName(true)}>
                        <Text style={styles.toggleText}>Edit</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {isEditingName ? (
                    <>
                      <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <TextInput
                          style={[
                            styles.input,
                            isNameFocused && styles.inputFocused,
                          ]}
                          placeholder="Enter your name"
                          placeholderTextColor={Colors.placeholderText}
                          value={newName}
                          onChangeText={setNewName}
                          onFocus={() => setIsNameFocused(true)}
                          onBlur={() => setIsNameFocused(false)}
                          autoCapitalize="words"
                        />
                      </View>

                      <View style={styles.buttonRow}>
                        <View style={styles.buttonRowItem}>
                          <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={cancelNameEdit}
                            disabled={isUpdatingName}
                          >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.buttonRowItem}>
                          <TouchableOpacity
                            style={[
                              styles.primaryButton,
                              (isUpdatingName || !newName.trim()) && styles.primaryButtonDisabled,
                            ]}
                            onPress={handleUpdateName}
                            disabled={isUpdatingName || !newName.trim()}
                          >
                            {isUpdatingName ? (
                              <ActivityIndicator
                                color={(isUpdatingName || !newName.trim()) ? Colors.text : "#FFFFFF"}
                                size="small"
                              />
                            ) : (
                              <Text style={[
                                styles.primaryButtonText,
                                (isUpdatingName || !newName.trim()) && styles.primaryButtonTextDisabled,
                              ]}>
                                Update Name
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  ) : (
                    <View style={styles.emailSection}>
                      <Text style={styles.emailText}>{userData?.name}</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Logout Button */}
              <View style={styles.editCard}>
                <TouchableOpacity
                  style={styles.dangerButton}
                  onPress={handleLogout}
                >
                  <Text style={styles.dangerButtonText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
