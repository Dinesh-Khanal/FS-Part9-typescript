import express from "express";
import diagService from "../services/diagnoseService";
const router = express.Router();
router.get("/", (_req, res) => {
  res.json(diagService.getEntries());
});
export default router;
