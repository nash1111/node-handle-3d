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

// check binary STL or text STL
// see https://ja.wikipedia.org/wiki/Standard_Triangulated_Language

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

export const readASCIISTLFromFilePath = (filePath: string): ParsedSTL => {
    const texts: string = fs.readFileSync(filePath).toString();
    return readASCIISTL(texts);
}

export const readASCIISTL = (texts: string): ParsedSTL => {
    const lines = texts.split(os.EOL)
    const name = lines[0].replace(KEYWORD_START_STL_NAME, "");
    const endLineIndex = getKeywordLine(lines, EOF_KEYWORD_OF_ASCII_STL);
    const normalVectors = getNormalVectors(lines, endLineIndex);
    const vertexCoordinates = getVertexCoordinates(lines, endLineIndex);

    let parsedSTL: ParsedSTL = {
        name: name,
        isBinary: false,
        isASCII: true,
        isValid: true,
        normalVectors: normalVectors,
        vertexCoordinates: vertexCoordinates,
    }
    return parsedSTL;
}

export const getKeywordLine = (texts: string[], keyWord: string): number => {
    let index: number = 0;
    for (let ith = 0; ith < texts.length; ith++) {
        if (texts[ith] == keyWord) {
            index = ith;
        }
    }
    return index;
}

const getNormalVectors = (texts: string[], numEOF: number): NormalVector[] => {
    let normalVectors: NormalVector[] = [];
    for (let ith = 1; ith < numEOF; ith++) {
        if (texts[ith].includes(KEYWORD_OF_FACETS_NORMAL_FACET) && texts[ith].includes(KEYWORD_OF_FACETS_NORMAL_NORMAL)) {
            const line = removeKeyords(texts[ith], KEYWORD_OF_FACETS_NORMAL_FACET, KEYWORD_OF_FACETS_NORMAL_NORMAL);
            normalVectors.push(
                {
                    x: Number(line[0]),
                    y: Number(line[1]),
                    z: Number(line[2]),
                }
            )
        }
    }
    return normalVectors
}

const getVertexCoordinates = (texts: string[], numEOF: number): VertexCoordinates[] => {
    let vertexCoordinates: VertexCoordinates[] = [];
    for (let ith = 1; ith < numEOF; ith++) {
        if (texts[ith].includes(KEYWORD_OF_VERTEX)) {
            const line = removeKeyords(texts[ith], KEYWORD_OF_VERTEX);
            vertexCoordinates.push(
                {
                    x: Number(line[0]),
                    y: Number(line[1]),
                    z: Number(line[2]),
                }
            )
        }
    }
    return vertexCoordinates;

}

const removeKeyords = (text: string, ...keywords: string[]): string[] => {
    const parsedText = text.split(' ');
    const keywordsRemovedText: string[] = [];

    for (const keyword of keywords) {
        for (let ith = 1; ith < parsedText.length; ith++) {
            if (parsedText[ith] == keyword) {
                parsedText.splice(ith, 1);
            }
        }

    }
    for (const word of parsedText) {
        if (word != '') {
            keywordsRemovedText.push(word);
        }
    }
    return keywordsRemovedText;
}

const isBinarySTL = (filePath: string): boolean => {
    return false;
}

const isASCIISTL = (filePath: string): boolean => {
    return false;
}

