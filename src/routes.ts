import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";
const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController(); 
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/tags", ensureAuthenticated , createTagController.handle);
router.post('/users', createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliment",ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, ensureAdmin, listUserSenderComplimentsController.handle);
router.get("/users/compliments/receive", ensureAuthenticated,ensureAdmin, listUserReceiverComplimentsController.handle);
router.get("/tags", ensureAuthenticated, ensureAdmin, listTagsController.handle);
router.get("/users", ensureAuthenticated, ensureAdmin, listUsersController.handle)
export {router};