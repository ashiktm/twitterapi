import mongoose from "mongoose";

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://ashiktmind:dKBWXZ6NaSK3ushH@cluster0.8b7wq.mongodb.net/?appName=Cluster0"
    
  );
};

export default connect;
