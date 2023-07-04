const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");

// Вивести список усіх контактів
const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

// Вивести один контакт за його id
const getContactById = async (contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
};

// Видалити один контакт за його id
const removeContact = async (contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
};

// Додати до списку новий контакт, створений на основі переданих даних
const addContact = async (name, email, phone) => {
  // ...твій код. Повертає об'єкт доданого контакту.
};

module.exports = { listContacts, addContact, getContactById, removeContact };
