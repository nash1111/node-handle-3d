import * as os from 'os';
const fs = require("fs");

const EOF_KEYWORD_OF_ASCII_STL: string = "endsolid";
const KEYWORD_OF_VERTEX: string = "vertex";
const KEYWORD_OF_OUTER_LOOP: string = "outer loop";
const KEYWORD_OF_END_LOOP: string = "endloop";
const KEYWORD_OF_FACETS_NORMAL_FACET: string = "facet";
const KEYWORD_OF_FACETS_NORMAL_NORMAL: string = "normal";
export const readSTL = (filePath: string): string => {
    return filePath;
}

// check binary STL or text STL
// see https://ja.wikipedia.org/wiki/Standard_Triangulated_Language

interface ParsedSTL {
    filePath: string;
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

export const readASCIISTL = (filePath: string): ParsedSTL => {
    const text: string[] = fs.readFileSync(filePath).toString().split(os.EOL);
    const name = text[0].split(' ')[1];
    const endLineIndex = getKeywordLine(text, EOF_KEYWORD_OF_ASCII_STL);
    const normalVectors = getNormalVectors(text, endLineIndex);
    const vertexCoordinates = getVertexCoordinates(text, endLineIndex);

    let parsedSTL: ParsedSTL = {
        filePath: filePath,
        name: name,
        isBinary: false,
        isASCII: true,
        isValid: true,
        normalVectors: normalVectors,
        vertexCoordinates: vertexCoordinates,
    }
    console.log(parsedSTL);
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
        if (texts[ith].includes(KEYWORD_OF_FACETS_NORMAL_FACET) && texts[ith].includes(KEYWORD_OF_FACETS_NORMAL_NORMAL) ) {
            const line = removeKeyords(texts[ith], KEYWORD_OF_FACETS_NORMAL_FACET, KEYWORD_OF_FACETS_NORMAL_NORMAL);
            console.log("line="+line)
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
        console.log(keyword);
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

