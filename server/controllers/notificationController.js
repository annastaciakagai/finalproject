const { sendSMS }= require('../utils/twilio.js');

const notify = async (req, res)=>{
    const {to, message } = req.body;
    const msg = await sendSMS(to, message );
    res.json(msg);
};