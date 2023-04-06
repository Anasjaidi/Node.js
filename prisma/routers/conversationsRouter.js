const express = require('express')


const router = express.Router();

router.route("/")
      .get()
      .post()
      .delete()

router.route("/:id")
      .get()
      .post()
      .delete()
      .put()

module.exports = router

