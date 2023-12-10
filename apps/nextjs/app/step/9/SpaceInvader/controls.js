import { fireHero, moveHero } from "./actions";

const LEFT = 37,
    RIGHT = 39,
    SPACE = 32;

export const controls = (callBack) => {
    const match = {
        [LEFT]: () => callBack(moveHero(-1)),
        [RIGHT]: () => callBack(moveHero(1)),
        [SPACE]: () => callBack(fireHero()),
    };
    const onKeyDown = (e) =>{ e.preventDefault(); match[e.keyCode]();}
    const onKeyUp = (e) => e.keyCode === RIGHT && callBack(moveHero(0));

    return [onKeyDown, onKeyUp];
};
