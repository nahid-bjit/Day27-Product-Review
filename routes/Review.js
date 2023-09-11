const express = require("express");
const ReviewController = require("../controller/ReviewController");
const routes = express.Router(); // Use express.Router() to create a router instance

routes.get("/:productId", ReviewController.reviewById);
routes.post("/create/:productId", ReviewController.createReview);

module.exports = routes;
