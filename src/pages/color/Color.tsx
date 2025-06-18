import type { FormProps } from "antd";
import { Form, Input, Popconfirm } from "antd";

import { useColor } from "../../api/features/hooks/useColor";

const Color = () => {
  const { getColor, createColor, deleteColor } = useColor();
  const { data } = getColor;
  const [form] = Form.useForm();

  type FieldType = {
    name?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    createColor.mutate(values, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleDelete = (id: string) => {
    deleteColor.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Add Color
        </h2>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input color name!" }]}
          >
            <Input
              placeholder="name"
              className="py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Create
            </button>
          </Form.Item>
        </Form>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data.map((item: any) => (
          <div
            key={item.id}
            className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:shadow-md transition duration-200 relative"
          >
            <h1 className="text-lg font-semibold text-gray-800 mb-3">
              {item.name}
            </h1>
            <Popconfirm
              title="Color o'chirish"
              description="Haqiqatan ham o'chirmoqchimisiz?"
              onConfirm={() => handleDelete(item.id)}
              okText="Ha"
              cancelText="Yo'q"
            >
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Color;
