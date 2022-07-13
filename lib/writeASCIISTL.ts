import * as os from 'os';
const fs = require("fs");

const EOF_KEYWORD_OF_ASCII_STL: string = "endsolid";
const KEYWORD_OF_VERTEX: string = "vertex";
const KEYWORD_START_STL_NAME: string = "solid ";
const KEYWORD_OF_FACETS_NORMAL_FACET: string = "facet";
const KEYWORD_OF_FACETS_NORMAL_NORMAL: string = "normal";
const KEYWORD_OF_START_VERTEX: string = "outer loop";
const KEYWORD_OF_END_VERTEX: string = "endloop";
const KEYWORD_OF_END_FACET: string = "endfacet";

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


const addNewLine = (text: string): string => {
    return text + os.EOL;
}

const addBlank = (text: string): string => {
    return text + " ";
}

const writeVertexCoordinates = (text: string, STLdata: ParsedSTL, indexOfVertexCoordinates: number): string => {
    console.log("abbbbbb");
    text = addBlank(text);
    text = addBlank(text);
    text = text + KEYWORD_OF_START_VERTEX;
    text = addNewLine(text);
    text = addBlank(text);
    text = addBlank(text);
    text = addBlank(text);
    text = text + KEYWORD_OF_VERTEX;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates].x;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates].y;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates].z;
    
    text = addNewLine(text);
    text = addBlank(text);
    text = addBlank(text);
    text = addBlank(text);
    text = text + KEYWORD_OF_VERTEX;

    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates + 1].x;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates + 1].y;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates + 1].z;
    
    text = addNewLine(text);
    text = addBlank(text);
    text = addBlank(text);
    text = addBlank(text);
    text = text + KEYWORD_OF_VERTEX;

    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates + 2].x;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates + 2].y;
    text = addBlank(text);
    text = text + STLdata.vertexCoordinates[indexOfVertexCoordinates + 2].z;
    text = addNewLine(text);

    text = addBlank(text);
    text = addBlank(text);
    text = text + KEYWORD_OF_END_VERTEX;
    text = addNewLine(text);
    return text;
}

export const writeASCIISTL = (STLdata: ParsedSTL, fileName: string) => {
    let rawText: string = "";
    const name: string | undefined = STLdata.name;
    rawText = KEYWORD_START_STL_NAME + name;
    rawText = addNewLine(rawText);
    let jth = 0;
    for (let ith = 0; ith < STLdata.normalVectors.length; ith++) {
        rawText = addBlank(rawText);
        rawText = rawText + KEYWORD_OF_FACETS_NORMAL_FACET;
        rawText = addBlank(rawText);
        rawText = rawText + KEYWORD_OF_FACETS_NORMAL_NORMAL;
        rawText = addBlank(rawText);
        rawText = rawText + STLdata.normalVectors[ith].x
        rawText = addBlank(rawText);
        rawText = rawText + STLdata.normalVectors[ith].y
        rawText = addBlank(rawText);
        rawText = rawText + STLdata.normalVectors[ith].z;
        rawText = addNewLine(rawText);
        rawText = writeVertexCoordinates(rawText, STLdata, jth);
        jth = jth + 3;
        rawText = addBlank(rawText);
        rawText = rawText + KEYWORD_OF_END_FACET;
        rawText = addNewLine(rawText);
    }
    //rawText = rawText + STLdata.normalVectors[0].x
    fs.writeFileSync(fileName, rawText)
}
