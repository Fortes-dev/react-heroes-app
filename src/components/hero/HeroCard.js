import React from 'react'
import { Link } from 'react-router-dom'

export const HeroCard = ( {hero} ) => {
  return (
    
    <div className='col animate__animated animate__fadeIn'>    
        <div className='card'>
            
            <div className='row no-gutters'>
                <div className='col-4'>
                    <img src={`/assets/${hero.id}.jpg`} className="card-img" alt={hero.superhero}/>
                </div>
                <div className='col-8'>
                    <div className='card-body'>
                        <h5 className='card-title'>{hero.superhero}</h5>
                        <p className='card-text'>{hero.alter_ego}</p>
                        {
                            (hero.alter_ego !== hero.characters) && 
                                <p className='text-muted'>{hero.characters}</p>
                        }
                        <Link to={`/hero/${hero.id}`}>
                            Más info...
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
