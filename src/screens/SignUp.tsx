import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { styles, Colors } from "../css/SignIn-UpScreen.styles";
import { signUpUser } from "../APIs/APIs";

const { width } = Dimensions.get('window');

interface SignUpScreenProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onSignUp?: (name: string, email: string, password: string) => void;
  onSecondaryAction?: () => void;
}

type SignUpNavigationProps = NativeStackNavigationProp<RootParamList, "SignUp">;

export default function SignUp({
  title = "Create Account",
  subtitle = "Sign up to get started",
  primaryButtonText = "Sign Up",
  secondaryButtonText = "Sign In",
  onSignUp,
  onSecondaryAction,
}: SignUpScreenProps) {
  const navigator = useNavigation<SignUpNavigationProps>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Input animation values
  const nameInputScale = useRef(new Animated.Value(1)).current;
  const emailInputScale = useRef(new Animated.Value(1)).current;
  const passwordInputScale = useRef(new Animated.Value(1)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animateInputFocus = (inputScale: Animated.Value, focused: boolean) => {
    Animated.spring(inputScale, {
      toValue: focused ? 1.02 : 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSignUp = async () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      return;
    }

    setIsLoading(true);
    animateButton();

    try {
      if (onSignUp) {
        onSignUp(name, email, password);
      } else {
        const result = await signUpUser(name, email, password);
        if (result.success) {
          navigator.replace("SignIn");
        }
      }
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      navigator.replace("SignIn");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isFormValid = name.trim() && email.trim() && password.trim();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <Animated.View
              style={[
                styles.content,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim }
                  ]
                }
              ]}
            >
              {/* Header with enhanced animation */}
              <Animated.View
                style={[
                  styles.header,
                  {
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                {/* Create Account Illustration */}
                <Animated.View
                  style={[
                    styles.illustrationContainer,
                    {
                      transform: [{ scale: scaleAnim }]
                    }
                  ]}
                >
                  <View style={styles.signUpMainIcon}>
                    <Text style={styles.signUpMainIconText}>👤</Text>
                  </View>
                  <View style={styles.signUpIconsContainer}>
                    <View style={styles.signUpIcon1}>
                      <Text style={styles.signUpIcon1Text}>👤</Text>
                    </View>
                    <View style={styles.signUpConnector} />
                    <View style={styles.signUpIcon2}>
                      <Text style={styles.signUpIcon2Text}>📧</Text>
                    </View>
                    <View style={styles.signUpConnector} />
                    <View style={styles.signUpIcon3}>
                      <Text style={styles.signUpIcon3Text}>✨</Text>
                    </View>
                  </View>
                </Animated.View>

                <Animated.Text
                  style={[
                    styles.title,
                    {
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  {title}
                </Animated.Text>
                <Animated.Text
                  style={[
                    styles.subtitle,
                    {
                      opacity: fadeAnim,
                      transform: [{ translateY: slideAnim }]
                    }
                  ]}
                >
                  {subtitle}
                </Animated.Text>
              </Animated.View>

              {/* Enhanced Form Card */}
              <Animated.View
                style={[
                  styles.formCard,
                  styles.modernFormCard,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                      { scale: scaleAnim }
                    ]
                  }
                ]}
              >
                {/* Name Input with animation */}
                <Animated.View
                  style={[
                    styles.inputGroup,
                    {
                      transform: [{ scale: nameInputScale }]
                    }
                  ]}
                >
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.modernInput,
                      isNameFocused && styles.inputFocused,
                    ]}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => {
                      setIsNameFocused(true);
                      animateInputFocus(nameInputScale, true);
                    }}
                    onBlur={() => {
                      setIsNameFocused(false);
                      animateInputFocus(nameInputScale, false);
                    }}
                    placeholder="Enter your full name"
                    placeholderTextColor={Colors.placeholderText}
                    autoCapitalize="words"
                    autoComplete="name"
                    textContentType="name"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </Animated.View>

                {/* Email Input with animation */}
                <Animated.View
                  style={[
                    styles.inputGroup,
                    {
                      transform: [{ scale: emailInputScale }]
                    }
                  ]}
                >
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.modernInput,
                      isEmailFocused && styles.inputFocused,
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => {
                      setIsEmailFocused(true);
                      animateInputFocus(emailInputScale, true);
                    }}
                    onBlur={() => {
                      setIsEmailFocused(false);
                      animateInputFocus(emailInputScale, false);
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.placeholderText}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </Animated.View>

                {/* Password Input with animation */}
                <Animated.View
                  style={[
                    styles.inputGroup,
                    {
                      transform: [{ scale: passwordInputScale }]
                    }
                  ]}
                >
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.modernInput,
                      isPasswordFocused && styles.inputFocused,
                    ]}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => {
                      setIsPasswordFocused(true);
                      animateInputFocus(passwordInputScale, true);
                    }}
                    onBlur={() => {
                      setIsPasswordFocused(false);
                      animateInputFocus(passwordInputScale, false);
                    }}
                    placeholder="Create a password"
                    placeholderTextColor={Colors.placeholderText}
                    secureTextEntry
                    autoComplete="password-new"
                    textContentType="newPassword"
                    returnKeyType="done"
                    onSubmitEditing={handleSignUp}
                  />
                </Animated.View>

                {/* Enhanced Primary Button */}
                <Animated.View
                  style={[
                    styles.buttonContainer,
                    {
                      transform: [{ scale: buttonScale }]
                    }
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={isLoading || !isFormValid}
                    onPress={handleSignUp}
                    style={styles.buttonTouchable}
                  >
                    <LinearGradient
                      colors={isLoading || !isFormValid ? ['#E5E5EA', '#E5E5EA'] : ['#00ff9dff', '#5856D6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientButton}
                    >
                      <Text style={[styles.primaryButtonText, styles.buttonTextModern]}>
                        {isLoading ? 'Creating Account...' : primaryButtonText}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>

              {/* Enhanced Secondary Action */}
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }}
              >
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleSecondaryAction}
                  activeOpacity={0.6}
                >
                  <Text style={styles.secondaryButtonText}>
                    Already have an account?{" "}
                    <Text style={styles.linkText}>{secondaryButtonText}</Text>
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
