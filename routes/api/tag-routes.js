const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
  
    if(!tags){
      res.status(404).json({message: 'No results for this tag!'});
      return;
    }
    res.status(200).json(tags);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tags = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag
      }]
    })
  
    if(!tags){
      res.status(404).json({message: 'No results for this tag!'});
      return;
    }
    res.status(200).json(tags);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const tags = await Tag.create(req.body);
    if(!tags){
      res.status(404).json({message: 'Error! Try again later!'});
      return;
    }
    res.status(200).json(tags);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!updatedTag){
      res.status(404).json({message: 'No tag with this ID exists!'});
      return;
    }
    res.status(200).json(updatedTag)
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!deleteTag){
      res.status(404).json({message: 'No tag with the searched ID exists!'});
      return;
    }
    res.status(200).json(deleteTag);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
