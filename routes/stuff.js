const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const stuffCtrl = require("../controllers/stuff");

const multer = require("../middleware/multer-config");

// renvoie le tableau de toutes les sauces dans la BD
router.get("/", auth, stuffCtrl.getThing);

// renvoie la sauce avec l'ID fourni
router.get("/:id", auth, stuffCtrl.getOneThing);

// capture et enregistre l'img + string dans la BD avec le bon URL, 
// remet les sauces aimées et celles detestées à 0 et dans le tableau
router.post("/", auth, multer, stuffCtrl.createThing);

// MAJ de la sauce avec :ID, si image DL => mettre à jour, sinon détails de la sauce dans le body
router.put("/:id", auth, multer, stuffCtrl.modifyThing);

// supprime la sauce avec l'ID
router.delete("/:id", auth, stuffCtrl.deleteThing);

// ++ en cas de j'aime (=1, annule =0, aime pas = -1), 
// l'utilisateur doit être ajouté ou supprimé du tableau approprié
// en gardant une trace de ses préférences et en l'empêchantd'aimer ou pas la même sauce plusieurs fois
// nombre total de "jaime" et "j'aime pas" à mettre à jour à chaque "jaime" 
router.post("/:id/like", auth, stuffCtrl.likeThing);

module.exports = router;