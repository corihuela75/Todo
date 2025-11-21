import { createTodo } from "../../src/controllers/todo.controller";
import Todo from "../../src/models/todo.model";
import { Request, Response } from "express";

jest.mock("../../src/models/todo.model");

describe("createTodo", () => {
  it("crea un todo y devuelve la respuesta correcta", async () => {
    const body = {
      title: "Nuevo TODO",
      description: "Ejemplo",
    };

    const mockSave = jest.fn().mockResolvedValue(true);

    (Todo as unknown as jest.Mock).mockImplementation(() => ({
      ...body,
      uid: "test-uuid",
      save: mockSave,
    }));

    const req = { body } as Request;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await createTodo(req, res);

    expect(Todo).toHaveBeenCalledWith({
      ...body,
      uid: "test-uuid",
    });

    expect(mockSave).toHaveBeenCalledTimes(1);

    expect(res.json).toHaveBeenCalledWith({
      message: "Todo created",
      todo: expect.objectContaining({
        title: "Nuevo TODO",
        description: "Ejemplo",
        uid: "test-uuid",
      }),
    });
  });
});
