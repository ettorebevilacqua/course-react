/*

https://github.com/grancalavera/react-spaceinvaders

*/

// import { useState } from "react";

import { shallow } from "zustand";
import { controls } from "./controls";
import { gameLoop } from "./game-loop";
import { useHeroStore } from "./hero-reducer";
import { update } from "./actions"
import { Stage } from "./stage"
import "./main.css"

gameLoop(elapsedTime => {
    // console.log('loop', elapsedTime)
    useHeroStore.dispatch(update(elapsedTime))
    // render()
    //collisions(store)
  })

export default function SpaceInvader() {
    const dispatch = useHeroStore((state) => state.dispatch, shallow);
    const hero = useHeroStore((state) => state.hero);
   // console.log("update zzz", hero);
    const handleAction = (ac) => {
        dispatch(ac);
        console.log("handle", hero);
    };

    const [onKeyDown, onKeyUp] = controls(handleAction);
    return (
        <>
            <div >
                left {hero.left}, speed {hero.speed}{" "}
            </div>
            <Stage onKeyDown={onKeyDown} onKeyUp={onKeyUp} />
        </>
    );
}
