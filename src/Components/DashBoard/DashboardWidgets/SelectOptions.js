import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

export default function SelectOptions(props) {
    const { handlePassingDataObj } = props;
    const [dataObj, setDataObj] = useState({
        name: '',
        description: '',
        options: [],
    });

    const onFinish = (values) => {
        handlePassingDataObj({ ...dataObj, options: values.names.reverse() });
        setDataObj({
            name: '',
            description: '',
            options: [],
        });
    };

    return (
        <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
        >
            <Input
                placeholder="Name..."
                style={{ width: '100%', padding: '10px' }}
                className="input-select"
                onChange={(e) =>
                    setDataObj({ ...dataObj, name: e.target.value })
                }
                value={dataObj.name}
            />

            <Input
                placeholder="Description..."
                style={{ width: '100%', padding: '10px' }}
                className="input-select"
                onChange={(e) =>
                    setDataObj({ ...dataObj, description: e.target.value })
                }
                value={dataObj.description}
            />

            <Form.List
                name="names"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 2) {
                                return Promise.reject(
                                    new Error('At least 2 options'),
                                );
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.reverse().map((field, index) => (
                            <Form.Item
                                {...(index === 0
                                    ? formItemLayout
                                    : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Select Options' : ''}
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message:
                                                "Please input passenger's name or delete this field.",
                                        },
                                    ]}
                                    noStyle
                                >
                                    <Input
                                        placeholder="Tên options"
                                        style={{ width: '60%' }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => remove(field.name)}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add('Options 1', 0);
                                }}
                                style={{ width: '60%', marginTop: '20px' }}
                                icon={<PlusOutlined />}
                            >
                                Options
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
