import { api } from "../..";

export const getPhone = () => api.get("/phone");
export const createPhone = (body: any) => api.post("/phone", body);
export const deletePhone = (id: string) => api.delete(`/phone/${id}`);
export const updatePhone = ({ id, body }: { id: string; body: any }) => api.put(`/product/${id}`, body);
