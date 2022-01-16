module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Feedbacks", [
      {
      id: "c375c640-81ff-405a-89a8-460ea2f71577",
      postId: "6cbaa746-6e42-453e-91f4-c0de15fb4b9f",
      questionId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      threatType: "rape",
      answer1: "No i didn't",
      answer2: "No I am not",
      answer3: "it was bad",
      answer4: "No i dont",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e58a",
      postId: "c375c640-81ff-405a-89a8-460ea2f71755",
      questionId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      threatType: "robbery",
      answer1: "Yes i did see some people",
      answer2: "3 guys",
      answer3: "No",
      answer4: "2 hours",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e79a",
      postId: "a430e505-937b-4908-9422-7aa57044e85a",
      questionId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      threatType: "corruption",
      answer1: "1 million naira",
      answer2: "3 men",
      answer3: "Yes",
      answer4: "Yes",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b4f",
      postId: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97a",
      questionId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      threatType: "rape",
      answer1: "Yes i did",
      answer2: "Yes I am",
      answer3: "it wasn't cool at all, i was crying throghtout",
      answer4: "Yes i do",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
      {
      id: "6cbaa746-6e42-453e-91f4-c0de14cb4b4f",
      postId: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97a",
      questionId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd65",
      threatType: "others",
      answer1: "cultist clashing",
      answer2: "Yes i was",
      answer3: "No",
      answer4: "No",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ,], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
