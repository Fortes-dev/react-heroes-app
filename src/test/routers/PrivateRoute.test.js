import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <h1>Navigate</h1>
}));


describe('Suite en PrivateRoute', () => {
    
    Storage.prototype.setItem = jest.fn();

    test('Debe mostrar el componente si está autenticado y guardar en el localstorage', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Juanito'
            },

        }
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>PrivateComponent</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('PrivateComponent');
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('lastPath', '/');
        
        

    });

    test('Debe de bloquear el componente si no está autenticado', () => {
        
        const contextValue = {
            user: {
                logged: false,
            },

        }
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>PrivateComponent</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.find('h1').text().trim()).toBe('Navigate');

    });

});