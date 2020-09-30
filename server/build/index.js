"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
require("dotenv").config();
var _a = require("apollo-server"), ApolloServer = _a.ApolloServer, gql = _a.gql;
var xlsx = require("node-xlsx");
var file_model_1 = require("./entity/file.model");
var workSheetsFromFile = xlsx.parse(__dirname + "/test.xlsx");
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type File {\n    id: ID!\n    filename: String!\n    mimetype: String!\n    encoding: String!\n  }\n\n  type Query {\n    uploads: [File]\n    file(id: ID!): File\n  }\n\n  type Mutation {\n    singleUpload(file: Upload!): File!\n  }\n"], ["\n  type File {\n    id: ID!\n    filename: String!\n    mimetype: String!\n    encoding: String!\n  }\n\n  type Query {\n    uploads: [File]\n    file(id: ID!): File\n  }\n\n  type Mutation {\n    singleUpload(file: Upload!): File!\n  }\n"])));
var resolvers = {
    Query: {
        uploads: function (_, _a) {
            var id = _a.id;
            return file_model_1.File.getRepository().findOne({ where: { id: Number(id) } });
        }
    },
    Mutation: {
        singleUpload: function (_, args) {
            console.log();
            return null;
        }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen(process.env.PORT, function () {
    console.log("Server ready at " + process.env.PORT);
});
var templateObject_1;
