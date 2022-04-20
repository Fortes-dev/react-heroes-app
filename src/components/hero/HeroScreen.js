import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../helpers/getHeroById';

export const HeroScreen = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const hero = useMemo( () => getHeroById(id), [id]);

  if (!hero) {
      return <Navigate to="/" />
  }

  
  const handleReturn = () => {
      navigate(-1);
  }

  const imagePath = `/assets/${hero.id}.jpg`

  return (
    <div className='row mt-5'>
      <div className='col-4'> 
        <img src={imagePath} alt={hero.superhero} className='img-thumbnail animate__animated animate__fadeInLeft' />
      </div>
        
      <div className='col-8 animate__animated animate__fadeInLeft'>
        <h3>{hero.superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'><b>Alter ego:</b> {hero.alter_ego}</li>
          <li className='list-group-item'><b>Publisher:</b> {hero.publisher}</li>
          <li className='list-group-item'><b>First appearance:</b> {hero.first_appearance}</li>
          
        </ul>
        <h5 className='mt-5'>Characters</h5>
        <p>{hero.characters}</p>

        <button 
          className='btn btn-outline-info'
          onClick={handleReturn}>
            Return
          </button>
      </div>

    </div>
  )
}
