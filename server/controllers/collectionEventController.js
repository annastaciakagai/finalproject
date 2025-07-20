const CollectionEvent = require('../models/CollectionEvent');
const Produce         = require('../models/Produce');
const CollectionPoint = require('../models/CollectionPoint');
const Transaction     = require('../models/Transaction');
const { sendSMS } = require('../utils/twilioClient');
const { getOptimizedRoute } = require('../utils/routeOptimizer');
const User = require('../models/User');


const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// 1. Driver schedules a collection (status = 'scheduled')
exports.scheduleCollection = asyncHandler(async (req, res) => {
  if (req.user.role !== 'driver') {
    return res.status(403).json({ message: 'Only drivers can schedule collections' });
  }
  const { produce, collectionPoint } = req.body;
// Get coordinates
  const cp = await CollectionPoint.findById(collectionPoint); // has lat/lng
  const driver = await User.findById(req.user.id); // must include driver.currentLocation or default

  const driverLocation = driver.location?.coordinates || [36.8167, -1.2833]; // fallback: Nairobi
  const cpLocation = cp.coordinates; // Assuming it's an array [lng, lat]

  // Call route optimizer
  let routeData = null;
  try {
    routeData = await getOptimizedRoute([driverLocation, cpLocation]);
  } catch (err) {
    console.error('Route optimization failed:', err.message);
  }
    const event = await CollectionEvent.create({
    produce,
    driver: req.user.id,
    collectionPoint,
    status: 'scheduled',
    routeDetails: routeData || null
  });

  // Send SMS to driver
  if (driver?.phone) {
    await sendSMS(driver.phone, `VunaHub: You’ve scheduled a collection. Optimized route loaded.`);
  }

  // Send SMS to farmer
  const produceDoc = await Produce.findById(produce).populate('user');
  const farmer = produceDoc.user;
  if (farmer?.phone) {
    await sendSMS(farmer.phone, `VunaHub: A driver is scheduled to pick your produce soon.`);
  }
  res.status(201).json(event);
});

// 2. Driver updates status and propagate to Produce and possibly create Transaction
exports.updateCollectionStatus = asyncHandler(async (req, res) => {
  const { status, paymentMethod, paymentCode } = req.body;
  const event = await CollectionEvent.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'CollectionEvent not found' });
  if (event.driver.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // Update event status
  event.status = status;
  if (status === 'collected') {
    const cp = await CollectionPoint.findById(event.collectionPoint);
    event.routeDetails = `Pickup at ${cp.locationName}`;
  }
  await event.save();

  // Update Produce status
  await Produce.findByIdAndUpdate(event.produce, { status });

  // If sold, create a Transaction record
  if (status === 'sold') {
    const produce = await Produce.findById(event.produce).lean();
    const transaction = await Transaction.create({
      produce: event.produce,
      driver: event.driver,
      seller: produce.user,
      buyer: req.user.id,    // driver marks as sold to trader expressing interest
      paymentMethod,
      paymentCode,
      amount: produce.quantity.amount * (produce.pricePerUnit || 0)
    });
    return res.json({ event, transaction });
  }

  res.json(event);
});

// 3. Get collection events (for driver or admin)
exports.getMyCollections = asyncHandler(async (req, res) => {
  const filter = req.user.role === 'admin'
    ? {}
    : { driver: req.user.id };
  const events = await CollectionEvent.find(filter)
    .populate('produce')
    .populate('collectionPoint')
    .populate('driver', 'name phone')
    .lean();
  res.json(events);
});

// 4. (Optional) Cancel an event
exports.cancelCollection = asyncHandler(async (req, res) => {
  const event = await CollectionEvent.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Not found' });
  if (event.driver.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await event.remove();
  await Produce.findByIdAndUpdate(event.produce, { status: 'available' });
  res.json({ message: 'Collection canceled' });
});