import * as os from 'os';
const fs = require("fs");

const EOF_KEYWORD_OF_ASCII_STL: string = "endsolid";
const KEYWORD_OF_VERTEX: string = "vertex";
const KEYWORD_START_STL_NAME: string = "solid ";
const KEYWORD_OF_FACETS_NORMAL_FACET: string = "facet";
const KEYWORD_OF_FACETS_NORMAL_NORMAL: string = "normal";
export const readSTL = (filePath: string): string => {
    return filePath;
}

interface ParsedSTL {
    name?: string;
    isBinary: boolean;
    isASCII: boolean;
    isValid: boolean;
    normalVectors: NormalVector[];
    vertexCoordinates: VertexCoordinates[];
}

interface NormalVector {
    x: number;
    y: number;
    z: number;
}

interface VertexCoordinates {
    x: number;
    y: number;
    z: number;
}

export const writeASCIISTL = (STLdata: ParsedSTL, fileName: string) => {
    let rawText: string = "";
    const name: string | undefined = STLdata.name;
    rawText = KEYWORD_START_STL_NAME + name;
    fs.writeFileSync(fileName, rawText)
}
