import { MOVE_HERO, UPDATE } from "./actions"
import { cellHeight, cellWidth, worldHeight, worldWidth } from "./config"
import { create } from "zustand"
import { redux } from 'zustand/middleware'

export const getHero = (state) => state[0] || state;
const minLeft = 0,
    maxLeft = worldWidth - cellWidth,
    speed = 7;

const defaultState = {
    hero:{
        top: worldHeight - cellHeight,
        left: worldWidth / 2 - cellWidth / 2,
        speed: 0,
        key: `hero-${Date.now()}`,
    },
}

const move = (state, action) => (
        { hero: { ...getHero(state), speed: action.direction * speed } }
)

const update = (_hero) =>{
    let left = () => {
        let l = _hero.left + _hero.speed;
        return l < minLeft ? minLeft : l > maxLeft ? maxLeft : l
    };
    return  { hero: { ..._hero,  left: left() } };
};

export const heroReducer = (state, action) => {
    if (!action) return state;
    // console.log('heroReducer', action, state)

    switch (action.type) {
        case MOVE_HERO:
            return move(state.hero, action);
        case UPDATE:
            return update(state.hero, action);
        default:
            return state;
    }
};

export const useHeroStore =  create(redux(heroReducer, defaultState))
