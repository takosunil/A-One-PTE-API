const { Model } = require("objection");

class Question extends Model {
  static get tableName() {
    return "question";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["id", "question", "level_id", "type_id"],
      properties: {
        id: { type: "integer" },
        question: { type: "string" },
        level_id: { type: "integer", minLength: 1, maxLength: 2 },
        type_id: { type: "integer", minLength: 1, maxLength: 2 },
        answer_type_id: { type: "integer", minLength: 1, maxLength: 2 },
        status: { type: "integer", minLength: 1, maxLength: 2 }
      }
    };
  }
}

module.exports = Question;
