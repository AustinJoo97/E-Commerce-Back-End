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
      res.status(404).json({message: 'No results for this tag!'})
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
      res.status(404).json({message: 'No results for this tag!'})
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
      res.status(404).json({message: 'Error! Try again later!'})
    }
    res.status(200).json(tags);
  }
  catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!updatedTag){
      res.status(404).json({message: 'No tag with this ID exists!'})
    }
    res.status(200).json(updatedTag)
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
