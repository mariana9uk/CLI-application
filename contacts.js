const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(
  __dirname,
  "CLI-application",
  "..",
  "db",
  "contacts.json"
);
const crypto = require("node:crypto");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}
async function getContactById(contactId) {
  // contactIdString=String(contactId)

  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === String(contactId));

  if (!contact) {
    return null;
  }
  return contact;
}
function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  if (!contacts) {
    return;
  }

  const contactDelete = contacts.find(
    (contact) => contact.id === String(contactId)
  );

  if (contactDelete === undefined) {
    return null;
  }
  const newContactsList = contacts.filter(
    (contact) => contact !== contactDelete
  );
  await writeContacts(newContactsList);
  return contactDelete;
}

async function addContact(name, email, phone) {
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  const contacts = await listContacts();
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
