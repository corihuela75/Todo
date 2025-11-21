import { getTodo } from "../../src/controllers/todo.controller";
import Todo from "../../src/models/todo.model";
import { Request, Response } from "express";

jest.mock("../../src/models/todo.model");

describe("getTodo", () => {
  it("obtiene TODO por ID", async () => {
    const mockTodo = {
      uid: "abc123",
      title: "Test Todo",
    };

    (Todo.findOne as jest.Mock).mockResolvedValue(mockTodo);

    const req = {
      params: { uid: "abc123" },
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await getTodo(req, res);

    expect(Todo.findOne).toHaveBeenCalledWith({ uid: "abc123" });
    expect(res.json).toHaveBeenCalledWith(mockTodo);
  });
});
