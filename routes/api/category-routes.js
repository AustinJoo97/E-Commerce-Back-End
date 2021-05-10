const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    let categoriesAndAssociatedProducts = [];
    // let allCategories = await Category.findAll();
    let allCategories = await Category.findAll()

    await allCategories.forEach(async (category) => {
      let fullSet = {};
      fullSet.category = category.dataValues;
      fullSet.products = [];

      let allProducts = await Product.findAll({
        where: {
          category_id: category.id
        }
      });
      allProducts.forEach((product) => {
        fullSet.products.push(product.dataValues);
      })

      categoriesAndAssociatedProducts.push(fullSet);

      console.log(fullSet);
    })
    
    // console.log(categoriesAndAssociatedProducts);
    res.json(categoriesAndAssociatedProducts);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
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

router.post('/', (req, res) => {
  // create a new category
  try{}
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
