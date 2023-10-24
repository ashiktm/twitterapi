import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://ashiktmind:dKBWXZ6NaSK3ushH@cluster0.jocolvc.mongodb.net/twitterDB?retryWrites=true&w=majority"
  );
};

export default connect;
