import { useEffect } from "react";
import type { FormProps } from "antd";
import { Form, Input, Select } from "antd";
import { usePhone } from "../../api/features/hooks/usePhone";
import { useColor } from "../../api/features/hooks/useColor";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { clearSelectedPhone } from "../../features/PhoneSlice";

const { Option } = Select;

const Home = () => {
  const { createPhone, updatePhone } = usePhone();
  const { getColor } = useColor();
  const { data } = getColor;

  const [form] = Form.useForm();

  const selectedPhone = useSelector(
    (state: RootState) => state.phone.selectedPhone
  );
  const dispatch = useDispatch();

  type FieldType = {
    tittle?: string;
    price?: number;
    color?: string;
    description?: string;
  };

  useEffect(() => {
    if (selectedPhone) {
      form.setFieldsValue({
        tittle: selectedPhone.tittle,
        price: selectedPhone.price,
        color: selectedPhone.colorId,
        description: selectedPhone.description,
      });
    }
  }, [selectedPhone, form]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (selectedPhone) {
      const price = Number(values.price);
      updatePhone.mutate(
        { id: selectedPhone.id, body: { ...values, price } },
        {
          onSuccess: () => {
            toast.success("Phone updated");
            form.resetFields();
            dispatch(clearSelectedPhone());
          },
          onError: () => {
            toast.error("Failed to update phone");
          },
        }
      );
    } else {
      createPhone.mutate(values, {
        onSuccess: () => {
          toast.success("Phone created");
          form.resetFields();
        },
        onError: () => {
          toast.error("Failed to create phone");
        },
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {selectedPhone ? "Update Phone" : "Create Phone"}
        </h1>
        <Form
          form={form}
          name="phoneForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Title"
            name="tittle"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input placeholder="title" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input type="number" placeholder="price" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please select a color!" }]}
          >
            <Select placeholder="Select color">
              {data?.data?.map((color: any) => (
                <Option key={color.id} value={color.id}>
                  {color.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType> label="Description" name="description">
            <Input.TextArea rows={4} placeholder="description" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <button
              type="submit"
              className={`w-full ${
                selectedPhone ? "bg-green-600" : "bg-blue-600"
              } hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition`}
            >
              {selectedPhone ? "Update" : "Create"}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Home;
