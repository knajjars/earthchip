const express = require("express");
const EarthChip = require("../../models/EarthChip");
const { isLoggedIn } = require("../middlewares");
const EarthChipData = require("../../models/EarthChipData");

const router = express.Router();

// ALL ROUTES PREFIXED WITH /api/list-earthies

router.get("/", isLoggedIn, (req, res, next) => {
  EarthChip.find({ _user: req.user._id })
    .then(earthies => {
      res.status(200).json(earthies);
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." })
    );
});

router.get("/getData", isLoggedIn, (req, res, next) => {
  EarthChip.find({ _user: req.user._id })
    .lean()
    .then(earthies => {
      let a = earthies.map(earthie => {
        return earthie.macAddress;
      });

      Promise.all(a).then(results => {
        EarthChipData.find(
          {
            macAddress: { $in: results }
          },
          {},
          { sort: { created_at: -1 } }
        ).then(earthieData => {
          // let res = []
          // for (let i = 0; i < earthies.length; i++) {
          //   res.p
          // }

          // res.json({
          //   earthies,
          //   earthieData
          // });
          res.json(
            earthies.map(earthie => {
              earthie.data = earthieData.filter(
                earthieDataElt =>
                  earthieDataElt.macAddress === earthie.macAddress
              );
              // earthie.data = "test";
              return earthie;
            })
          );
        });
      });
    })
    // .then(earthieList => {
    //   res.status(200).json(earthieList);
    // })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Unexpected error, please try again later." })
    );
});

// router.get("/getData", isLoggedIn, (req, res, next) => {
//   EarthChip.find({ _user: req.user._id })
//     .then(earthies => {
//       res.status(200).json(earthies);
//       return;
//     })
//     .catch(err =>
//       res
//         .status(500)
//         .json({ message: "Unexpected error, please try again later." })
//     );
// });

module.exports = router;
