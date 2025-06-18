import { Popconfirm } from "antd";
import { usePhone } from "../../api/features/hooks/usePhone";
import phone from "../../assets/phone.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedPhone } from "../../features/PhoneSlice";

const Phone = () => {
  const { getPhone, deletePhone } = usePhone();
  const { data } = getPhone;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    deletePhone.mutate(id);
  };

  const handleUpdate = (item: any) => {
    dispatch(setSelectedPhone(item));
    navigate("/"); 
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.data.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105 flex flex-col justify-between"
        >
          <img
            src={phone}
            alt={item.tittle}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex-1">
            <h2 className="text-lg font-bold mb-2">{item.tittle}</h2>
            <p className="text-gray-600 mb-1">Price: ${item.price}</p>
            <p className="text-gray-600 mb-1">Color: {item.color}</p>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
          <div className="p-4 border-t flex gap-4 ">
            <Popconfirm
              title="Phone o'chirish"
              description="Haqiqatan ham o'chirmoqchimisiz?"
              onConfirm={() => handleDelete(item.id)}
              okText="Ha"
              cancelText="Yo'q"
            >
              <button className="bg-red-500 border rounded-[5px] px-[10px]">
                Delete
              </button>
            </Popconfirm>
            <button
              className="bg-green-600 border rounded-[5px] px-[10px]"
              onClick={() => handleUpdate(item)}
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Phone;
