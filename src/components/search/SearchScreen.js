import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { heroes } from '../../data/heroes';
import { getHeroesByName } from '../../helpers/getHeroesByName';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = ''} = queryString.parse(location.search);

  const [ {searchText}, handleInputChange ] = useForm( {
    searchText: q 
  } );

  const heroesFiltered = useMemo( () => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchText);
    navigate(`?q=${searchText}`);

  }

  return (
    <div>
        <h1>Búsquedas</h1>
        <hr/>

        <div className='row'>

          <div className='col-5'>
              <h4>Search Form</h4>
              <hr/>
              <form onSubmit={handleSearch}>
                <input 
                  type="text"
                  placeholder='Buscar un héroe'
                  className='form-control'
                  name='searchText'
                  autoComplete='off'
                  value={ searchText }
                  onChange={handleInputChange}
                  />

                  <button 
                    type='submit'
                    className='btn btn-outline-primary mt-2'>
                    Buscar
                  </button>
              </form>
          </div>

          <div className='col-7' >
            <h4>Resultados</h4>
            <hr/>

            {
              (q== '') 
                ? <div className='alert alert-info'>Buscar un héroe</div>
                : ( heroesFiltered.length === 0) 
                  && <div className='alert alert-danger'>No hay resultados: {q}</div>
            }

            {
              heroesFiltered.map(hero => ( <HeroCard hero={hero} key={hero.id} />) )
            }
          </div>

        </div>

    </div>
  )
}
