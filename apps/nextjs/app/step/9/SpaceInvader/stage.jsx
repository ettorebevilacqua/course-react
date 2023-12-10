import React from 'react'
import { Enemy } from './enemy.jsx'
import { Hero } from './hero.jsx'
import { Bullet } from './bullet.jsx'
import { Explosion } from './exposion.jsx'
import { worldWidth, worldHeight } from './config'

export const Stage = ({ state, onKeyDown, onKeyUp }) => {
    let { enemiesGrid, hero, heroBullets, enemyExplosions } = state

    return <div className="stage"
        role="button"
        tabIndex="0"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        style={{ width: worldWidth, height: worldHeight,  border: "2px solid red" }}>

        {enemiesGrid.enemies.map(d => <Enemy
            key={d.key}
            top={d.top}
            left={d.left}
            type={d.type}
            flip={d.flip}
            selected={d.selected}
            didMove={d.didMove}
            didAdvane={d.didAdvane}
        />
        )}

        {hero.map(d => <Hero
            key={d.key}
            top={d.top}
            left={d.left}
        />
        )}

        {heroBullets.map(d => <Bullet
            key={d.key}
            top={d.top}
            left={d.left}
        />
        )}

        {enemyExplosions.map(d => <Explosion
            key={d.key}
            top={d.top}
            left={d.left}
        />
        )}

    </div>
}
