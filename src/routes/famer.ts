import { Express } from "express"
import { famerSchema } from "../schema/famer.schema"
import validate  from "../middleware/validate"
import FamerController from "../controllers/famer.ctr"
import { requireUser } from "../middleware/requireUser"
const routes = (app: Express) => {
    app.post("/api/farmer/create",requireUser,validate(famerSchema.createFarmerSchema),FamerController.createFarmer)
    app.delete("/api/farmer/delete/:user_uuid",requireUser,validate(famerSchema.deleteFarmerSchema),FamerController.deleteFarmer)
    app.get("/api/farmer/get-all",requireUser,FamerController.getAllFarmers)
    app.get("/api/farmer/get-one/:user_uuid",requireUser,validate(famerSchema.params),FamerController.getOneFarmer)
    app.get("/api/my-plans/:farmer_uuid",requireUser,validate(famerSchema.famer_uuid),FamerController.getMyPlans)

}

export default routes