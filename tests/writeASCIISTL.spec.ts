import * as os from 'os';
import { describe, expect, it } from "vitest";
import { readASCIISTL, readASCIISTLFromFilePath } from "../lib/readASCIISTL";
const fs = require("fs");
const EOL: string = os.EOL;


const sampleASCIISTLPath = "./samples/ballascii.stl"

describe("readASCIISTL", () => {
  it("test readASCIISTLFromFilePath", () => {
    const result = readASCIISTLFromFilePath(sampleASCIISTLPath);
    const expectedName = "Visualization Toolkit generated SLA File";

    // test get name
    expect(result.name).toStrictEqual(expectedName);
  });
})
