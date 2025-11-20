import { updateTodo } from "../../src/controllers/todo.controller";
import Todo from "../../src/models/todo.model";
import { Request, Response } from "express";

jest.mock("../../src/models/todo.model");

describe("updateTodo", () => {
  it("actualiza un TODO y devuelve el resultado", async () => {
    const mockUpdatedTodo = {
      uid: "abc123",
      title: "Título editado",
    };

    (Todo.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedTodo);

    const req = {
      params: { uid: "abc123" },
      body: { title: "Título editado" },
    } as unknown as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await updateTodo(req, res);

    expect(Todo.findOneAndUpdate).toHaveBeenCalledWith(
      { uid: "abc123" },
      { title: "Título editado" },
      { new: true }
    );

    expect(res.json).toHaveBeenCalledWith({
      message: "Todo updated",
      todo: mockUpdatedTodo,
    });
  });
});
