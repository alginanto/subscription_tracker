import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "GET all subscriptions" });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "GET subscription details" });
});

subscriptionRouter.post("/", (req, res) => {
  res.post({ title: "POST create subscription" });
});

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "PUT update subscription by ID" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE subscription by ID" });
});

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "GET all user subscriptions" });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "subscription cancellation" });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET all upcoming renewals" });
});
export default subscriptionRouter;
