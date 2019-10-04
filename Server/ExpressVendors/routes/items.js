var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item.js');

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  Item.find(function (err, items) {
    if (err) return next(err);
    res.json(items);
  });
});

/* GET SINGLE ITEM BY ID */
router.get('/:id', function(req, res, next) {
  Item.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ITEM */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Item.create(
	{
	  itemCode:req.body.itemCode,
	  itemName:req.body.itemName,
	  description:req.body.description
	},
		function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(req.body);
  });
});

/* UPDATE ITEM */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Item.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(post);
  });
});

/* DELETE ITEM */
router.delete('/:id', function(req, res, next) {
  Item.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
