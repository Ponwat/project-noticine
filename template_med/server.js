const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(` Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

// Schema สำหรับยาแต่ละตัว
const medicineSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  times: [
    {
      time: { type: String, required: true },
      dose: { type: Number, required: true },
    },
  ],
  id: { type: Number, required: true },
});

// Schema สำหรับ Template ยา
const templateSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Description: { type: String },
  id: { type: Number, required: true },
  medications: [medicineSchema],
});

// Model สำหรับ Template ยา
const TemplateModel = mongoose.model("Template", templateSchema);

async function saveTemplate(templateData) {
  try {
    const newTemplate = new TemplateModel({
      Name: templateData.Name,
      Description: templateData.Description,
      id: templateData.id,
      medications: templateData.medications,
    });

    await newTemplate.save();
    console.log("✅ Template saved successfully");
  } catch (error) {
    console.error("❌ Error saving template:", error);
  }
}

app.post("/saveTemplate", (req, res) => {
  const templateData = req.body;
  saveTemplate(templateData)
    .then(() => res.json({ message: "Template saved successfully" }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

// ฟังก์ชันสำหรับดึง Template ตาม ID และส่ง ID กลับไปด้วย
async function getTemplateById(id) {
  try {
    const template = await TemplateModel.findOne({ id: id });
    if (!template) {
      return null;
    }
    // ส่ง Template กลับไปพร้อม ID
    return template;
  } catch (error) {
    console.error("❌ Error getting template:", error);
    return null;
  }
}

app.get("/getTemplate/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const template = await getTemplateById(id);
  if (template) {
    res.json(template);
  } else {
    res.status(404).json({ message: "Template not found" });
  }
});

// ฟังก์ชันสำหรับดึง Template ทั้งหมด
async function getAllTemplateIds() {
  try {
    // ดึง Template ทั้งหมดจากฐานข้อมูล
    const templates = await TemplateModel.find();
    return templates;
  } catch (error) {
    console.error("❌ Error getting templates:", error);
    return [];
  }
}

// API endpoint สำหรับดึง Template ทั้งหมด
app.get("/getAllTemplateIds", async (req, res) => {
  const templates = await getAllTemplateIds();
  res.json(templates);
});

// ฟังก์ชันสำหรับแก้ไข Template
async function editTemplate(id, newTemplateData) {
  try {
    // ค้นหา Template ด้วย ID
    const existingTemplate = await TemplateModel.findOne({ id: id });

    if (!existingTemplate) {
      return null; // ไม่พบ Template ที่ต้องการแก้ไข
    }

    // อัปเดตข้อมูล Template ด้วยข้อมูลใหม่
    existingTemplate.Name = newTemplateData.Name;
    existingTemplate.Description = newTemplateData.Description;
    existingTemplate.medications = newTemplateData.medications;

    // บันทึกการเปลี่ยนแปลง
    await existingTemplate.save();
    console.log("✅ Template edited successfully");
    return existingTemplate; // ส่ง Template ที่แก้ไขแล้วกลับไป
  } catch (error) {
    console.error("❌ Error editing template:", error);
    return null;
  }
}

// API endpoint สำหรับแก้ไข Template
app.put("/editTemplate/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const newTemplateData = req.body;

  const editedTemplate = await editTemplate(id, newTemplateData);

  if (editedTemplate) {
    res.json(editedTemplate);
  } else {
    res.status(404).json({ message: "Template not found or edit failed" });
  }
});