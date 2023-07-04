const contacts = require("./contacts");
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

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getAll":
      const allContacts = await contacts.getListContacts();
      return console.table(allContacts);

    case "getOne":
      const foundContact = await contacts.getContactById(id);
      return console.table(foundContact);

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.table(newContact);

    case "update":
      const updatedContact = await contacts.updateContact(
        id,
        name,
        email,
        phone
      );
      return console.table(updatedContact);

    case "remove":
      const removedContact = await contacts.removeContact(id);
      return console.table(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
