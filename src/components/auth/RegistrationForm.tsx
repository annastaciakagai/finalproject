@@ .. @@
 import { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { motion } from 'framer-motion';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
+import { registerUser } from '@/services/api';
 
 interface RegistrationFormProps {
   userType: 'farmer' | 'trader';
 }
 
 const RegistrationForm = ({ userType }: RegistrationFormProps) => {
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
     businessName: '',
     email: '',
     phone: '',
     idNumber: '',
     location: '',
     cropType: '',
     businessType: '',
     password: '',
     confirmPassword: '',
   });
   const [error, setError] = useState<string | null>(null);
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setFormData(prev => ({
       ...prev,
       [name]: value
     }));
     setError(null);
   };
 
   const handleSelectChange = (name: string, value: string) => {
     setFormData(prev => ({
       ...prev,
       [name]: value
     }));
     setError(null);
   };
 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setIsLoading(true);
     setError(null);
 
     try {
       // Basic validation
       if (formData.password !== formData.confirmPassword) {
         throw new Error('Passwords do not match');
       }
 
       if (formData.password.length < 6) {
         throw new Error('Password must be at least 6 characters long');
       }
 
-      // In a real app, this would be an API call
-      await new Promise(resolve => setTimeout(resolve, 1500));
-      
-      // Mock success
+      // Prepare registration data based on user type
+      const registrationData = {
+        name: formData.name,
+        phone: formData.phone,
+        password: formData.password,
+        role: userType,
+        ...(userType === 'farmer' && {
+          locationName: formData.location,
+          produceTypes: formData.cropType ? [formData.cropType] : []
+        }),
+        ...(userType === 'trader' && {
+          businessName: formData.businessName,
+          email: formData.email,
+          businessType: formData.businessType,
+          locationName: formData.location
+        })
+      };
+
+      // Call the registration API
+      await registerUser(registrationData);
+      
+      // Navigate to success page
       navigate('/registration-success', { 
         state: { userType } 
       });
     } catch (err: any) {
       setError(err.message || 'An error occurred during registration');
     } finally {
       setIsLoading(false);
     }
   };
 
   return (
     <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
     >
       <form onSubmit={handleSubmit} className="space-y-6">
         {error && (
           <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
             {error}
           </div>
         )}
 
         {/* Common Fields */}
         <div className="space-y-2">
           <Label htmlFor="name">Full Name</Label>
           <Input
             id="name"
             name="name"
             placeholder="Enter your full name"
             required
             value={formData.name}
             onChange={handleChange}
             className="vunahub-input"
           />
         </div>
 
+        <div className="space-y-2">
+          <Label htmlFor="phone">Phone Number</Label>
+          <Input
+            id="phone"
+            name="phone"
+            placeholder="e.g. +254700123456"
+            required
+            value={formData.phone}
+            onChange={handleChange}
+            className="vunahub-input"
+          />
+        </div>
+
         {/* Farmer-specific Fields */}
         {userType === 'farmer' && (
           <>
-            <div className="space-y-2">
-              <Label htmlFor="idNumber">ID/Passport Number</Label>
-              <Input
-                id="idNumber"
-                name="idNumber"
-                placeholder="Enter your ID or passport number"
-                required
-                value={formData.idNumber}
-                onChange={handleChange}
-                className="vunahub-input"
-              />
-            </div>
-            
             <div className="space-y-2">
               <Label htmlFor="location">Location</Label>
               <Input
                 id="location"
                 name="location"
                 placeholder="Enter your farm location"
                 required
                 value={formData.location}
                 onChange={handleChange}
                 className="vunahub-input"
               />
             </div>
             
             <div className="space-y-2">
               <Label htmlFor="cropType">Crop Type</Label>
               <Select 
                 name="cropType"
                 onValueChange={(value) => handleSelectChange('cropType', value)}
                 defaultValue={formData.cropType}
               >
                 <SelectTrigger className="vunahub-input">
                   <SelectValue placeholder="Select crop type" />
                 </SelectTrigger>
                 <SelectContent>
-                  <SelectItem value="tea">Tea</SelectItem>
-                  <SelectItem value="coffee">Coffee</SelectItem>
+                  <SelectItem value="avocado">Avocado</SelectItem>
                   <SelectItem value="maize">Maize</SelectItem>
-                  <SelectItem value="vegetables">Vegetables</SelectItem>
-                  <SelectItem value="fruits">Fruits</SelectItem>
-                  <SelectItem value="other">Other</SelectItem>
+                  <SelectItem value="banana">Banana</SelectItem>
+                  <SelectItem value="kales">Kales</SelectItem>
+                  <SelectItem value="spinach">Spinach</SelectItem>
+                  <SelectItem value="carrots">Carrots</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </>
         )}
 
         {/* Trader-specific Fields */}
         {userType === 'trader' && (
           <>
             <div className="space-y-2">
               <Label htmlFor="businessName">Business Name</Label>
               <Input
                 id="businessName"
                 name="businessName"
                 placeholder="Enter your business name"
                 required
                 value={formData.businessName}
                 onChange={handleChange}
                 className="vunahub-input"
               />
             </div>
             
             <div className="space-y-2">
               <Label htmlFor="email">Email Address</Label>
               <Input
                 id="email"
                 name="email"
                 type="email"
                 placeholder="Enter your email address"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 className="vunahub-input"
               />
             </div>
+
+            <div className="space-y-2">
+              <Label htmlFor="location">Business Location</Label>
+              <Input
+                id="location"
+                name="location"
+                placeholder="Enter your business location"
+                required
+                value={formData.location}
+                onChange={handleChange}
+                className="vunahub-input"
+              />
+            </div>
             
             <div className="space-y-2">
               <Label htmlFor="businessType">Business Type</Label>
               <Select 
                 name="businessType"
                 onValueChange={(value) => handleSelectChange('businessType', value)}
                 defaultValue={formData.businessType}
               >
                 <SelectTrigger className="vunahub-input">
                   <SelectValue placeholder="Select business type" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="retailer">Retailer</SelectItem>
                   <SelectItem value="wholesaler">Wholesaler</SelectItem>
                   <SelectItem value="exporter">Exporter</SelectItem>
                   <SelectItem value="processor">Processor</SelectItem>
                   <SelectItem value="other">Other</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </>
         )}
 
-        {/* Common Fields */}
-        <div className="space-y-2">
-          <Label htmlFor="phone">Phone Number</Label>
-          <Input
-            id="phone"
-            name="phone"
-            placeholder="e.g. +254700123456"
-            required
-            value={formData.phone}
-            onChange={handleChange}
-            className="vunahub-input"
-          />
-        </div>
-        
         <div className="space-y-2">
           <Label htmlFor="password">Password</Label>
           <Input
             id="password"
             name="password"
             type="password"
             placeholder="Create a secure password"
             required
             value={formData.password}
             onChange={handleChange}
             className="vunahub-input"
           />
         </div>
         
         <div className="space-y-2">
           <Label htmlFor="confirmPassword">Confirm Password</Label>
           <Input
             id="confirmPassword"
             name="confirmPassword"
             type="password"
             placeholder="Confirm your password"
             required
             value={formData.confirmPassword}
             onChange={handleChange}
             className="vunahub-input"
           />
         </div>
 
         <div className="pt-2">
           <Button
             type="submit"
             className="w-full bg-vunahub-600 hover:bg-vunahub-700 text-white rounded-full py-6"
             disabled={isLoading}
           >
             {isLoading ? 'Creating Account...' : 'Create Account'}
           </Button>
         </div>
       </form>
     </motion.div>
   );
 };
 
 export default RegistrationForm;