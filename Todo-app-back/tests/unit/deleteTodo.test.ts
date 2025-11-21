import { deleteTodo } from "../../src/controllers/todo.controller";
import Todo from "../../src/models/todo.model";
import { Request, Response } from "express";

jest.mock("../../src/models/todo.model");

describe("deleteTodo", () => {
  it("debe eliminar un todo por uid y devolver mensaje", async () => {
    (Todo.findOneAndDelete as jest.Mock).mockResolvedValue(true);

    const req = {
      params: { uid: "abc123" },
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await deleteTodo(req, res);

    expect(Todo.findOneAndDelete).toHaveBeenCalledWith({ uid: "abc123" });
    expect(res.json).toHaveBeenCalledWith({ message: "Todo deleted" });
  });
});
