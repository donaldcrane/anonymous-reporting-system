import bcrypt from "bcryptjs";

const password = "12345";
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [{
      id: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      email: "alli@gmail.com",
      username: "alliboy",
      password: hash,
      firstName: "Alli",
      lastName: "Gideon",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      email: "ufuoma@gmail.com",
      username: "Ufuguy",
      password: hash,
      firstName: "Dele",
      lastName: "Ufuoma",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      email: "fiyin@gmail.com",
      username: "Fiyinbaby",
      password: hash,
      firstName: "Bisi",
      lastName: "Akanbi",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      email: "paul@gmail.com",
      username: "Paulinho",
      password: hash,
      firstName: "Adeola",
      lastName: "Paul",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    ],
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
