@@ .. @@
           {/* Protected Dashboard Routes */}
           <Route 
-            path="/driver-dashboard/*" 
+            path="/dashboard/driver/*" 
             element={
               <ProtectedRoute allowedRoles={['driver']}>
                 <DriverDashboardPage />
               </ProtectedRoute>
             }
           />
           
           <Route 
-            path="/admin-dashboard/*" 
+            path="/dashboard/admin/*" 
             element={
               <ProtectedRoute allowedRoles={['admin']}>
                 <AdminDashboardPage />
               </ProtectedRoute>
             }
           />
+
+          <Route 
+            path="/dashboard/farmer/*" 
+            element={
+              <ProtectedRoute allowedRoles={['farmer']}>
+                <div className="min-h-screen flex items-center justify-center">
+                  <div className="text-center">
+                    <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
+                    <p>Coming soon...</p>
+                  </div>
+                </div>
+              </ProtectedRoute>
+            }
+          />
+
+          <Route 
+            path="/dashboard/trader/*" 
+            element={
+              <ProtectedRoute allowedRoles={['trader']}>
+                <div className="min-h-screen flex items-center justify-center">
+                  <div className="text-center">
+                    <h1 className="text-2xl font-bold mb-4">Trader Dashboard</h1>
+                    <p>Coming soon...</p>
+                  </div>
+                </div>
+              </ProtectedRoute>
+            }
+          />
           
           {/* 404 Page */}
           <Route path="*" element={<NotFound />} />