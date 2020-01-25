import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { addTech } from '~/store/modules/techs/actions';
import TechList from '~/components/TechList';

jest.mock('react-redux');

describe('TechList component', () => {
	it('should render tech list', () => {
		useSelector.mockImplementation(cb => cb({ techs: ['Node.js', 'ReactJS']}));

		const { getByTestId, getByText } = render(<TechList />);
		expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
		expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
	});
	it('should be able to add new tech', () => {
		const { getByTestId, getByLabelText } =  render(<TechList />);

		const dispatch = jest.fn();

		useDispatch.mockReturnValue(dispatch);

		fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js'}});
		fireEvent.submit(getByTestId('tech-form'));
/**
 * Maneira de usar SEM usar as actions do redux
 expect(dispatch).toHaveBeenCalledWith({
	 type: 'ADD_TECH',
	 payload: { tech: 'Node.js' }
	});
	*/
		
	//Usando as actions do Redux
		expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
	});
});
