import data from "../data/data.js";
import path from "path";
import fs from "fs";

export const getAssurances = async (req, res) => {
  try {
    const { assurances } = data;
    res.status(200).json(assurances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const { companies } = data;
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const saveInformation = async (req, res) => {
  try {
    const information = req.body;
    const fileName = "information" + new Date().toISOString() + ".json";
    const filePath = path.join(fileName);

    fs.writeFile(filePath, JSON.stringify(information, null, 2), (err) => {
      if (err) {
        console.error("Error writing to file", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(200).json({ message: "Information saved successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
