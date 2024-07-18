import { Router } from "express";
import * as PlaceController from "../controllers/places.js";

const router = Router();

router.get("/places", PlaceController.getPlaces);
router.get("/user-places", PlaceController.getUserPlaces);
router.put("/user-places", PlaceController.setUserPlaces);
router.delete("/user-places/:id", PlaceController.removeUserPlaces);

export default router;
