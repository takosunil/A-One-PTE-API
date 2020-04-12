const express = require("express");

const router = express.Router();
const Question = require("../../models/Question");
const { QUESTION_STATUS } = require("../../lib/constants/database-constants");

router.get("/", async (req, res) => {
  try {
    const questions = await Question.query().orderBy("id");
    res.send({ status: 200, data: questions });
  } catch (e) {
    console.log("error: ", e);
    res.send({ status: 400, message: "Bad Request" });
  }
});

router.get("/:id", async (req, res) => {
  let question;
  try {
    const { params } = req;
    question = await Question.query()
      .where("id", "=", params.id)
      .first();
    res.send({ status: 200, data: question });
  } catch (e) {
    console.log("error: ", e);
    res.send({ status: 400, message: "Bad Request" });
  }
});

router.post("/:id", async (req, res) => {
  const { body } = req;
  try {
    await Question.query().insert({
      id: parseInt(req.params.id, 10),
      ...body
    });
    res.send({ status: 200, message: "Question Type saved" });
  } catch (e) {
    console.log("error: ", e);
    res.send({ status: 400, message: "Bad Request" });
  }
});

router.put("/:id", async (req, res) => {
  const { body } = req;
  const questionId = parseInt(req.params.id, 10);
  const questionToBeUpdated = await Question.query()
    .where("id", "=", req.params.id)
    .first();

  try {
    if (questionToBeUpdated) {
      await Question.query()
        .where("id", "=", questionId)
        .patch({ id: questionId, ...body });
      res.send({ status: 200, message: "Question Modified" });
    } else {
      await Question.query().insert({ id: questionId, ...body });
      res.send({ status: 200, message: "Question Added" });
    }
  } catch (e) {
    console.log("error: ", e);
    res.send({ status: 400, error: e });
  }
});

router.delete("/:id", async (req, res) => {
  const questionId = parseInt(req.params.id, 10);
  const questionToBeSoftDeleted = await Question.query()
    .where("id", "=", questionId)
    .first();
  try {
    if (questionToBeSoftDeleted) {
      const body = questionToBeSoftDeleted;
      body.status = QUESTION_STATUS.DELETED;
      await Question.query()
        .where("id", "=", questionId)
        .patch({ id: questionId, ...body });
      res.send({ status: 200, message: "Question Deleted" });
    } else {
      res.send({ status: 400, message: "Question Not Found" });
    }
  } catch (e) {
    console.log("error: ", e);
    res.send({ status: 400, error: e });
  }
});

module.exports = router;
