const Contact = require("../models/Contact");

exports.submitContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Message submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
