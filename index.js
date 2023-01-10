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

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contactsList = await contacts.listContacts();
            console.table(contactsList);
            break;
        
        case "get":
            const contact = await contacts.getContactById(id);
            if (!contact) {
                throw new Error(`contact ${id} not find`);
            }
            console.log(contact);
            break;

        case "add":
            const newContact = await contacts.addContact(
                name,
                email,
                phone
            );
            console.log(newContact);
            break;

        case "remove":
            const contactRemove = await contacts.removeContact(id);
            if (!contactRemove) {
                throw new Error(`contact ${id} doesnt exist`);
            }
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);