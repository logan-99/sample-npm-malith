import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };

//Here there are two rollup objects since we need to bundle in two formats which are js and typescript.
export default [
    //First Config Object - Contains the all js components in our library
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,   //We must define these new paths in package.json file
                format: "cjs",     //common js
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: "esm",     //es6 format
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
        ],
    },
    //Second Config Object - Describe the types of our components (Usefull for typescript users)
    {
        input: "dist/esm/types/index.d.ts",     //What is this dir? - First object will give all outputs into dist directory. types of the components will be inside the types directory as mentioned in tsconfig.json
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
    }
];

