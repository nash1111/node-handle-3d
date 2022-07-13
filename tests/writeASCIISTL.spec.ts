import * as os from 'os';
import { describe, expect, it } from "vitest";
import { readASCIISTL, readASCIISTLFromFilePath } from "../lib/readASCIISTL";
import { writeASCIISTL } from "../lib/writeASCIISTL";
const fs = require("fs");
const EOL: string = os.EOL;


const sampleASCIISTLPath = "./samples/ballascii.stl";
const sampleASCIISTLOutPut = "./dist/ballascii.stl";

describe("readASCIISTL", () => {
  it("test readASCIISTLFromFilePath", () => {
    const result = readASCIISTLFromFilePath(sampleASCIISTLPath);
    const expectedName = "Visualization Toolkit generated SLA File";

    // test get name
    expect(result.name).toStrictEqual(expectedName);
  });
})

describe("writeASCIISTL", () => {
  it("test writeASCIISTLFromFilePath", () => {
    const sampleData = readASCIISTLFromFilePath(sampleASCIISTLPath);
    // write file
    writeASCIISTL(sampleData, sampleASCIISTLOutPut)
    const expected = readASCIISTLFromFilePath(sampleASCIISTLPath);
    const result = readASCIISTLFromFilePath(sampleASCIISTLOutPut);
    console.log(result);
    expect(result).toStrictEqual(expected);

  });
})