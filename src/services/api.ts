@@ .. @@
 import axios from 'axios';
 import { getToken } from '@/utils/auth';
 
 const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
 
 const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
     'Content-Type': 'application/json'
   }
 });
 
 // Add a request interceptor to add auth token
 api.interceptors.request.use(
   config => {
     const token = getToken();
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   },
   error => Promise.reject(error)
 );
 
 // Add a response interceptor
 api.interceptors.response.use(
   response => response,
   error => {
     // Handle errors like 401 Unauthorized
     if (error.response && error.response.status === 401) {
       // Redirect to login or handle token refresh
       window.location.href = '/login';
     }
     return Promise.reject(error);
   }
 );
-// Example: Register user
-export async function registerUser(data: any) {
-  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
-    method: "POST",
-    headers: { "Content-Type": "application/json" },
-    body: JSON.stringify(data),
-  });
-  return response.json();
-}
-
-// Example: Login user
-export async function loginUser(data: any) {
-  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
-    method: "POST",
-    headers: { "Content-Type": "application/json" },
-    body: JSON.stringify(data),
-  });
-  return response.json();
-}
+
+// Authentication API functions
+export const registerUser = async (userData: {
+  name: string;
+  phone: string;
+  password: string;
+  role: 'farmer' | 'trader';
+  locationName?: string;
+  produceTypes?: string[];
+  businessName?: string;
+  businessType?: string;
+  email?: string;
+}) => {
+  try {
+    const response = await api.post('/users/register', userData);
+    return response.data;
+  } catch (error: any) {
+    if (error.response?.data?.message) {
+      throw new Error(error.response.data.message);
+    }
+    throw new Error('Registration failed. Please try again.');
+  }
+};
+
+export const loginUser = async (credentials: {
+  phone?: string;
+  systemId?: string;
+  password: string;
+  role: 'farmer' | 'trader' | 'driver' | 'admin';
+}) => {
+  try {
+    const response = await api.post('/users/login', credentials);
+    return response.data;
+  } catch (error: any) {
+    if (error.response?.data?.message) {
+      throw new Error(error.response.data.message);
+    }
+    throw new Error('Login failed. Please check your credentials.');
+  }
+};
 
 export default api;