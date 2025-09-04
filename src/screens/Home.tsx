import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TouchableOpacity, SafeAreaView, FlatList, Modal, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
  Keyboard, Animated, Easing,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { homeStyles, Colors, getAnimatedLogoStyle, getAnimatedTextStyle, getAnimatedLoadingStyle, getAnimatedMainContentStyle, getAnimatedDotStyle } from "../css/HomeScreen.styles";
import { fetchUserTodos, addTodo, deleteTodo } from "../APIs/APIs";
import { getUserEmail, clearUserEmail } from "../utill/AsyncStorage";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface HomeScreenProps {
  onToggleTodo?: (id: string) => void;
  onLogout?: () => void;
}

type HomeNavigationProps = NativeStackNavigationProp<RootParamList, "Home">;

export default function Home({ onToggleTodo, onLogout }: HomeScreenProps) {
  const navigator = useNavigation<HomeNavigationProps>();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [isTitleFocused, setIsTitleFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedTodoId, setExpandedTodoId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);
  const [isAddingTodo, setIsAddingTodo] = useState<boolean>(false);

  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const dot1Anim = useRef(new Animated.Value(0.3)).current;
  const dot2Anim = useRef(new Animated.Value(0.3)).current;
  const dot3Anim = useRef(new Animated.Value(0.3)).current;
  const mainContentAnim = useRef(new Animated.Value(0)).current;

  // Form validation
  const isFormValid = newTodoTitle.trim().length > 0;
  const isAddButtonDisabled = isAddingTodo || !isFormValid;

  useEffect(() => {
    initializeComponent();
  }, []);

  const initializeComponent = async () => {
    const storedEmail = await getUserEmail();

    if (storedEmail) {
      loadTodos();
    } else {
      Alert.alert("Session Expired", "Please sign in again");
      navigator.replace("SignIn");
    }
  };

  const loadTodos = async () => {
    setIsLoading(true);
    const result = await fetchUserTodos();

    if (result.success && result.todos) {
      setTodos(result.todos);
    }

    // Start welcome animation
    setShowWelcome(true);
    startWelcomeAnimation();
  };

  const refreshTodosOnly = async () => {
    const result = await fetchUserTodos();
    if (result.success && result.todos) {
      setTodos(result.todos);
    }
    return result;
  };

  const startWelcomeAnimation = () => {
    // Reset all animations
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.5);
    slideAnim.setValue(50);
    rotateAnim.setValue(0);
    contentFadeAnim.setValue(0);

    // Start loading dots animation
    startLoadingDotsAnimation();

    // Sequential animations
    Animated.sequence([
      // Logo animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      // Text slide up
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Content fade in
      Animated.timing(contentFadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Hide welcome screen after animation
      setTimeout(() => {
        setShowWelcome(false);
        setIsLoading(false);
        // Start main content animation
        Animated.timing(mainContentAnim, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }).start();
      }, 1000);
    });
  };

  const startLoadingDotsAnimation = () => {
    const animateDot = (dotAnim: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim, {
            toValue: 1,
            duration: 600,
            delay,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(dotAnim, {
            toValue: 0.3,
            duration: 600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1Anim, 0);
    animateDot(dot2Anim, 200);
    animateDot(dot3Anim, 400);
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) {
      Alert.alert("Error", "Please enter a todo title");
      return;
    }

    setIsAddingTodo(true);

    try {
      const result = await addTodo(newTodoTitle.trim());

      if (result.success) {
        // Refresh todos without animation
        await refreshTodosOnly();

        // Clear form and close modal
        setNewTodoTitle("");
        setIsModalVisible(false);

        // Show success message
        Alert.alert(
          "Success! 🎉",
          `"${newTodoTitle.trim()}" has been added to your todo list!`,
          [
            {
              text: "Great!",
              style: "default",
            }
          ]
        );
      } else {
        Alert.alert("Error", result.error || "Failed to add todo. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsAddingTodo(false);
    }
  };

  const handleToggleTodo = (id: string) => {
    if (onToggleTodo) {
      onToggleTodo(id);
    } else {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const handleCardPress = (todoId: string) => {
    setExpandedTodoId(expandedTodoId === todoId ? null : todoId);
  };

  const handleDeleteTodo = async (todo: Todo) => {
    Alert.alert(
      "Delete Todo",
      `Are you sure you want to delete "${todo.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const result = await deleteTodo(todo.id);

            if (result.success) {
              setTodos((prevTodos) =>
                prevTodos.filter((t) => t.id !== todo.id)
              );
              setExpandedTodoId(null);
              Alert.alert("Success", "Todo deleted successfully!");
            } else {
              Alert.alert("Error", result.error || "Failed to delete todo");
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
    } else {
      const cleared = await clearUserEmail();
      if (cleared) {
        navigator.replace("SignIn");
      } else {
        Alert.alert("Error", "Failed to logout properly");
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isExpanded = expandedTodoId === item.id;

    return (
      <TouchableOpacity
        style={[homeStyles.todoCard, isExpanded && homeStyles.todoCardPressed]}
        onPress={() => handleCardPress(item.id)}
        activeOpacity={Colors.activeOpacity.card}
      >
        <View style={homeStyles.todoContent}>
          <Text
            style={[
              homeStyles.todoTitle,
              item.completed && homeStyles.completedTitle,
            ]}
          >
            {item.title}
          </Text>

          {/* Delete button - show when expanded */}
          {isExpanded && (
            <View style={homeStyles.actionButtons}>
              <TouchableOpacity
                style={homeStyles.deleteButton}
                onPress={() => handleDeleteTodo(item)}
                activeOpacity={Colors.activeOpacity.card}
                onPressIn={(e) => {
                  e.currentTarget.setNativeProps({
                    style: [
                      homeStyles.deleteButton,
                      homeStyles.deleteButtonPressed,
                    ],
                  });
                }}
                onPressOut={(e) => {
                  e.currentTarget.setNativeProps({
                    style: homeStyles.deleteButton,
                  });
                }}
              >
                <Text style={homeStyles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            homeStyles.toggleButton,
            item.completed && homeStyles.completedButton,
          ]}
          onPress={(e) => {
            e.stopPropagation();
            handleToggleTodo(item.id);
          }}
          activeOpacity={Colors.activeOpacity.card}
          onPressIn={(e) => {
            e.currentTarget.setNativeProps({
              style: [
                homeStyles.toggleButton,
                homeStyles.toggleButtonPressed,
                item.completed && homeStyles.completedButton,
              ],
            });
          }}
          onPressOut={(e) => {
            e.currentTarget.setNativeProps({
              style: [
                homeStyles.toggleButton,
                item.completed && homeStyles.completedButton,
              ],
            });
          }}
        >
          <Text
            style={[
              homeStyles.toggleButtonText,
              item.completed && homeStyles.completedButtonText,
            ]}
          >
            {item.completed ? "✓" : "○"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  // Get user email for welcome message
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const getEmail = async () => {
      const email = await getUserEmail();
      setUserEmail(email || "User");
    };
    getEmail();
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: Colors.animations.logoRotation.inputRange,
    outputRange: Colors.animations.logoRotation.outputRange,
  });

  if (isLoading || showWelcome) {
    return (
      <SafeAreaView style={homeStyles.welcomeContainer}>
        <LinearGradient
          colors={Colors.gradients.primary}
          style={homeStyles.welcomeGradient}
          start={Colors.gradientConfig.start}
          end={Colors.gradientConfig.end}
        >
          {/* Animated Logo */}
          <Animated.View
            style={getAnimatedLogoStyle(fadeAnim, scaleAnim, rotateInterpolate)}
          >
            <Text style={homeStyles.welcomeLogo}>📝</Text>
          </Animated.View>

          {/* Animated Welcome Text */}
          <Animated.View
            style={getAnimatedTextStyle(slideAnim, fadeAnim)}
          >
            <Text style={homeStyles.welcomeTitle}>Welcome Back!</Text>
            <Text style={homeStyles.welcomeSubtitle}>
              Hello {userEmail.split('@')[0] || 'User'}
            </Text>
          </Animated.View>

          {/* Animated Loading Text */}
          <Animated.View
            style={getAnimatedLoadingStyle(contentFadeAnim)}
          >
            <Text style={homeStyles.welcomeLoadingText}>
              {isLoading ? "Loading your todos..." : "Ready to be productive!"}
            </Text>

            {/* Loading dots animation */}
            {isLoading && (
              <View style={homeStyles.loadingDotsContainer}>
                <Animated.View style={getAnimatedDotStyle(dot1Anim)} />
                <Animated.View style={getAnimatedDotStyle(dot2Anim)} />
                <Animated.View style={getAnimatedDotStyle(dot3Anim)} />
              </View>
            )}
          </Animated.View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <Animated.View
      style={getAnimatedMainContentStyle(mainContentAnim)}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={homeStyles.header}>
          <View>
            <Text style={homeStyles.title}>My Todos</Text>
            <Text style={homeStyles.subtitle}>
              {activeTodos.length} active, {completedTodos.length} completed
            </Text>
          </View>

          <View style={homeStyles.headerButtons}>
            <TouchableOpacity
              style={homeStyles.addButton}
              onPress={() => setIsModalVisible(true)}
              activeOpacity={Colors.activeOpacity.button}
            >
              <Text style={homeStyles.addButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={homeStyles.addButton}
              onPress={() => navigator.navigate("User")}
              activeOpacity={Colors.activeOpacity.button}
            >
              <Text style={homeStyles.addButtonText}>👤</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              activeOpacity={Colors.activeOpacity.button}
            >
              <LinearGradient
                colors={["#ff4d4f", "#ff7875"]}
                style={homeStyles.logoutButton}
                start={Colors.gradientConfig.start}
                end={Colors.gradientConfig.end}
              >
                <Text style={homeStyles.logoutButtonText}>🚪</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Todo List */}
        <View style={homeStyles.listContainer}>
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTodoItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={homeStyles.listContent}
            ItemSeparatorComponent={() => <View style={homeStyles.separator} />}
          />
        </View>

        {/* Add Todo Modal */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            if (!isAddingTodo) {
              setIsModalVisible(false);
              setNewTodoTitle("");
            }
          }}
        >
          <KeyboardAvoidingView
            style={homeStyles.modalContainer}
            behavior={Colors.keyboardBehavior}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={homeStyles.modalOverlay}>
                <View style={homeStyles.modalContent}>
                  {/* Header with icon */}
                  <View style={homeStyles.modalHeader}>
                    <View style={homeStyles.modalIconContainer}>
                      <Text style={homeStyles.modalIcon}>✏️</Text>
                    </View>
                    <Text style={homeStyles.modalTitle}>Add New Todo</Text>
                    <Text style={homeStyles.modalSubtitle}>What would you like to accomplish?</Text>
                  </View>

                  <View style={homeStyles.inputGroup}>
                    <Text style={homeStyles.inputLabel}>Todo Title</Text>
                    <TextInput
                      style={[
                        homeStyles.input,
                        isTitleFocused && homeStyles.inputFocused,
                        !isFormValid && newTodoTitle.length > 0 && !isAddingTodo && homeStyles.inputError
                      ]}
                      value={newTodoTitle}
                      onChangeText={setNewTodoTitle}
                      onFocus={() => setIsTitleFocused(true)}
                      onBlur={() => setIsTitleFocused(false)}
                      placeholder="e.g., Buy groceries, Call mom, Finish project..."
                      placeholderTextColor={Colors.placeholderText}
                      autoCapitalize="sentences"
                      returnKeyType="done"
                      onSubmitEditing={handleAddTodo}
                      autoFocus
                      multiline={false}
                      maxLength={100}
                      editable={!isAddingTodo}
                    />
                    <View style={homeStyles.inputFooter}>
                      <Text style={homeStyles.characterCount}>
                        {newTodoTitle.length}/100
                      </Text>
                    </View>
                  </View>

                  <View style={homeStyles.modalButtons}>
                    <TouchableOpacity
                      style={[
                        homeStyles.cancelButton,
                        isAddingTodo && homeStyles.disabledButton
                      ]}
                      onPress={() => {
                        if (!isAddingTodo) {
                          setIsModalVisible(false);
                          setNewTodoTitle("");
                        }
                      }}
                      activeOpacity={isAddingTodo ? 1 : Colors.activeOpacity.button}
                      disabled={isAddingTodo}
                    >
                      <Text style={[
                        homeStyles.cancelButtonText,
                        isAddingTodo && homeStyles.disabledButtonText
                      ]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleAddTodo}
                      activeOpacity={Colors.activeOpacity.button}
                      disabled={isAddButtonDisabled}
                      style={homeStyles.primaryButtonContainer}
                    >
                      <LinearGradient
                        colors={isAddButtonDisabled ? Colors.gradients.primaryDisabled : Colors.gradients.primary}
                        style={homeStyles.primaryButton}
                        start={Colors.gradientConfig.start}
                        end={Colors.gradientConfig.end}
                      >
                        <Text style={[
                          homeStyles.primaryButtonText,
                          isAddButtonDisabled && homeStyles.primaryButtonTextDisabled
                        ]}>
                          {isAddingTodo ? 'Adding...' : 'Add Todo'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </Animated.View>
  );
}
