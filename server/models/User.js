const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    farmerId:{type:String, sparse: true, unique:true},
    password:{type:String, required:true, select:false},
    phone:{type:String, required: true, unique: true},

    role: {
        type:String,
        enum: ['farmer', 'trader', 'admin', 'driver'],
        default: 'farmer',
    },

    //auto-generated for drivers and traders
    systemId: {
        type: String,
        unique: true,
        sparse: true, //the uniqueness cnstraint applies where this field(systemId) is present
    },

    //location for farmers
    locationName: {
        type:String,
        required: function () {
            return this.role === 'farmer';
        }
    },

    //Geo-location
    location: {
        type: {type: String, enum: ['Point'], default: 'Point'},
        coordinates:{
            type: [Number],
            default: undefined
        }
    },
    produceTypes: {
        type: [String],
        enum: ['avocado', 'maize','banana', 'kales', 'spinach', 'carrots'], // etc.
        required: function () {
            return this.role === 'farmer';
        }
    },

}, {timestamps: true});

//coordinates in [longitude, latitude]
UserSchema.index({ location: '2dsphere'});
UserSchema.index({role:1});


//Auto-generated code for traders and drivers
UserSchema.pre('save', function (next) {
    if((this.role === 'admin' || this.role === 'driver')) {
        if(!this.systemId) {
            this.systemId = `VH-${this.role.slice(0, 2).toUpperCase()}-${uuidv4().split('-')[0].toUpperCase()}`;
        }
    } else {
        this.systemId = undefined;
    }
    next();
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);