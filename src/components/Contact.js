import React from "react";
import Navbar from "../components/Navbar";
import { Form, Input, Button } from "antd";
import "../assets/Contact.css";

const ContactPage = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div className="contact-container">
        <h1>Contact Me</h1>
        <Form
          name="contact-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Subject" name="subject">
            <Input placeholder="Enter subject of message" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[
              { required: true, message: "Please enter your message!" },
            ]}
          >
            <Input.TextArea placeholder="Enter your message" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Send A Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactPage;
