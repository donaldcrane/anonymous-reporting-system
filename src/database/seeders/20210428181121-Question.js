module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Questions", [
      {
      id: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      threatType: "rape",
      question1: "Did you encounter injuries after the event",
      question2: "Are you experiencing any body change?",
      question3: "How were you affected physiologically after the events?",
      question4: "Do you know this person or is he/she related to you?",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      threatType: "robbery",
      question1: "Did you see or hear anything?",
      question2: "How many people do you think were involve in the robbery?",
      question3: "Did you see any vehicle drive by, if you did what vehicle was it?",
      question4: "How long do you think the robbery lasted for?",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      threatType: "corruption",
      question1: "How much do you think was stolen?",
      question2: "How many people do you think were involved?",
      question3: "Is the culprit a government official?",
      question4: "Does the culprit have a criminal record?",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd65",
      threatType: "others",
      question1: "What Happened?",
      question2: "Were you alone?",
      question3: "Are you the only one affected?",
      question4: "Have you reprted to the police?",
      createdAt: new Date(),
      updatedAt: new Date(),
      }
    ], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
