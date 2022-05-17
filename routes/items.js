const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../models/items");

//INDEX - Show all Items
router.get("/", (req, res) => {
  // Get all items from DB
  Item.find({}, (err, allItems) => {
    if (err) {
      res.status(500).redirect("back");
    } else {
      res.status(200).render("items/index", { items: allItems });
    }
  });
});

// NEW - Show form to create new item
router.get("/new", (req, res) => {
  res.status(200).render("items/new");
});

// CREATE - Create new item
router.post("/", (req, res) => {
  // get data from form and add to items array
  const { itemName, quantity, price } = req.body;

  const newItem = new Item({
    itemName,
    quantity,
    price,
  });

  //  Create a new item and save to DB
  Item.create(newItem, (err, newlyCreated) => {
    if (err) {
      res.status(500).redirect("back");
    } else {
      // redirect back to item page
      res.status(201).redirect("/items");
    }
  });
});

// SHOW - Show more info about an item
router.get("/:id", (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    if (err) {
      res.status(500).redirect("back");
    } else {
      res.status(200).render("items/show", { item: foundItem });
    }
  });
});

// EDIT ITEM ROUTE
router.get("/:id/edit", (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    if (err) {
      res.status(500).redirect("back");
    } else {
      res.status(200).render("items/edit", { item: foundItem });
    }
  });
});

// UPDATE ITEM ROUTE
router.put("/:id", (req, res) => {
  let item = Item.findById(req.params.id);

  item = Item.findOneAndUpdate(req.params.id, req.body, (err, updatedItem) => {
    if (err) {
      res.status(500).redirect("/items");
    } else {
      res.status(200).redirect("/items/" + req.params.id);
    }
  });
});

// DESTROY ITEM ROUTE
router.delete("/:id", (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).redirect("/items");
    } else {
      res.status(200).redirect("/items");
    }
  });
});

module.exports = router;
