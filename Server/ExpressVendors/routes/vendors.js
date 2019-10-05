var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Vendor = require('../models/Vendor.js');

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  Vendor.find(function (err, vendors) {
    if (err) return next(err);
    res.json(vendors);
  });
});

/* GET SINGLE VENDOR BY ID */
router.get('/:id', function(req, res, next) {
  Vendor.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE VENDOR BY CODE */
//http://localhost:3001/api/v1/vendors/vendorCode/DZGDG
router.get('/vendorCode/:id', function(req, res, next) {
	Vendor.findOne({vendorCode: new RegExp('^'+req.params.id+'$', "i")}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE VENDOR */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Vendor.create(
	{
		vendorCode: req.body.vendorCode,
		vendorName: req.body.vendorName,
		vendorEmail: req.body.vendorEmail,
		vendorPaymentID: req.body.vendorPaymentID,
		vendorContactPerson: req.body.vendorContactPerson,
		vendorDescription: req.body.vendorDescription,
		vendorAddress: req.body.vendorAddress,
		vendorCountry: req.body.vendorCountry,
		vendorContactNumber: req.body.vendorContactNumber,
		vendorTagline: req.body.vendorTagline,
		vendorImage: req.body.vendorImage
	
	},
		function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(req.body);
  });
});

/* UPDATE VENDOR */
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Vendor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(post);
  });
});

/* DELETE VENDOR */
router.delete('/:id', function(req, res, next) {
  Vendor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
