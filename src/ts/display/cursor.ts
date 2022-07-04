import { get } from "svelte/store";
import { Display } from "./main";
import { updateAll } from "./write";

export const cursor = {
    getpos:() => {
        const disp = get(Display);
        
        return {
            x: disp.cursor.x,
            y: disp.cursor.y
        }
    },
    setpos:(x:number,y:number) => {
        const disp = get(Display);
        disp.cursor.x = x;
        disp.cursor.y = y;

        updateAll();
    }
}