import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Suite de AppRouter', () => {

    const contextValue = {
        user: {
            logged: false
        }
    }
    
    test('Debe de mostrar el login si no está autenticado', () => {
        
        const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <AppRouter />
        </AuthContext.Provider>);

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('h1').text().trim()).toBe('Login Screen');

    });

    test('Debe mostrar el componente de Marvel si está autenticado', () => {
    
        const contextValue = {
            user: {
                logged: true,
                name: 'Juan'
            }
        }

        const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <AppRouter />
        </AuthContext.Provider>);

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('h1').text().trim()).toBe('Marvel Screen');


    });

})