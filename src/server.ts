
// import dotenv from "dotenv"
// import http, { Server } from "http";
// import { prisma } from "./config/db";
// import app from "./app";



// dotenv.config();

// let server: Server | null = null;

// async function connectToDB() {
//   try{
//     await prisma.$connect();
//     console.log("DB Connection Successful!1");
//   }catch(error){
//     console.log("DB connection faile");
//     process.exit(1);
//   }
// }

// async function startServer() {
//   try {
//     await connectToDB();
//     server = http.createServer(app); 
//     server.listen(process.env.PORT, () => {
//       console.log(`🚀 Server is running on port ${process.env.PORT}`);
//     });

//     handleProcessEvents();
//   } catch (error) {
//     console.error("❌ Error during server startup:", error);
//     process.exit(1);
//   }
// }

// async function gracefulShutdown(signal: string) {
//   console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

//   if (server) {
//     server.close(async () => {
//       console.log("✅ HTTP server closed.");

//       try {
//         console.log("Server shutdown complete.");
//       } catch (error) {
//         console.error("❌ Error during shutdown:", error);
//       }

//       process.exit(0);
//     });
//   } else {
//     process.exit(0);
//   }
// }

// /**
//  * Handle system signals and unexpected errors.
//  */
// function handleProcessEvents() {
//   process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
//   process.on("SIGINT", () => gracefulShutdown("SIGINT"));

//   process.on("uncaughtException", (error) => {
//     console.error("💥 Uncaught Exception:", error);
//     gracefulShutdown("uncaughtException");
//   });

//   process.on("unhandledRejection", (reason) => {
//     console.error("💥 Unhandled Rejection:", reason);
//     gracefulShutdown("unhandledRejection");
//   });
// }


// startServer();


import dotenv from "dotenv";
import http, { Server } from "http";
import { prisma } from "./config/db";
import app from "./app";

dotenv.config();

let server: Server | null = null;

// DB connect
async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("✅ DB Connection Successful!");
  } catch (error) {
    console.error("❌ DB Connection Failed");
    process.exit(1);
  }
}

// Start Server
async function startServer() {
  try {
    await connectToDB();

    server = http.createServer(app);

    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error("❌ Error during server startup:", error);
    process.exit(1);
  }
}

// Graceful shutdown
async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down...`);

  if (server) {
    server.close(async () => {
      console.log("✅ Server closed.");
      await prisma.$disconnect();
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

// Signal + error handlers
function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });
  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

startServer();
