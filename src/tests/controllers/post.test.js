import chai from "chai";
import fs from "fs";
import chaiHttp from "chai-http";
import server from "../../app";
import db from "../../models/index";
import { user4 } from "./user-sign-in-test-data";
import {
  post, post2, post4, post5
} from "./post-data";

chai.should();

const { expect } = chai;
chai.use(chaiHttp);
describe("Add post", () => {
  it("should allow user add a post", done => {
    chai
      .request(server)
      .post("/api/v1/post")
      .set("content-type", "form-data")
      .field({ post: "Semi detached" })
      .attach("media", fs.readFileSync(`${__dirname}/file.jpg`), "file.jpg")
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it("should not allow user add a post with incomplete details", done => {
    chai
      .request(server)
      .post("/api/v1/post")
      .set("Accept", "form-data")
      .send(post2)
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe("Verify post", () => {
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
  it("should allow Admin verify a post", done => {
    chai
      .request(server)
      .patch("/api/v1/post/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully verified Post.");
        res.body.data.should.have.property("verified").eql(true);
        done();
      });
  });
  it("returns 404 when verifying a post which is not in db", done => {
    chai
      .request(server)
      .patch("/api/v1/post/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Post not found.");
        done();
      });
  });
  it("should not allow user without token verify a post", done => {
    chai
      .request(server)
      .patch("/api/v1/post/2e11e4a9-441b-4426-9521-39adc64ccfad")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
describe("Like a post", () => {
  beforeEach(async () => {
    await db.Posts.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Posts.create(post4);
    await db.Posts.create(post5);
  });
  it("should allow user like a post", done => {
    chai
      .request(server)
      .patch("/api/v1/like-post/a430e505-937b-4908-9422-7aa57044e85a")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully liked Post.");
        done();
      });
  });
  it("returns 404 when liking a post which is not in db", done => {
    chai
      .request(server)
      .patch("/api/v1/like-post/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Post not found.");
        done();
      });
  });
});

describe("Delete post", () => {
  beforeEach(async () => {
    await db.Posts.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Posts.create(post4);
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
  it("should allow Admin Delete a post", done => {
    chai
      .request(server)
      .delete("/api/v1/post/c375c640-81ff-405a-89a8-460ea2f71755")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Successfully Deleted Post.");
        done();
      });
  });
  it("should not allow user without token delete a post", done => {
    chai
      .request(server)
      .delete("/api/v1/post/2e11e4a9-441b-4426-9521-39adc64ccfad")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it("should not allow user delete a post with invalid ID data type", done => {
    chai
      .request(server)
      .delete("/api/v1/post/8d58")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("ID must be a UUID");
        done();
      });
  });
  it("returns 404 when deleting post which is not in db", done => {
    chai
      .request(server)
      .delete("/api/v1/post/8d585465-cd80-4030-b665-bdc3bbd3e578")
      .set("Authorization", `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.error).to.equal("Post not found.");
        done();
      });
  });
});

describe("GET verified post api route", () => {
  beforeEach(async () => {
    await db.Posts.destroy({
      where: {
      },
      trancate: {
        cascade: true,
      },
    });
    await db.Posts.create(post4);
    await db.Posts.create(post5);
  });
  it("returns all verified posts", done => {
    chai
      .request(server)
      .get("/api/v1/posts")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrieved all Posts.");

        data.forEach(posts => {
          expect(posts).to.have.property("id");
          expect(posts).to.have.property("post");
          expect(posts).to.have.property("media");
          expect(posts).to.have.property("likes");
          expect(posts).to.have.property("verified");
        });

        expect(data).to.have.length(1);

        expect(data).to.be.an("array");
        done();
      });
  });
  it("returns all non-verified posts", done => {
    chai
      .request(server)
      .get("/api/v1/posts-nonverified")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrieved all Posts.");

        data.forEach(posts => {
          expect(posts).to.have.property("id");
          expect(posts).to.have.property("post");
          expect(posts).to.have.property("media");
          expect(posts).to.have.property("likes");
          expect(posts).to.have.property("verified");
        });

        expect(data).to.have.length(1);

        expect(data).to.be.an("array");
        done();
      });
  });

  it("returns post with specific id", done => {
    chai
      .request(server)
      .get("/api/v1/post/c375c640-81ff-405a-89a8-460ea2f71755")
      .end((err, res) => {
        const { status, body } = res;
        const { data } = body;
        expect(status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.message).to.equal("Successfully retrieved Post.");
        expect(data).to.have.property("id");
        expect(data).to.have.property("post");
        expect(data).to.have.property("media");
        expect(data).to.have.property("likes");
        expect(data).to.have.property("verified");

        expect(data).to.be.an("object");
        done();
      });
  });
});
