import GeneratedContent from "../models/GeneratedContent.js";

export const getHistory = async (req, res) => {

    try {

        const history = await GeneratedContent
            .find({
                user: req.user._id
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            history
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};