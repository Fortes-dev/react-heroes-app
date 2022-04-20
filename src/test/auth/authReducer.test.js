import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"


describe('Suit de authReducer', () => {
    
    test('Debe de retornar el estado por defecto', () => {
        
        const state = authReducer( {logged: false},  {});

        expect(state).toEqual({logged: false});

    });

    test('Debe de autenticar y colocar el name del usuario', () => {
        
        const state = authReducer( {logged: false}, {
            type: types.login,
            payload: {
                name: 'Juan'
            }
        });

        expect(state).toEqual({logged: true, name: 'Juan'});


    });

    test('Debe de borrar el nombre del usuario y logged en false', () => {
        
        const state = authReducer( {logged: true, name: 'Juan'}, {
            type: types.logout,
        });

        expect(state).toEqual({logged: false});

    });

});