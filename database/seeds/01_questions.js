exports.seed = knex => {
  return knex("question")
    .del()
    .then(() => {
      return knex("question").insert([
        {
          id: 1,
          question:
            "According to the law of gravity, all objects attract to each other."
        },
        {
          id: 2,
          question: "Reading lists will be available before the course begins."
        },
        {
          id: 3,
          question:
            "Social policies describe the ways in which the society meets human's needs."
        },
        {
          id: 4,
          question: "You are required to complete the research paper by Monday."
        }
      ]);
    });
};
