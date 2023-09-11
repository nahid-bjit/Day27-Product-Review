const Review = require('../model/Review');

class ReviewController {
    static async createReview(req, res) {
        try {
            const { rating, text } = req.body;
            const productId = req.params.productId;

            // Validate the rating
            if (typeof rating !== 'number' || rating < 1 || rating > 5) {
                return res.status(400).json({ error: 'Invalid rating' });
            }

            // Validate the text
            if (typeof text !== 'string' || text.trim() === '' || text.length > 1000) {
                return res.status(400).json({ error: 'Invalid text' });
            }

            // Create a new review using the Review model
            const review = new Review({ productId, rating, text });
            await review.save();
            res.status(201).json({ message: 'Review created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async reviewById(req, res) {
        const productId = req.params.productId;

        try {
            const reviews = await Review.find({ productId });
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = ReviewController;


// const Review = require('../model/Review');

// class ReviewController {
//     static async createReview(req, res) {
//         const { rating, text } = req.body;
//         const productId = req.params.productId;

//         try {
//             const review = new Review({ productId, rating, text });
//             await review.save();
//             res.status(201).json({ message: 'Review created successfully' });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }

//     static async reviewById(req, res) {
//         const productId = req.params.productId;

//         try {
//             const reviews = await Review.find({ productId });
//             res.status(200).json(reviews);
//         } catch (error) {
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     }
// }

// module.exports = ReviewController;
