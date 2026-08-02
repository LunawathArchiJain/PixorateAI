/*
    @desc    Upload Image
    @route   POST /api/upload
    @access  Private
*/

export const uploadImage = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            });

        }

        res.status(200).json({

            success: true,

            message: "Image uploaded successfully",

            image: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                path: req.file.path,
            },

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};