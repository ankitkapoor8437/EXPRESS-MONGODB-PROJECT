const express = require("express");
const router = express.Router();
const { getContact, getContactId, createContact, updateContact, deleteContact } = require('../controllers/contactControllers')

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactId).put(updateContact).delete(deleteContact);

// router.route('/').get(validateToken, getContact);

// router.route('/:id').get(getContactId);

// router.route('/').post(validateToken,createContact);

// router.route('/:id').put(updateContact);

// router.route('/:id').delete(deleteContact);

module.exports = router;