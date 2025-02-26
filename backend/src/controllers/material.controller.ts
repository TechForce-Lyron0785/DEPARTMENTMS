import { RequestHandler } from "express";
import { Material } from "../models/Material";

export const uploadMaterial: RequestHandler = async (req, res) => {
  try {
    const { courseId } = req.params;
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const material = new Material({
      title: req.body.title,
      fileUrl: file.path,
      courseId,
      uploadedBy: req.user?.userId,
    });

    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload material" });
  }
};

export const getMaterialsByCourse: RequestHandler = async (req, res) => {
  try {
    const { courseId } = req.params;
    const materials = await Material.find({ courseId });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch materials" });
  }
};

export const deleteMaterial: RequestHandler = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      res.status(404).json({ error: "Material not found" });
      return;
    }
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete material" });
  }
};
