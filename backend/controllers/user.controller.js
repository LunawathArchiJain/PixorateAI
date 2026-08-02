import User from "../models/User.js";

/*
    @desc    Get Logged In User Profile
    @route   GET /api/user/profile
    @access  Private
*/

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


/*
    @desc    Update User Profile
    @route   PUT /api/user/profile
    @access  Private
*/

export const updateProfile = async (req, res) => {

    try {

        const { name, avatar } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (name) {
            user.name = name;
        }

        if (avatar) {
            user.avatar = avatar;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};