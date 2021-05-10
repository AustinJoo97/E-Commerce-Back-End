const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const allCategories = await Category.findAll({
      include: [{
        model: Product
      }]
    });
    
    if(!allCategories){
      res.status(404).json({message: 'No categories exist!'})
    }
    res.status(200).json(allCategories);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    })

    if(!category){
      res.status(404).json({message: 'This category does not exist!'});
      return;
    }
    res.status(200).json(category);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create(req.body);
    if(!newCategory){
      res.status(404).json({message: 'Error! Try again later!'})
    }
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
