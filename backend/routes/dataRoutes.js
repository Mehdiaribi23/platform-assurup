import express from "express";
import {
  getAssurances,
  getCompanies,
  saveInformation,
} from "../calls/controller/data.js";

const router = express.Router();

router.get("/assurances", getAssurances);

router.get("/companies", getCompanies);

router.post("/save", saveInformation);
export default router;
