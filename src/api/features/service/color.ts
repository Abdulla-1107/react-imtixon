import { api } from "../..";

export const getColor = () => api.get("/color");
export const createColor = (body: any) => api.post("/color", body);
export const deleteColor = (id: string) => api.delete(`/color/${id}`);
export const updateProduct = ({ id, body }: { id: string; body: any }) =>
  api.patch(`/product/${id}`, body);
