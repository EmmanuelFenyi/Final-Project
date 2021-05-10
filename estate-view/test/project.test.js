const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();

chai.use(chaiHttp);

//TESTING THE CRUD
describe("Testing Project Controller", () => {
  //Return ALL projects or NOT
  describe("GET All Projects", () => {
    it("should return all projects", (done) => {
      chai
        .request(server)
        .get("/projects")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.an("object");

          done();
        });
    });
    it("should not return all projects", (done) => {
      chai
        .request(server)
        .get("/project")
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.be.an("object");

          done();
        });
    });
  });

  //Return a project or NOT
  describe("GET a Single Project", () => {
    it("should return a single project", (done) => {
      const projectId = "";
      chai
        .request(server)
        .get(`/projects/${projectId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.an("object");

          done();
        });
    });
    it("should not return a project", (done) => {
      const projectId = "";
      chai
        .request(server)
        .get(`/project/${projectId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.be.an("object");

          done();
        });
    });
  });

  //Create a project or NOT
  describe("Create a Project", () => {
    it("should create a project", (done) => {
      const project = {
        projectName: "gg",
        description: "vv",
        images: "vv",
        price: 7,
        location: "vv",
        estateDeveloper: "123456789",
      };
      chai
        .request(server)
        .post("/projects")
        .send(project)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");

          done();
        });
    });
    it("should not create a project", (done) => {
      const project = {
        projectName: "",
        description: "",
        images: "",
        price: 7,
        location: "",
        estateDeveloper: "",
      };
      chai
        .request(server)
        .post("/project")
        .send(project)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.an("object");

          done();
        });
    });
  });

  //Update a project or NOT
  describe("Update a Project", () => {
    it("should update a project", (done) => {
      const project = {
        description: "de",
        images: "im",
        price: 8,
        location: "lo",
      };
      const projectId = "";
      chai
        .request(server)
        .patch(`/projects/${projectId}`)
        .send(project)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.an("object");

          done();
        });
    });
    it("should not update a project info", (done) => {
      const project = {
        description: "ii",
        images: "klkm",
        price: 8,
        location: "nkn",
      };
      const projectId = "";
      chai
        .request(server)
        .patch(`/project/${projectId}`)
        .send(project)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.be.an("object");

          done();
        });
    });
  });

  //Delete a project or NOT
  describe("Delete a Project", () => {
    it("should delete a project", (done) => {
      const projectId = "";
      chai
        .request(server)
        .delete(`/projects/${projectId}`)
        .end((err, res) => {
          res.should.have.status(204);
          res.should.have.be.an("object");

          done();
        });
    });
    it("should not delete a project", (done) => {
      const projectId = "";
      chai
        .request(server)
        .delete(`/project/${projectId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.be.an("object");

          done();
        });
    });
  });
});
