const axios = require("axios");

const baseURL = "http://localhost:5000"; // เปลี่ยนเป็น URL ของ Backend ของคุณ

async function testEditTemplate() {
  try {
    // สร้าง Template ใหม่เพื่อทดสอบการแก้ไข
    const newTemplate = {
      Name: "Test Template",
      Description: "Test description",
      id: 999, // เปลี่ยนเป็น ID ที่ไม่ซ้ำ
      medications: [
        {
          Name: "Test Medicine",
          Description: "Test medicine description",
          times: [{ time: "09:00", dose: 1 }],
          id: 1,
        },
      ],
    };

    // สร้าง Template ใหม่
    const createResponse = await axios.post(
      `${baseURL}/saveTemplate`,
      newTemplate
    );
    console.log("✅ Template created:", createResponse.data);

    // แก้ไข Template
    const updatedTemplate = {
      Name: "Updated Template Name",
      Description: "Updated description",
      medications: [
        {
          Name: "Updated Medicine Name",
          Description: "Updated medicine description",
          times: [{ time: "10:00", dose: 2 }],
          id: 1,
        },
      ],
    };

    const editResponse = await axios.put(
      `${baseURL}/editTemplate/${newTemplate.id}`,
      updatedTemplate
    );
    console.log("✅ Template edited:", editResponse.data);

    // ดึง Template ที่แก้ไขแล้วมาตรวจสอบ
    const getResponse = await axios.get(
      `${baseURL}/getTemplate/${newTemplate.id}`
    );
    console.log("✅ Fetched edited template:", getResponse.data);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }
}

testEditTemplate();