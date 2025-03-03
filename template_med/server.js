const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
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
    app.listen(port, "0.0.0.0", () => {
      console.log(` Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

// Schema สำหรับยาแต่ละตัว
const medicineSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Unit: { type: String, required: true },
  times: [
    {
      time: { type: String, required: true },
      dose: { type: Number, required: true },
    },
  ],
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  note: { type: String },
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

// ✅ ฟังก์ชันบันทึก Template พร้อมคืนค่า id
app.post("/saveTemplate", async (req, res) => {
  try {
    const templateData = req.body;

    // ตรวจสอบว่าตัวแปร medications เป็นอาร์เรย์หรือไม่
    if (templateData.medications && !Array.isArray(templateData.medications)) {
      return res.status(400).json({ error: "Invalid medications format" });
    }

    // ถ้ามี medications และไม่ใช่ array ว่าง ให้ตรวจสอบข้อมูลภายใน
    if (Array.isArray(templateData.medications) && templateData.medications.length > 0) {
      templateData.medications = templateData.medications.map((med) => ({
        ...med,
        id: new mongoose.Types.ObjectId().toHexString(), // ✅ เพิ่ม id อัตโนมัติให้แต่ละตัว
      }));
    }

    // หา id ล่าสุดและเพิ่มค่าใหม่
    const lastTemplate = await TemplateModel.findOne().sort({ id: -1 });
    const newId = lastTemplate ? lastTemplate.id + 1 : 1;

    const newTemplate = new TemplateModel({ ...templateData, id: newId });
    await newTemplate.save();

    console.log("✅ Template saved successfully with ID:", newId);
    res.json({ message: "Template saved successfully", id: newId });
  } catch (error) {
    console.error("❌ Error saving template:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ ฟังก์ชันดึง Template ทั้งหมด
app.get("/getAllTemplates", async (req, res) => {
  try {
    const templates = await TemplateModel.find();
    res.json(templates);
  } catch (error) {
    console.error("❌ Error getting templates:", error);
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

// ✅ ฟังก์ชันดึง Template ตาม ID
app.get("/getTemplate/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const template = await TemplateModel.findOne({ id });

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.json(template);
  } catch (error) {
    console.error("❌ Error getting template:", error);
    res.status(500).json({ error: "Failed to fetch template" });
  }
});

// ✅ ฟังก์ชันแก้ไข Template
app.put("/editTemplate/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newTemplateData = req.body;

    const existingTemplate = await TemplateModel.findOne({ id });

    if (!existingTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }

    if (!Array.isArray(newTemplateData.medications)) {
      return res.status(400).json({ error: "Invalid medications format" });
    }

    newTemplateData.medications = newTemplateData.medications.map((med) => ({
      ...med,
      id: med.id || new mongoose.Types.ObjectId().toHexString(), // ✅ เพิ่ม id ให้ยาที่ไม่มี id
    }));

    existingTemplate.Name = newTemplateData.Name;
    existingTemplate.Description = newTemplateData.Description;
    existingTemplate.medications = newTemplateData.medications;

    await existingTemplate.save();
    console.log("✅ Template edited successfully");
    res.json(existingTemplate);
  } catch (error) {
    console.error("❌ Error editing template:", error);
    res.status(500).json({ error: "Failed to edit template" });
  }
});
