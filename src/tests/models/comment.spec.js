import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} from "sequelize-test-helpers";
import chai, { expect } from "chai";

import sinonChai from "sinon-chai";
import CommentModel from "../../models/comment";

chai.use(sinonChai);

describe("src/models/comment", () => {
  const Comment = CommentModel(sequelize, dataTypes);
  const comment = new Comment();

  checkModelName(Comment)("Comments");
  context("properties", () => {
    ["postId", "comment"].forEach(
      checkPropertyExists(comment),
    );
  });
});
