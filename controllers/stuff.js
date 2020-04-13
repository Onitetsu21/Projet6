const Thing = require("../models/Things");
const fs = require("fs");

// créer une sauce
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => {
          console.log(error)
          return res.status(400).json({ error })
      });
  };

// modifier une sauce
exports.modifyThing = (req, res, next) => {
  
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

// supprimer une sauce
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
    
  };

// retrouver une sauce par son ID
exports.getOneThing = function(req, res, next){
    Thing.findOne({ _id: req.params.id })
    .then(things => { 
        
        return res.status(200).json(things)
    })
    .catch(error => res.status(400).json({ error }));
    
};

// retrouver le tableau de sauces
exports.getThing = function(req, res, next){
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
    
};

exports.likeThing = function(req, res) {
    Thing.updateOne()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

exports.dislikeThing = function(req, res) {
    Thing.updateOne()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};