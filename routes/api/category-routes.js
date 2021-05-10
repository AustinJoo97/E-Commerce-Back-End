const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    let categoriesAndAssociatedProducts = [];
    // let allCategories = await Category.findAll();
    let allCategories = await Category.findAll();
    let singleSet = {
      category: undefined,
      products: []
    };

    await allCategories.forEach(async (category) => {
      singleSet.category = category.dataValues;

      let allProducts = await Product.findAll({
        where: {
          category_id: category.id
        }
      });
      allProducts.forEach((product) => {
        singleSet.products.push(product.dataValues);
      })

      categoriesAndAssociatedProducts.push(singleSet);
    })
    
    console.log(categoriesAndAssociatedProducts);
    res.json(categoriesAndAssociatedProducts);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    let fullSet = {
      category: undefined,
      associatedProducts: []
    };

    let category = await Category.findAll({
      where: {
        id: req.params.id
      }
    })
    fullSet.category = category[0].dataValues

    let associatedProducts = await Product.findAll({
      where: {
        category_id: req.params.id
      }
    })
    associatedProducts.forEach((product) => {
      fullSet.associatedProducts.push(product.dataValues);
    })

    res.json(fullSet);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{}
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{}
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
