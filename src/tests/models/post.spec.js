import chai, { expect } from "chai";

import sinonChai from "sinon-chai";

import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";

import PostModel from "../../models/post";

chai.use(sinonChai);
describe("src/models/post", () => {
  const Post = PostModel(sequelize, dataTypes);
  const post = new Post();
  checkModelName(Post)("Posts");
  context("properties", () => {
    ["post", "media", "likes", "verified"].forEach(
      checkPropertyExists(post)
    );
  });
});
