import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/authContext"
import { DashboardRoutes } from "../../routers/DashboardRoutes"



describe('Suite en DashboardRoutes', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Juanito'
        }
    }
    
    test('Debe mostrar el snapshot de la init entry (marvel)', () => {
        
        const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={ ['/'] }>
                <DashboardRoutes />
            </MemoryRouter>
        </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe mostrar el snapshot de dc', () => {
        
        const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={ ['/dc'] }>
                <DashboardRoutes />
            </MemoryRouter>
        </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text()).toBe('DC Screen');

    });



})