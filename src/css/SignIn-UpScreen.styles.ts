import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Colors = {
  primary: '#1c44f8ff',
  secondary: '#5856D6',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  secondaryText: '#8E8E93',
  placeholderText: '#C7C7CC',
  border: '#E5E5EA',
  focusedBorder: '#1c44f8ff',
  disabled: '#F2F2F7',
  link: '#1c44f8ff',
  gradientStart: '#00ff9dff',
  gradientEnd: '#5856D6',
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  inputFocused: {
    borderColor: Colors.focusedBorder,
    borderWidth: 2,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.disabled,
    opacity: 0.6,
  },
  primaryButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  linkText: {
    color: Colors.link,
    fontWeight: '600',
  },
  // Modern styles
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  logoText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  modernFormCard: {
    marginTop: 0,
    paddingTop: 32,
    paddingBottom: 32,
    borderRadius: 24,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  modernInput: {
    borderRadius: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  buttonTouchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradientButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonTextModern: {
    fontWeight: '600',
  },
  // Illustration styles for SignIn and SignUp
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // SignIn specific styles
  signInMainIcon: {
    width: 120,
    height: 120,
    backgroundColor: '#F0F8FF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  signInMainIconText: {
    fontSize: 50,
  },
  signInIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  signInIcon1: {
    width: 40,
    height: 40,
    backgroundColor: '#E8F5E8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  signInIcon1Text: {
    fontSize: 20,
  },
  signInIcon2: {
    width: 60,
    height: 40,
    backgroundColor: '#FFF0E6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  signInIcon2Text: {
    fontSize: 18,
  },
  signInIcon3: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F0FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInIcon3Text: {
    fontSize: 20,
  },
  // SignUp specific styles
  signUpMainIcon: {
    width: 120,
    height: 120,
    backgroundColor: '#F0FFF0',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  signUpMainIconText: {
    fontSize: 50,
  },
  signUpIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  signUpIcon1: {
    width: 45,
    height: 45,
    backgroundColor: '#FFE6F2',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  signUpIcon1Text: {
    fontSize: 22,
  },
  signUpConnector: {
    width: 25,
    height: 3,
    backgroundColor: '#E0E0E0',
    borderRadius: 1.5,
    marginRight: 8,
  },
  signUpIcon2: {
    width: 45,
    height: 45,
    backgroundColor: '#E6F3FF',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  signUpIcon2Text: {
    fontSize: 22,
  },
  signUpIcon3: {
    width: 45,
    height: 45,
    backgroundColor: '#F0FFE6',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpIcon3Text: {
    fontSize: 22,
  },
  // Loading animation container
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});