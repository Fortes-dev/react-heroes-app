import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Suite de Navbar', () => {
    
    const contextValue = {
        user: {
            logged: true,
            name: 'Juanito'
        },
        dispatch: mockDispatch
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe de mostrar el snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Juanito');
        

    });

    test('Debe de llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {

        wrapper.find('button').simulate('click');
        expect(mockDispatch).toHaveBeenCalledWith({type: types.logout});


    });

})