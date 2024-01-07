const Contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return console.table(contacts);
    case "get":
      const contact = await Contacts.getContactById(id);
      return console.log(contact);

    case "remove":
      const deletedContact = await Contacts.removeContact(id);
      return console.log(deletedContact);
    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      return console.log(newContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
