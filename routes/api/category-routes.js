const router = require("express").Router();
const { Category, Product } = require("../../models");

const inputCheck = require("../../utils/inputCheck");

// The `/api/categories` endpoint

// find all categories
router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((dbCatData) => {
      if (!dbCatData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post("/", (req, res) => {
  const errors = inputCheck(req.body, "category_name");
  if (errors) {
    return res.status(400).json({ errors });
  }

  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCatData) => res.json(dbCatData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  const errors = inputCheck(req.body, "category_name");
  if (errors) {
    return res.status(400).json({ errors });
  }

  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCatData) => {
      if (!dbCatData[0]) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbCatData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {});

module.exports = router;
