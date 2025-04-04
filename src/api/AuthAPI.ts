import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";

// Function to create a new user account
export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = '/auth/create-account';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// Function to confirm an account using a token
export async function confirmAccount(formData: ConfirmToken) {
  try {
    const url = '/auth/confirm-account';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// Function to authenticate a user and store the token in localStorage
export async function authenticateUser(formData: UserLoginForm) {
  try {
    const url = '/auth/login';
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem('AUTH_TOKEN_ACTIVO', data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// Function to initiate password recovery
export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const url = '/auth/forgot-password';
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// Function to validate a password reset token
export async function validateToken(formData: ConfirmToken) {
  try {
    const url = "/auth/validate-token";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// Function to update the password using a token
export async function updatePasswordWithToken({ formData, token }: { formData: NewPasswordForm; token: ConfirmToken['token'] }) {
  try {
    const url = `/auth/update-password/${token}`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

// Function to get the authenticated user data
export async function getUser() {
  try {
    const { data } = await api.get("auth/user");
    const response = userSchema.safeParse(data);
    
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
