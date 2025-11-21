import { getTodos } from "../../src/controllers/todo.controller";
import Todo from "../../src/models/todo.model";
import { Request, Response } from "express";

jest.mock("../../src/models/todo.model");

describe("getTodos", () => {
  it("devuelve lista de TODOs", async () => {
    const mockTodos = [
      { uid: "1", title: "Todo 1" },
      { uid: "2", title: "Todo 2" },
    ];

    (Todo as any).find = jest.fn().mockResolvedValue(mockTodos);

    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await getTodos(req, res);

    expect((Todo as any).find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockTodos);
  });
});
