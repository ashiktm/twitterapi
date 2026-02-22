import mongoose from "mongoose";
const connect = async () => {
    await mongoose.connect("mongodb+srv://ashiktmind:2dP5B3G0X9HzFLNX@cluster0.rjdthah.mongodb.net/?appName=Cluster0");
};
export default connect;
