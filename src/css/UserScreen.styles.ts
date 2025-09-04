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
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  // Gradient colors
  gradients: {
    primary: ['#00ff9dff', '#5856D6'],
    secondary: ['#007AFF', '#5856D6'],
    surface: ['#FFFFFF', '#F8F9FA'],
  },
  // Gradient configurations
  gradientConfig: {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Touch interaction constants
  activeOpacity: {
    button: 0.8,
    card: 0.95,
  },
} as const;

export const userStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  profileSection: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 25,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.surface,
    textTransform: "uppercase",
  },
  userInfoContainer: {
    gap: 20,
  },
  fieldContainer: {
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: Colors.secondaryText,
    backgroundColor: Colors.disabled,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editableField: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    color: Colors.text,
  },
  focusedField: {
    borderColor: Colors.focusedBorder,
    backgroundColor: Colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.surface,
  },
  saveButton: {
    marginTop: 25,
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.surface,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.disabled,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondaryText,
  },
  logoutSection: {
    marginTop: 40,
    marginHorizontal: 20,
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.error,
    ...Platform.select({
      ios: {
        shadowColor: Colors.error,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.secondaryText,
  },
});
