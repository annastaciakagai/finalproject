import { motion } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const DriverDashboard = () => {
  // Mock data
  const driverInfo = {
    name: 'John Kamau',
    id: 'DRV-2023-5678',
    vehicleNo: 'KBZ 456Y',
    collectionsToday: 8,
    totalCollections: 243,
    rating: 4.7,
  };
  
  const collectionRoutes = [
    {
      id: 'RT-001',
      time: '08:30 AM',
      location: 'Lari Central',
      farmerName: 'Mary Wangari',
      contactNo: '+254 712 345 678',
      produceType: 'Tea',
      quantity: '120kg',
      status: 'Confirmed',
    },
    {
      id: 'RT-002',
      time: '09:45 AM',
      location: 'Kambaa',
      farmerName: 'Peter Kamau',
      contactNo: '+254 723 456 789',
      produceType: 'Tea',
      quantity: '85kg',
      status: 'Confirmed',
    },
    {
      id: 'RT-003',
      time: '11:15 AM',
      location: 'Githirioni',
      farmerName: 'Jane Njeri',
      contactNo: '+254 734 567 890',
      produceType: 'Coffee',
      quantity: '60kg',
      status: 'Pending',
    },
    {
      id: 'RT-004',
      time: '02:00 PM',
      location: 'Kimende',
      farmerName: 'James Mwangi',
      contactNo: '+254 745 678 901',
      produceType: 'Tea',
      quantity: '105kg',
      status: 'Pending',
    },
  ];
  
  const notifications = [
    {
      id: 1,
      type: 'sms',
      message: 'Mary Wangari has confirmed pickup for 120kg of tea.',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 2,
      type: 'whatsapp',
      message: 'Peter Kamau: "Please arrive before 10:00 AM as I have to leave early today."',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 3,
      type: 'system',
      message: 'New collection point added to your route: Githirioni, 11:15 AM',
      time: '5 hours ago',
      read: true,
    },
  ];
  
  return (
    <DashboardLayout title="Driver Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Driver Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="col-span-1"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Driver Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm font-medium text-gray-500">Name:</div>
                <div className="text-sm">{driverInfo.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm font-medium text-gray-500">Driver ID:</div>
                <div className="text-sm">{driverInfo.id}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm font-medium text-gray-500">Vehicle No:</div>
                <div className="text-sm">{driverInfo.vehicleNo}</div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm font-medium text-gray-500">Rating:</div>
                <div className="text-sm flex items-center">
                  {driverInfo.rating}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Today's Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="col-span-1"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Today's Collections</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-4xl font-bold text-center text-vunahub-600">
                {driverInfo.collectionsToday}
                <span className="text-base text-gray-500 font-normal ml-2">scheduled</span>
              </div>
              <div className="grid grid-cols-2 mt-6 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase">Completed</p>
                  <p className="text-2xl font-semibold text-green-600">2</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase">Remaining</p>
                  <p className="text-2xl font-semibold text-vunahub-600">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* All-Time Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="col-span-1"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">All-Time Performance</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-4xl font-bold text-center text-vunahub-600">
                {driverInfo.totalCollections}
                <span className="text-base text-gray-500 font-normal ml-2">collections</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 my-5">
                <div className="bg-vunahub-600 h-2.5 rounded-full w-4/5"></div>
              </div>
              <p className="text-xs text-center text-gray-500">
                80% on-time delivery rate
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Today's Route */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-8"
      >
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Today's Collection Route</CardTitle>
              <Button variant="outline" className="text-vunahub-600 border-vunahub-600 hover:bg-vunahub-50">
                View Map
              </Button>
            </div>
            <CardDescription>
              Wednesday, 15 July 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2 font-medium">Time</th>
                    <th className="pb-2 font-medium">Location</th>
                    <th className="pb-2 font-medium">Farmer</th>
                    <th className="pb-2 font-medium">Produce</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {collectionRoutes.map((route, index) => (
                    <tr key={route.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                      <td className="py-3">{route.time}</td>
                      <td className="py-3">{route.location}</td>
                      <td className="py-3">
                        <div>{route.farmerName}</div>
                        <div className="text-xs text-gray-500">{route.contactNo}</div>
                      </td>
                      <td className="py-3">
                        <div>{route.produceType}</div>
                        <div className="text-xs text-gray-500">{route.quantity}</div>
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          route.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {route.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <Button size="sm" className="h-8 bg-vunahub-600 hover:bg-vunahub-700 text-white">
                          {index < 2 ? 'Collect' : 'Details'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Notifications</CardTitle>
              <Button variant="link" className="text-vunahub-600">
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-vunahub-50 border-vunahub-100'}`}
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 rounded-full p-2 ${
                      notification.type === 'sms' 
                        ? 'bg-blue-100 text-blue-600' 
                        : notification.type === 'whatsapp' 
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {notification.type === 'sms' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      )}
                      {notification.type === 'whatsapp' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )}
                      {notification.type === 'system' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-vunahub-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-0">
            <Button variant="ghost" className="text-vunahub-600">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default DriverDashboard;