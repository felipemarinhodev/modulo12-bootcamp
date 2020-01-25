import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TechList from '~/components/TechList';
/* getByLabelText - Pega o input que o atributo for se refere.
*	Exemplo:
 <label htmlFor="tech">Tech</label>
 <input id="tech" />
*/
describe('TechList component', () => {
	it('should be able to add new tech', () =>{
		const { getByText, getByTestId, getByLabelText } = render(<TechList />);

		fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' }});
		fireEvent.submit(getByTestId('tech-form'));

		expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
		expect(getByLabelText('Tech')).toHaveValue('');
	});
});