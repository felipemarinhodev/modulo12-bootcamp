import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';
/* getByLabelText - Pega o input que o atributo for se refere.
*	Exemplo:
 <label htmlFor="tech">Tech</label>
 <input id="tech" />
*/
describe('TechList component', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('should be able to add new tech', () => {
		const { getByText, getByTestId, getByLabelText } = render(<TechList />);

		fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' }});
		fireEvent.submit(getByTestId('tech-form'));

		expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
		expect(getByLabelText('Tech')).toHaveValue('');
	});

	it('should store tech in storage', () => {
		let { getByTestId, getByLabelText, getByText } = render(<TechList />);

		fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' }});
		fireEvent.submit(getByTestId('tech-form'));

		// server para limpar a DOM.
		cleanup();

		({ getByTestId, getByLabelText, getByText } = render(<TechList />));

		/** 
		 * Por estar usando o jest-localstorage-mock
		 * podemos validar se chamamos um determinado método ou não.
		 * 
		 * Por exemplo ele espera que a função 'localStorage.setItem' tenha sido
		 * chamada e passando os parâmetros (toHaveBeenCalledWith) =>
		 * 'techs', JSON.stringify(['Node.js'])
		 */
		expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
		expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
	});
});
