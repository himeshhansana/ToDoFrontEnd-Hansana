import { StyleSheet, Platform } from "react-native";

export const Colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  background: "#F2F2F7",
  surface: "#FFFFFF",
  text: "#1C1C1E",
  secondaryText: "#8E8E93",
  placeholderText: "#C7C7CC",
  border: "#E5E5EA",
  focusedBorder: "#007AFF",
  disabled: "#F2F2F7",
  link: "#007AFF",
  // Gradient colors
  gradients: {
    primary: ['#00ff9dff', '#5856D6'],
    primaryDisabled: ['#E5E5EA', '#E5E5EA'],
  },
  // Gradient configurations
  gradientConfig: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Animation configurations
  animations: {
    mainContentTranslateY: {
      inputRange: [0, 1] as [number, number],
      outputRange: [20, 0] as [number, number],
    },
    logoRotation: {
      inputRange: [0, 1] as [number, number],
      outputRange: ['0deg', '360deg'] as [string, string],
    },
  },
  // Touch interaction constants
  activeOpacity: {
    button: 0.8,
    card: 1,
  },
  // Platform-specific constants
  keyboardBehavior: Platform.OS === "ios" ? "padding" : "height",
} as const;

// Animation utility functions
export const getAnimatedLogoStyle = (fadeAnim: any, scaleAnim: any, rotateInterpolate: any) => [
  homeStyles.welcomeLogoContainer,
  {
    opacity: fadeAnim,
    transform: [
      { scale: scaleAnim },
      { rotate: rotateInterpolate }
    ]
  }
];

export const getAnimatedTextStyle = (slideAnim: any, fadeAnim: any) => [
  homeStyles.welcomeTextContainer,
  {
    transform: [{ translateY: slideAnim }],
    opacity: fadeAnim,
  }
];

export const getAnimatedLoadingStyle = (contentFadeAnim: any) => [
  homeStyles.welcomeLoadingContainer,
  {
    opacity: contentFadeAnim,
  }
];

export const getAnimatedMainContentStyle = (mainContentAnim: any) => [
  homeStyles.animatedMainContent,
  {
    opacity: mainContentAnim,
    transform: [
      {
        translateY: mainContentAnim.interpolate({
          inputRange: Colors.animations.mainContentTranslateY.inputRange,
          outputRange: Colors.animations.mainContentTranslateY.outputRange,
        }),
      },
    ],
  },
];

export const getAnimatedDotStyle = (dotAnim: any) => [
  homeStyles.loadingDot,
  { opacity: dotAnim }
];

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: Colors.surface,
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },

  logoutButtonText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "500",
  },

  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
  todoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    transform: [{ scale: 1 }],
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    marginRight: 12,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
    lineHeight: 22,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: Colors.secondaryText,
  },
  toggleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    transform: [{ scale: 1 }],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  completedButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.border,
  },
  completedButtonText: {
    color: Colors.surface,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 28,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalIcon: {
    fontSize: 32,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: "center",
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 28,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text,
    letterSpacing: 0.3,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: Colors.disabled,
  },
  disabledButtonText: {
    color: Colors.secondaryText,
  },
  // Shared input styles for modal
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 12,
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.surface,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  inputFocused: {
    borderColor: Colors.focusedBorder,
    borderWidth: 2,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 2,
  },
  inputFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  characterCount: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: "500",
  },
  primaryButtonContainer: {
    flex: 1,
  },
  primaryButton: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: Colors.surface,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  primaryButtonTextDisabled: {
    color: "#A1A1AA",
    opacity: 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
  },

  actionButtons: {
    flexDirection: "row",
    marginTop: 12,
    overflow: "hidden",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF3B30",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  deleteButtonPressed: {
    backgroundColor: "#D12B20",
    transform: [{ scale: 0.95 }],
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  todoCardPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.15,
    elevation: 4,
  },

  toggleButtonPressed: {
    transform: [{ scale: 0.9 }],
  },

  // Welcome Animation Styles
  welcomeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  welcomeGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  welcomeLogoContainer: {
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  welcomeLogo: {
    fontSize: 60,
    textAlign: "center",
  },
  welcomeTextContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.surface,
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  welcomeLoadingContainer: {
    alignItems: "center",
  },
  welcomeLoadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  loadingDotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },

  // Base Animation Styles
  animatedMainContent: {
    flex: 1,
  },
  animatedLogoBase: {
    // Base styles are in welcomeLogoContainer
  },
  animatedTextBase: {
    // Base styles are in welcomeTextContainer
  },
  animatedLoadingBase: {
    // Base styles are in welcomeLoadingContainer
  },
});
