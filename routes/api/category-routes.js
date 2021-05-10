const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    let categoriesAndAssociatedProducts = [];
    let allCategories = await Category.findAll();
    
    for(let i = 0; i < allCategories.length; i++){
      let singleSet = {
        category: allCategories[i].dataValues,
        associatedProducts: []
      };

      let allProducts = await Product.findAll({
        where: {
          category_id: allCategories[i].id
        }
      });
      allProducts.forEach((product) => {
        singleSet.associatedProducts.push(product.dataValues);
      })

      categoriesAndAssociatedProducts.push(singleSet);

      if(i === allCategories.length-1){
        res.json(categoriesAndAssociatedProducts);
      }
    }
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

    const category = await Category.findByPk(req.params.id)
    if(!category){
      res.status(404).json({message: 'This category does not exist!'});
      return;
    }

    console.log(category);
    fullSet.category = category.dataValues

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
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if(!updatedCategory){
      res.status(404).json({message: 'No category with this ID exists!'});
      return;
    } 
    res.status(200).json(updatedCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    let deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!deletedCategory){
      res.status(404).json({message: 'This category does not exist!'});
      return;
    }
    res.status(200).json(deletedCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
