@@ .. @@
 // Redirect based on user role
 export const redirectToRoleDashboard = (role: UserRole): string => {
   switch(role) {
     case 'farmer':
-      return '/farmer-dashboard';
+      return '/dashboard/farmer';
     case 'trader':
-      return '/trader-dashboard';
+      return '/dashboard/trader';
     case 'driver':
-      return '/driver-dashboard';
+      return '/dashboard/driver';
     case 'admin':
-      return '/admin-dashboard';
+      return '/dashboard/admin';
     default:
       return '/';
   }
 };