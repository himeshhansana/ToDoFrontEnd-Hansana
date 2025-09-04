import { Alert } from "react-native";
import { getUserEmail } from "../utill/AsyncStorage";

const BASE_URL = "https://017c30091b10.ngrok-free.app/todos-app-back-end";

//user sign up
export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Account created successfully!");

      return { success: true, data };
    } else {
      console.log(data.message);
      Alert.alert("Error", data.message || "Sign up failed");
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Network error. Please try again.");
    return { success: false, error: "Network error" };
  }
};

//user sign in
export const signInUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      Alert.alert("Error", data.message || "Sign in failed");
      return { success: false, error: data.message };
    }
  } catch (error) {
    Alert.alert("Error", "Network error. Please try again.");
    return { success: false, error: "Network error" };
  }
};

// Fetch all todos for logged-in user
export const fetchUserTodos = async () => {
  try {
    const userEmail = await getUserEmail();

    if (!userEmail) {
      Alert.alert("Error", "User session expired. Please sign in again.");
      return { success: false, error: "No user email found" };
    }

    const response = await fetch(`${BASE_URL}/api/todos?email=${userEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, todos: data.todos || data };
    } else {
      Alert.alert("Error", data.message || "Failed to fetch todos");
      return { success: false, error: data.message };
    }
  } catch (error) {
    Alert.alert("Error", "Network error. Please try again.");
    return { success: false, error: "Network error" };
  }
};

// Add new todo
export const addTodo = async (title: string) => {
  try {
    const userEmail = await getUserEmail();

    if (!userEmail) {
      Alert.alert("Error", "User session expired. Please sign in again.");
      return { success: false, error: "No user email found" };
    }

    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        userEmail: userEmail,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, todo: data.todo || data };
    } else {
      console.log(data.message);
      Alert.alert("Error", data.message || "Failed to add todo");
      return { success: false, error: data.message };
    }
  } catch (error) {
    Alert.alert("Error", "Network error. Please try again.");
    return { success: false, error: "Network error" };
  }
};

// Delete Todo
export const deleteTodo = async (todoId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/todos?id=${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      if (response.status === 204) {
        return { success: true, data: null };
      }
      const data = await response.json();
      return { success: true, data };
    } else {
      let errorMessage = "Failed to delete todo";
      try {
        const data = await response.json();
        errorMessage = data.message || errorMessage;
      } catch (e) {
      }

      Alert.alert("Error", errorMessage);
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    Alert.alert("Error", "Network error. Please try again.");
    return { success: false, error: "Network error" };
  }
};



// Update user name
export const updateUserName = async (newName: string) => {
  try {
    const userEmail = await getUserEmail();

    if (!userEmail) {
      Alert.alert("Error", "User session expired. Please sign in again.");
      return { success: false, error: "No user email found" };
    }

    const response = await fetch(`${BASE_URL}/api/auth/update-name`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        name: newName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Success", "Username updated successfully!");
      return { success: true, data };
    } else {
      Alert.alert("Error", data.message || "Failed to update username");
      return { success: false, error: data.message };
    }
  } catch (error) {
    Alert.alert("Error", "Network error. Please try again.");
    return { success: false, error: "Network error" };
  }
};