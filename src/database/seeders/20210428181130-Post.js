module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", [
      {
      id: "c375c640-81ff-405a-89a8-460ea2f71755",
      media: [
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511995/c42vafrtwqqf5fqszjfi.jpg",
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511996/yw583airzfvcer5eoq5e.jpg"
        ],
     
      post: "Bandits attacks",
      description: "Bandits attacks travellers in the east ",
      likes: 10,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e85a",
      media: [
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511995/c42vafrtwqqf5fqszjfi.jpg",
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511996/yw583airzfvcer5eoq5e.jpg"
        ],
     
      post: "Students assiociation drops demands",
      description: "Students assiociation demands more security within school premises",
      likes: 6,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97a",
      media: [
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511995/c42vafrtwqqf5fqszjfi.jpg",
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511996/yw583airzfvcer5eoq5e.jpg"
        ],
     
      post: "Son resfuse to fast, after seeing Dominos pizza advert",
      description: "Son resfuse to fast, after seeing Dominos pizza advert",
      likes: 4,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b9f",
      media: [
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511995/c42vafrtwqqf5fqszjfi.jpg",
          "https://res.cloudinary.com/obioflagos/image/upload/v1625511996/yw583airzfvcer5eoq5e.jpg"
        ],
     
      post: "Man runs away with church offerings",
      description: "Man runs away with church offerings",
      likes: 0,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ,], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
