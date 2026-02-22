import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";

class CrudRepository<T extends Document> {
  model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      console.log(data);
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error instanceof Error ? error : new Error("Create failed");
    }
  }

  async destroy(id: string): Promise<T | null> {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error instanceof Error ? error : new Error("Destroy failed");
    }
  }

  async get(id: string): Promise<T | null> {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error instanceof Error ? error : new Error("Get failed");
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error instanceof Error ? error : new Error("GetAll failed");
    }
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error instanceof Error ? error : new Error("Update failed");
    }
  }

  async findby(data: FilterQuery<T>): Promise<T | null> {
    try {
      const result = await this.model.findOne(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo");
      throw error instanceof Error ? error : new Error("Findby failed");
    }
  }
}

export default CrudRepository;
