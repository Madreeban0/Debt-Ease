const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getProfile = async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err){
        res.status(500).json({message: 'Error fetching profile information', error: err.message})
    }
};

exports.updateProfile = async(req,res) => {
    try{
        const {name,email} = req.body;
        const update = {};
        if(name) update.name = name;
        if(email) update.email = email;
        const user = await User.findByIdAndUpdate(req.user.id, update, {new:true}).select('-password');
        res.status(201).json({message: "Profile Updated", user});
    } catch(err){
        res.status(500).json({message:"Error while updating", error:err.meassage});
    }
};

exports.changePassword = async(req,res) => {
    try{
        const {currentPassword, newPassword} = req.body;
        if(!currentPassword || !newPassword){
            res.status(400).json({message: "Current and New password is required"});
        }

        const user = await User.findById(req.user.id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch){
            res.status(400).json({message: "Current password is incorrect"});
        }

        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
        res.status(201).json({message: "Password changed successfully"});
    } catch(err){
        res.status(500).json({message: "Error while changing password", error:err.message});
    }
};