const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../models/items");

router.get("/", (req, res) => {
  // Get all items from DB
  Item.find({}, (err, allItems) => {
    if (err) {
      res.status(500).redirect("back");
    } else {
      res.status(200).render("home", { items: allItems });
    }
  });
});

module.exports = router;
