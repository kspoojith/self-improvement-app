import express from 'express'
import {addBehaviour, getAllBehavioursById, updateBehaviour,deleteBehaviour} from '../controllers/behaviour.controller.js';

const behaviourRoute = express.Router();

behaviourRoute.post("/", addBehaviour);
behaviourRoute.get("/:id", getAllBehavioursById);
behaviourRoute.patch("/:id", updateBehaviour);
behaviourRoute.delete("/:id",deleteBehaviour);

export default behaviourRoute;