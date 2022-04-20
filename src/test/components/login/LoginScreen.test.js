import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";



const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('Suite en LoginScreen', () => {

    const contextValue = {
        user: {
            logged: false,
        },
        dispatch: mockDispatch
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    

    test('Debe de hacer match con el snapshot', () => {
        
        expect(wrapper).toMatchSnapshot();
        
    });

    test('Debe de realizar el dispatch y login y la navegación', () => {
        
        const action = {
            type: types.login,
            payload: { 
              name: 'Carlos'
            }
          }

        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith(action);

        expect(mockNavigate).toHaveBeenCalledWith('/', {
            replace: true
        });

        localStorage.setItem('lastPath', '/dc');

        wrapper.find('button').simulate('click');

        expect(mockNavigate).toHaveBeenCalledWith('/dc', {
            replace: true
        });

    });

});