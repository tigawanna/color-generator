import React, { createContext } from "react";


interface ColorContext {
    color_json: {[x: string]: string}
}

const storeContext = createContext<ColorContext>({
color_json:{}
});


