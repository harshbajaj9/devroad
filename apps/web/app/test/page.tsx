"use client";
import { testServerAction } from "../../actions/test";
// import { prisma } from "@repo/database";
// import { prisma } from "../lib/db";
import React from "react";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
const TestPrisma = () => {
  console.log(">>");

  // const data = await prisma.demoTable.findMany();
  return (
    <div>
      TestPrisma
      <button
        onClick={() => {
          testServerAction();
        }}
      >
        press
      </button>
    </div>
  );
};

export default TestPrisma;
