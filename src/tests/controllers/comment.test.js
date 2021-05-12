import chai from "chai";
import chaiHttp from "chai-http";
import db from "../../models/index";
import { user4 } from "./user-sign-in-test-data";
import {
  comment, comment2, comment3, comment4, comment5
} from "./comment-data";
import server from "../../app";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);

describe("Add comment", () => {
  it("should allow user add a comment", done => {
    chai
      .request(server)
      .post("/api/v1/comment/a430e505-937b-4908-9422-7aa57044e85a")
      .set("Accept", "application/json")
      .send(comment)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow user add a comment with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/comment/a430e505-937b-4908-9422-7aa57044e85a")
      .set("Accept", "application/json")
      .send(comment2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe("Delete comment", () => {
  beforeEach(async () => {
    await db.Comments.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Comments.create(comment4);
  });
  let userToken;
  before(done => {
    chai
      .request(server)
      .post("/api/v1/users/signin")
      .set("Accept", "application/json")
      .send(user4)
      .end((err, res) => {
        if (err) throw err;
        userToken = res.body.data;
        done();
      });
  });
  it("should allow Admin Delete a comment", done => {
    chai
      .request(server)
      .delete("/api/v1/comment/c375c640-81ff-405a-89a8-460ea2f74735")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted Comment.");
        done();
      });
  });
  it("should not allow user delete a comment with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/comment/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting comment which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/comment/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Comment not found.");
        done();
      });
  });
});

describe("GET comment api route", () => {
  beforeEach(async () => {
    await db.Comments.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Comments.create(comment4);
    await db.Comments.create(comment5);
  });

  it("returns comment with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/comment/c375c640-81ff-405a-89a8-460ea2f74735")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrieved Comment.");
        expect(data).to.have.property("id");
        expect(data).to.have.property("postId");
        expect(data).to.have.property("comment");

        expect(data).to.be.an("object");
        done();
      });
  });
});
