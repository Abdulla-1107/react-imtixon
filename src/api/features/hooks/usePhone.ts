import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Phones from "../service/phone";

export const usePhone = () => {
  const queryClient = useQueryClient();

  const getPhone = useQuery({
    queryKey: ["phone"],
    queryFn: Phones.getPhone,
  });

  const createPhone = useMutation({
    mutationFn: Phones.createPhone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phone"] });
    },
  });

  const deletePhone = useMutation({
    mutationFn: Phones.deletePhone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phone"] });
    },
  });

  const updatePhone = useMutation({
    mutationFn: Phones.updatePhone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phone"] });
    },
  });

  return { getPhone, createPhone, deletePhone, updatePhone };
};
