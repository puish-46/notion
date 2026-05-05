import { cardSchema } from "./cardSchema.js";
import { listSchema } from "./listSchema.js";
import { boardSchema } from "./boardSchema.js"; 
import { userSchema } from "./userSchema.js"; // done
import { workspaceSchema } from "./workspaceSchema.js"; // done
import { model } from "mongoose";


export const userModel = model("User", userSchema)
// export const workspaceModel = model("Workspace", workspaceSchema)
// export const boardModel = model("Board", )