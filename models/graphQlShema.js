const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
} = require("graphql");
const Auth = require("./authModel");
const Branch = require("./branchModel");
const Student = require("./studentModel");

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLID },
    studentName: { type: GraphQLString },
    admissionNo: { type: GraphQLString },
    class: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    district: { type: GraphQLString },
    branch: {
      type: BranchType,
      resolve(parent, args) {
        return Branch.findById(parent.branch);
      },
    },
  }),
});
const BranchType = new GraphQLObjectType({
  name: "Branch",
  fields: () => ({
    id: { type: GraphQLID },
    branchName: { type: GraphQLString },
    place: { type: GraphQLString },
    district: { type: GraphQLString },
    phone1: { type: GraphQLString },
    postOffice: { type: GraphQLString },
    imageCover: { type: GraphQLString },
    pinCode: { type: GraphQLString },
    admin: {
      type: UserType,
      resolve(parent, args) {
        return Auth.findById(parent.admin);
      },
    },
  }),
});
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    role: { type: GraphQLString },
    branch: {
      type: BranchType,
      resolve(parent, args) {
        return Branch.findById(parent.branch);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    students: {
      type: new GraphQLList(StudentType),
      resolve(parent, args) {
        return Student.find();
      },
    },
    myVerifiedStudents: {
      type: new GraphQLList(StudentType),
      args: {
        adminId: { type: new GraphQLNonNull(GraphQLID) },
        classId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Student.find({
          verified: true,
          branch: args.adminId,
          class: args.classId,
        });
      },
    },

    branches: {
      type: new GraphQLList(BranchType),
      resolve(parent, args) {
        return Branch.find().sort({ branchCode: -1 });
      },
    },
    branch: {
      type: BranchType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Branch.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return Auth.find({ role: { $ne: "superAdmin" } });
      },
    },
    user: {
      type: new GraphQLList(UserType),
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Auth.findById(args.userId);
      },
    },
    branchStudents: {
      type: new GraphQLList(StudentType),
      args: {
        branchId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let students = Student.find({ branch: args.branchId, verified: true });
        return students;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Auth.create(args);
      },
    },
    getAllUsers: {
      type: UserType,
      resolve(parent, args) {
        return Auth.find();
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Auth.findByIdAndDelete(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
