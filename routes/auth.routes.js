import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  // Handle user login
  res.send({ title: "Signup endpoint" });
});

authRouter.post("/sign-in", (req, res) => {
  // Handle user signup
  res.send({ title: "Signin endpoint" });
});
authRouter.post("/sign-out", (req, res) => {
  // Handle user login
  res.send({ title: "Signout endpoint" });
});


export default authRouter;