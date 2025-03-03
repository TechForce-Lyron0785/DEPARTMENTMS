import { RequestHandler } from "express";
import { Material } from "../models/Material";
import { Course } from "../models/Course";

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
      fileUrl: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      courseId,
      uploadedBy: req.user?.userId,
    });

    await material.save();

    // Update the course to include the new material
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { materials: material._id },
    });

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
    const materialId = req.params.id;

    // Find and delete the material
    const material = await Material.findByIdAndDelete(materialId);
    if (!material) {
      res.status(404).json({ error: "Material not found" });
      return;
    }

    // Update the course to remove the deleted material
    await Course.findByIdAndUpdate(material.courseId, {
      $pull: { materials: materialId },
    });

    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Error deleting material:", error);
    res.status(500).json({ error: "Failed to delete material" });
  }
};
