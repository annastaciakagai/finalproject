import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  // Mock data
  const stats = {
    farmersOnboarded: 5243,
    activeTraders: 387,
    activeDrivers: 128,
    produceCollected: 8624, // in tons
    ordersProcessed: 15683,
    revenue: 84523000, // in KES
  };
  
  const recentUsers = [
    { id: 1, name: 'Grace Muthoni', role: 'Farmer', location: 'Lari', date: '2 hours ago', status: 'active' },
    { id: 2, name: 'Joseph Karanja', role: 'Trader', location: 'Nairobi', date: '5 hours ago', status: 'active' },
    { id: 3, name: 'Daniel Kimani', role: 'Driver', location: 'Kiambu', date: '1 day ago', status: 'pending' },
    { id: 4, name: 'Lucy Wambui', role: 'Farmer', location: 'Githirioni', date: '1 day ago', status: 'active' },
  ];
  
  const recentOrders = [
    { id: 'ORD-1234', farmer: 'John Njoroge', trader: 'Nairobi Greens Ltd', produce: 'Tea', quantity: '450kg', date: '2023-07-15', status: 'delivered' },
    { id: 'ORD-1235', farmer: 'Mary Wangari', trader: 'Kenya Foods', produce: 'Tea', quantity: '280kg', date: '2023-07-15', status: 'in transit' },
    { id: 'ORD-1236', farmer: 'Peter Kamau', trader: 'Fresh Market', produce: 'Coffee', quantity: '175kg', date: '2023-07-14', status: 'collected' },
    { id: 'ORD-1237', farmer: 'Jane Njeri', trader: 'Organic Traders', produce: 'Tea', quantity: '320kg', date: '2023-07-14', status: 'confirmed' },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Farmers Onboarded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.farmersOnboarded.toLocaleString()}</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                12% increase
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Traders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.activeTraders.toLocaleString()}</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                8% increase
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Active Drivers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.activeDrivers.toLocaleString()}</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                5% increase
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Produce Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.produceCollected.toLocaleString()} tons</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                18% increase
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Orders Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">{stats.ordersProcessed.toLocaleString()}</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                15% increase
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-vunahub-600">KES {(stats.revenue / 1000000).toFixed(2)}M</div>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                22% increase
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Users</CardTitle>
                <Button variant="ghost" className="text-vunahub-600">
                  View All
                </Button>
              </div>
              <CardDescription>
                New users who recently joined the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-vunahub-100 rounded-full flex items-center justify-center text-vunahub-600 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="mr-2">{user.role}</span> • 
                          <span className="mx-2">{user.location}</span> • 
                          <span className="ml-2">{user.date}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" className="text-vunahub-600">
                  View All
                </Button>
              </div>
              <CardDescription>
                Latest orders in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500 border-b">
                      <th className="pb-2 font-medium">Order ID</th>
                      <th className="pb-2 font-medium">Produce</th>
                      <th className="pb-2 font-medium">Quantity</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={order.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        <td className="py-3">
                          <div>{order.id}</div>
                          <div className="text-xs text-gray-500">{order.date}</div>
                        </td>
                        <td className="py-3">
                          <div>{order.produce}</div>
                          <div className="text-xs text-gray-500">
                            {order.farmer} → {order.trader}
                          </div>
                        </td>
                        <td className="py-3">{order.quantity}</td>
                        <td className="py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'in transit' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'collected' ? 'bg-purple-100 text-purple-800' : ''}
                            ${order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' : ''}
                          `}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Map View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Collection Routes Map</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-vunahub-600 border-vunahub-600 hover:bg-vunahub-50">
                  Today
                </Button>
                <Button variant="ghost" size="sm">
                  This Week
                </Button>
                <Button variant="ghost" size="sm">
                  This Month
                </Button>
              </div>
            </div>
            <CardDescription>
              Overview of active collection routes across regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-80 w-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-lg font-medium">Interactive Map</p>
                <p>Map integration would be displayed here showing collection routes and status</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-500">Active Routes</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-500">Pending</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-500">Completed</span>
              </div>
            </div>
            <Button variant="link" className="text-vunahub-600">
              View Detailed Report
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default AdminDashboard;