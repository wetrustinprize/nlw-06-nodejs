import { Router } from "express";

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";

import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUsercontroller = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const listUserSendComplimentController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentController =
  new ListUserReceiveComplimentsController();
const listTagsController = new ListTagController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post("/login", authenticateUsercontroller.handle);
router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentController.handle
);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

export { router };
