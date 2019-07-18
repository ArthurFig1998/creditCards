var express = require('express');
var CreditCard = require('../models/creditCard');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');


function getCreditCards(req, res) {
  CreditCard.find().then(creditCards => {
      res.status(200).json({
        message: "Credit Cards fetched successfully!",
        creditCards: creditCards
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
}

router.get("/", (req, res, next) => {
  getCreditCards(req, res);
});


function saveCreditCard(res, creditCard) {
  creditCard.save()
    .then(createdCreditCard => {
      res.status(201).json({
        message: 'Credit Cards added successfully',
        creditCard: createdCreditCard
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
}

router.post('/', (req, res, next) => {
  const maxCreditCardId = sequenceGenerator.nextId('creditCards');


  const creditCard = new CreditCard({
    id: maxCreditCardId,
    name: req.body.name,
    issuer: req.body.issuer,
    description: req.body.description,
    url: req.body.url
  });

  saveCreditCard(res, creditCard);
});



router.put('/:id', function (req, res, next) {
  CreditCard.findOne({
    id: req.params.id
  }, function (err, creditCard) {
    if (err || !creditCard) {
      return res.status(500).json({
        title: 'No Credit Card Found!',
        error: {
          creditCard: 'Credit Card not found!'
        }
      });
    }

    creditCard.name = req.body.name;
    creditCard.issuer = req.body.issuer;
    creditCard.description = req.body.description;
    creditCard.url = req.body.url;

    saveCreditCard(res, creditCard);
  })
});

router.delete("/:id", (req, res, next) => {
  CreditCard.findOne({
      id: req.params.id
    })
    .then(creditCard => {
      CreditCard.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Credit Card deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
