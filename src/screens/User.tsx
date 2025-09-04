import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../App";
import { userStyles, Colors } from "../css/UserScreen.styles";
import { updateUserName } from "../APIs/APIs";
import { getUserEmail, getUserName, storeUserName, clearUserEmail } from "../utill/AsyncStorage";

type UserNavigationProps = NativeStackNavigationProp<RootParamList, "User">;

export default function User() {
  const navigator = useNavigation<UserNavigationProps>();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [editableUserName, setEditableUserName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const email = await getUserEmail();
      const name = await getUserName();

      if (email) {
        setUserEmail(email);
      }
      if (name) {
        setUserName(name);
        setEditableUserName(name);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPress = () => {
    setIsEditing(true);
    setEditableUserName(userName);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditableUserName(userName);
    setIsNameFocused(false);
  };

  const handleSaveChanges = async () => {
    if (!editableUserName.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    if (editableUserName.trim() === userName) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      const result = await updateUserName(editableUserName.trim());

      if (result.success) {
        // Update local storage and state
        await storeUserName(editableUserName.trim());
        setUserName(editableUserName.trim());
        setIsEditing(false);
        setIsNameFocused(false);
      }
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert("Error", "Failed to update username. Please try again.");
    } finally {
      setIsSaving(false);
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
            try {
              await clearUserEmail();
              navigator.navigate("SignIn");
            } catch (error) {
              console.error("Error during logout:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ]
    );
  };

  const getInitials = (name: string, email: string): string => {
    if (name && name.trim()) {
      const nameParts = name.trim().split(" ");
      if (nameParts.length >= 2) {
        return `${nameParts[0][0]}${nameParts[1][0]}`;
      }
      return nameParts[0][0];
    }
    // Fallback to email initial if no name
    return email ? email[0] : "U";
  };

  if (isLoading) {
    return (
      <SafeAreaView style={userStyles.safeArea}>
        <StatusBar style="dark" />
        <View style={userStyles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={userStyles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={userStyles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView 
        style={userStyles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={userStyles.profileSection}>
            {/* Avatar */}
            <View style={userStyles.avatarContainer}>
              <LinearGradient
                colors={Colors.gradients.primary}
                start={Colors.gradientConfig.start}
                end={Colors.gradientConfig.end}
                style={userStyles.avatarCircle}
              >
                <Text style={userStyles.avatarText}>
                  {getInitials(userName, userEmail)}
                </Text>
              </LinearGradient>
            </View>

            {/* User Info */}
            <View style={userStyles.userInfoContainer}>
              {/* Email Field (Read-only) */}
              <View style={userStyles.fieldContainer}>
                <Text style={userStyles.fieldLabel}>Email Address</Text>
                <Text style={userStyles.fieldValue}>{userEmail || "No email"}</Text>
              </View>

              {/* Username Field */}
              <View style={userStyles.fieldContainer}>
                <Text style={userStyles.fieldLabel}>Username</Text>
                {isEditing ? (
                  <TextInput
                    style={[
                      userStyles.fieldValue,
                      userStyles.editableField,
                      isNameFocused && userStyles.focusedField,
                    ]}
                    value={editableUserName}
                    onChangeText={setEditableUserName}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    placeholder="Enter your username"
                    placeholderTextColor={Colors.placeholderText}
                    autoCapitalize="words"
                    autoCorrect={false}
                    editable={!isSaving}
                  />
                ) : (
                  <Text style={userStyles.fieldValue}>{userName || "No username"}</Text>
                )}

                {/* Edit/Save/Cancel Buttons */}
                {!isEditing ? (
                  <TouchableOpacity
                    onPress={handleEditPress}
                    activeOpacity={Colors.activeOpacity.button}
                  >
                    <LinearGradient
                      colors={Colors.gradients.primary}
                      start={Colors.gradientConfig.start}
                      end={Colors.gradientConfig.end}
                      style={userStyles.editButton}
                    >
                      <Text style={userStyles.editButtonText}>✏️ Edit Username</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={handleSaveChanges}
                      disabled={isSaving}
                      activeOpacity={Colors.activeOpacity.button}
                    >
                      <LinearGradient
                        colors={isSaving ? Colors.gradients.secondary : Colors.gradients.primary}
                        start={Colors.gradientConfig.start}
                        end={Colors.gradientConfig.end}
                        style={userStyles.saveButton}
                      >
                        {isSaving ? (
                          <ActivityIndicator color={Colors.surface} />
                        ) : (
                          <Text style={userStyles.saveButtonText}>💾 Save Changes</Text>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={userStyles.cancelButton}
                      onPress={handleCancelEdit}
                      disabled={isSaving}
                      activeOpacity={Colors.activeOpacity.button}
                    >
                      <Text style={userStyles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Logout Section */}
          <View style={userStyles.logoutSection}>
            <TouchableOpacity
              style={userStyles.logoutButton}
              onPress={handleLogout}
              activeOpacity={Colors.activeOpacity.button}
            >
              <Text style={userStyles.logoutButtonText}>🚪 Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
