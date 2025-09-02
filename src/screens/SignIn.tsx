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
  ActivityIndicator,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { styles, Colors } from "../css/SignIn-UpScreen.styles";
import { signInUser } from "../APIs/APIs";
import { storeUserEmail } from "../utill/AsyncStorage";

interface LoginScreenProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onLogin?: (email: string, password: string) => void;
  onSecondaryAction?: () => void;
}

type SignInNavigationProps = NativeStackNavigationProp<RootParamList, "SignIn">;

export default function SignIn({
  title = "Welcome Back",
  subtitle = "Sign in to your account",
  primaryButtonText = "Sign In",
  secondaryButtonText = "Create Account",
  onLogin,
  onSecondaryAction,
}: LoginScreenProps) {
  const navigator = useNavigation<SignInNavigationProps>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const [buttonScale] = useState(new Animated.Value(1));
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const loadingRotation = useRef(new Animated.Value(0)).current;
  const buttonPulse = useRef(new Animated.Value(1)).current;
  
  // Input animation values
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

  const handleButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const startLoadingAnimation = () => {
    // Fade in loading indicator
    Animated.timing(loadingOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Continuous rotation animation
    loadingRotation.setValue(0);
    Animated.loop(
      Animated.timing(loadingRotation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();

    // Button pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonPulse, {
          toValue: 1.05,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(buttonPulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopLoadingAnimation = () => {
    Animated.timing(loadingOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    loadingRotation.stopAnimation();
    buttonPulse.stopAnimation(() => {
      buttonPulse.setValue(1);
    });
  };

  useEffect(() => {
    if (isLoading) {
      startLoadingAnimation();
    } else {
      stopLoadingAnimation();
    }
  }, [isLoading]);

  const handleSignIn = async () => {
    if (onLogin) {
      onLogin(email, password);
    } else {
      setIsLoading(true);
      animateButton();
      
      const result = await signInUser(email, password);

      if (result.success) {
        const emailStored = await storeUserEmail(email);

        if (emailStored) {
          navigator.replace("Home", {
            userId: result.data?.userId || "12345",
          });
        } else {
          console.error("Failed to store user email");
          navigator.replace("Home", {
            userId: result.data?.userId || "12345",
          });
        }
      }

      setIsLoading(false);
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      navigator.replace("SignUp");
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isFormValid = email.trim() && password.trim();

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
                {/* Logo Container with pulse animation */}
                <Animated.View style={[styles.logoContainer, { 
                  transform: [{ scale: scaleAnim }] 
                }]}>
                  <View
                    style={[
                      styles.logoCircle,
                      {
                        backgroundColor: Colors.primary,
                        shadowColor: Colors.primary,
                      }
                    ]}
                  >
                    <Text style={styles.logoText}>👤</Text>
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
                      isEmailFocused && styles.inputFocused,
                      styles.modernInput,
                      { backgroundColor: Colors.background },
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
                    editable={!isLoading}
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
                      isPasswordFocused && styles.inputFocused,
                      styles.modernInput,
                      { backgroundColor: Colors.background },
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
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.placeholderText}
                    secureTextEntry
                    autoComplete="password"
                    textContentType="password"
                    returnKeyType="done"
                    onSubmitEditing={
                      isFormValid && !isLoading ? handleSignIn : undefined
                    }
                    editable={!isLoading}
                  />
                </Animated.View>

                {/* Enhanced Primary Button */}
                <Animated.View style={[
                  styles.buttonContainer,
                  { 
                    transform: [
                      { scale: buttonScale },
                      { scale: isLoading ? buttonPulse : 1 }
                    ] 
                  }
                ]}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={isLoading || !isFormValid}
                    onPress={handleSignIn}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}
                    style={styles.buttonTouchable}
                  >
                    <LinearGradient
                      colors={isLoading || !isFormValid ? ['#E5E5EA', '#E5E5EA'] : ['#00ff9dff', '#5856D6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientButton}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        {isLoading && (
                          <Animated.View
                            style={[
                              { 
                                opacity: loadingOpacity,
                                marginRight: 8,
                                transform: [{
                                  rotate: loadingRotation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                  })
                                }]
                              }
                            ]}
                          >
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          </Animated.View>
                        )}
                        <Text style={[styles.primaryButtonText, styles.buttonTextModern]}>
                          {isLoading ? "Signing In..." : primaryButtonText}
                        </Text>
                      </View>
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
                  disabled={isLoading}
                >
                  <Text style={styles.secondaryButtonText}>
                    Don't have an account?{" "}
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
