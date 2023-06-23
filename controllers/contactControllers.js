const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

// Get Contact
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.find();
    res.status(200).json(contact);
})

// Get contact by id

const getContactId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Get contact ${id}.` })
})

// Create Contact

const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All feilds are reuired");
    }
    const contact = await Contact.find();
    res.status(200).json(contact);
})

// Update Contact
const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Update contact ${id}.` })
})

// Delete Contact

const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Delete Contact ${id}.` })
})


module.exports = {
    getContact,
    getContactId,
    createContact,
    updateContact,
    deleteContact
};
