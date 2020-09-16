//graphql imports
const graphql = require("graphql");
const { GraphQLEnumType } = graphql;

const AnnouncementTypeEnum = new GraphQLEnumType({
    name: "AnnouncementTypeEnum",
    values: {
        Lost: { value: "Lost" },
        Food: { value: "Food" },
        Ownership: { value: "Ownership" },
        Vaccination: { value: "Vaccination" },
    },
});

module.exports = AnnouncementTypeEnum