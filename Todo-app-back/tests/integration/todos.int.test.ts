import request from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Todo from "../../src/models/todo.model";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
});

beforeEach(async () => {
  await Todo.deleteMany({});
});

describe("Integración: GET /todos", () => {
  it("devuelve una lista", async () => {
    const res = await request(app).get("/api/todos");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("Integración: POST + GET", () => {
  it("crea y luego obtiene un todo", async () => {
    const resCreate = await request(app)
      .post("/api/todos")
      .send({ title: "Test", description: "Desc" });

    const uid = resCreate.body.todo.uid;

    const resGet = await request(app).get(`/api/todos/${uid}`);

    expect(resGet.body.uid).toBe(uid);
  });
});

describe("Integración: PUT", () => {
  it("actualiza un todo y refleja el cambio", async () => {
    const create = await request(app)
      .post("/api/todos")
      .send({ title: "Original" });

    const uid = create.body.todo.uid;

    await request(app).put(`/api/todos/${uid}`).send({ title: "Actualizado" });

    const resGet = await request(app).get(`/api/todos/${uid}`);

    expect(resGet.body.title).toBe("Actualizado");
  });
});

describe("Integración: DELETE", () => {
  it("elimina un todo y ya no existe", async () => {
    const create = await request(app)
      .post("/api/todos")
      .send({ title: "A borrar" });

    const uid = create.body.todo.uid;

    await request(app).delete(`/api/todos/${uid}`);

    const resGet = await request(app).get(`/api/todos/${uid}`);

    expect(resGet.body).toBeNull();
  });
});
