// import { createClient } from "redis";

// let redis = null;

// try {
//   redis = createClient({ url: "redis://localhost:6379" });
//   redis.on("error", (err) => console.log("Redis Client Error", err));
//   await redis.connect();
//   console.log("✅ Connected to Redis");
// } catch (error) {
//   console.log("⚠️ Redis connection failed, continuing without cache...");
//   redis = null;
// }

// export default redis;
