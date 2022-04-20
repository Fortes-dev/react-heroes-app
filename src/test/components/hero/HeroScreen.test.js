import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('Suite en HeroScreen', () => {
    
    test('No debe de mostrar el HeroScreen si no hay un heroe en url', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen />} />
                    <Route path="/" element={<h1>NoHero</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(wrapper.find('h1').text().trim()).toBe('NoHero');
        

    });

    test('Debe de mostrar el HeroScreen si hay un heroe en url', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>NoHero</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        expect(wrapper.find('.row').exists()).toBe(true);
        

    });

    test('debe regresar a la pantalla anterior', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroeId" element={<HeroScreen />} />
                    <Route path="/" element={<h1>NoHero</h1>} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').simulate('click');
        expect(mockNavigate).toHaveBeenCalledWith(-1);

    });

});