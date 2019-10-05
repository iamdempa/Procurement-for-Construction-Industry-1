const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//mongoose
const mongoose = require("mongoose");

//port
const PORT = 4005;

//middle wares
app.use(cors());
app.use(bodyParser.json());

//routes
const Routes = express.Router();

//DB modals
let invoicesDB = require("./models/CreateInvoices");


app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});

mongoose.connect(
  "mongodb+srv://asiri:asiri123@cluster0-lok9v.mongodb.net/procurementDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useFindAndModify: false }
);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo Db is running");
});


 

//end-point-1 -GET ALL
Routes.route("/").get((req, res) => {
  invoicesDB.find((err, invoices) => {
    if (err) {
      console.log("error found: " + err);
    } else {
      res.json(invoices);
    }
  });
});

//end-point-2 - GET BY ID
Routes.route("/:id").get((req, res) => {
  let id = req.params.id;
  invoicesDB.findById(id, (err, invoice) => {
    if (err) {
      console.log("error found: " + err);
    } else {
      res.json(invoice);
    }
  });
});

//end-point-3 - CREATE
Routes.route("/create").post((req, res) => {
  let invoice = new invoicesDB(req.body);
  invoice
    .save()
    .then(invoice => {
      res.status(200).json({ invoice: "Created!" });
      // res.status(200).send('Created!');
    })
    .catch(err => {
      res.status(400).send("Failed!");
    });
});

//end-point-4 - UPDATE BY ID
Routes.route("/update/:id").post((req, res) => {
  invoicesDB.findById(req.params.id, (err, invoice) => {
    if (!invoice) {
      res.status(404).send("Not found!");
    } else {
      invoice.vendor = req.body.vendor;
      invoice.invoiceDate = req.body.invoiceDate;
      invoice.expectedDate = req.body.expectedDate;
      invoice.billingAddress = req.body.billingAddress;
      invoice.contactPerson = req.body.contactPerson;

      //how to update items
      invoice.items = req.body.items; //this I guess, gives the answer but not sure.

      invoice.totalPrice = req.body.totalPrice;

      invoice
        .save()
        .then(invoice => {
          res.json("Updated!");
        })
        .catch(err => {
          res.status(400).send("Update Failed!");
        });
    }
  });
});

//end-point-5 - alternative for end-point-4
Routes.route("/update/alt/:id").post((req, res) => {
  invoicesDB.update(
    { _id: req.params.id, "items._id": req.body.items._id },
    {
      $set: {
        "items.$.qty": req.body.items.qty,
        "items.$.unitPrice": req.body.items.unitPrice,
        "items.$.linePrice": req.body.items.linePrice
      }
    },
    ((err, invoice) => {
      if(err){
        res.status(400).send("Update Failed!");
      }else{
        res.status(200).send("Updated!");
      }
    })
  );
});

//end-point-6
Routes.route('/delete/:id').get((req, res) => {
  let id = req.params.id;
  invoicesDB.findByIdAndRemove(id, (err, deleted) => {
    if(err){
      res.status(400).send("Delete Failed!");
    }else{
      res.status(200).send("Deleted!");
    }
  })
});

app.use("/purchaseinvoices", Routes);

