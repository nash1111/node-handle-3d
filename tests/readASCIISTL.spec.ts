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

const sampleASCIISTL: string = 'solid Visualization Toolkit generated SLA File' + EOL +
  ' facet normal 0.062746412054374687 -0.037362288100243335 -0.99732990890788853' + EOL +
  '  outer loop' + EOL +
  '   vertex 0.60154032707214355 0.037101738154888153 -4.9635443687438965' + EOL +
  '   vertex 0.62666618824005127 -1.5348894778271024e-16 -4.960573673248291' + EOL +
  '   vertex 3.0616169991140216e-16 -7.4987987861059711e-32 -5' + EOL +
  '  endloop' + EOL +
  ' endfacet' + EOL +
  'endsolid' + EOL


describe("readASCIISTL", () => {
  it("test readASCIISTL", () => {
    const result = readASCIISTL(sampleASCIISTL);
    const expectedName = "Visualization Toolkit generated SLA File";

    // test get name
    expect(result.name).toStrictEqual(expectedName);
    console.log("aaaa" + sampleASCIISTL)
    expect(result.normalVectors).toStrictEqual([{
      x: "0.062746412054374687",
      y: "-0.037362288100243335",
      z: "-0.99732990890788853"
    }]);
  });
})
