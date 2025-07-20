const CollectionPoint = require('../models/CollectionPoint');
const asyncHandler = require('../middleware/asyncHandler');

exports.createCP =asyncHandler(async(req, res)=>{
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Request Denied! Not Admin'});
    }

    const { name, locationName, location } = req.body;
    const cp = await CollectionPoint.create({
        name,
        locationName,
        location
    });
    res.status(201).json(cp);
});

exports.updateCP = asyncHandler(async(req, res) =>{
    const cp = await CollectionPoint.findById(req.params.id);
    if(!cp) {
        return res.status(404).json({ messge: "CollectionPoint not found"})
    }
    await cp.save()
    res.json(cp);
});
exports.deleteCP = asyncHandler(async (req, res) => {
  const cp = await CollectionPoint.findById(req.params.id);
  if (!cp) return res.status(404).json({ message: 'CollectionPoint not found' });
  await cp.remove();
  res.json({ message: 'CollectionPoint deleted'});
});

exports.listAllCP = asyncHandler(async (req, res) => {
  const cps = await CollectionPoint.find().populate('admin', 'name phone').lean();
  res.json(cps);
});

// List nearby CPs given ?lng=&lat=&maxDistance= in meters
exports.listNearbyCP = asyncHandler(async (req, res) => {
  const { lng, lat, maxDistance = 5000 } = req.query;
  if (!lng || !lat) {
    return res.status(400).json({ message: 'Provide lng and lat query params' });
  }

  const cps = await CollectionPoint.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
        $maxDistance: parseInt(maxDistance, 10)
      }
    }
  })
  .populate('admin', 'name phone')
  .lean();

  res.json(cps);
});