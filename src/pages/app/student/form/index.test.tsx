import { StudentForm } from './index';
import { screen, render, fireEvent, act } from '../../../../tests';

const editionData = {
    id: 1,
    first_name: 'Cassiano',
    last_name: 'Scheidemantel',
    birthday: '2001-02-01',
    course: 'React Advanced Complete',
    hour: 100,
    price: 131.22,
};
const onSetEdition = jest.fn();
const onHandleCreate = jest.fn();
const onHandleUpdate = jest.fn();

const getFirstName = () => screen.queryByTestId('form-input-first_name');
const getLastName = () => screen.queryByTestId('form-input-last_name');
const getBirthday = () => screen.queryByTestId('form-input-birthday');
const getCourse = () => screen.queryByTestId('form-input-course');
const getHour = () => screen.queryByTestId('form-input-hour');
const getPrice = () => screen.queryByTestId('form-input-price');
const getBtnSubmit = () => screen.queryByTestId('btn-submit');
const getForm = () => screen.queryByTestId('form');

describe.skip('Student Edition Form <StudentForm />', () => {
    it('check the inputs/button are on the view', () => {
        render(
            <StudentForm
                editing={null}
                setEditing={onSetEdition}
                handleCreate={onHandleCreate}
                handleUpdate={onHandleUpdate}
            />,
        );
        expect(getFirstName()).toBeInTheDocument();
        expect(getLastName()).toBeInTheDocument();
        expect(getBirthday()).toBeInTheDocument();
        expect(getCourse()).toBeInTheDocument();
        expect(getHour()).toBeInTheDocument();
        expect(getPrice()).toBeInTheDocument();
        expect(getBtnSubmit()).toBeInTheDocument();
    });
    it('check if when tthe form was submited execute the function create', async () => {
        await act(async () => {
            render(
                <StudentForm
                    editing={null}
                    setEditing={onSetEdition}
                    handleCreate={onHandleCreate}
                    handleUpdate={onHandleUpdate}
                />,
            );
        });
        fireEvent.input(getFirstName(), {
            target: { value: 'Cassiano' },
        });
        fireEvent.input(getLastName(), {
            target: { value: 'Scheidemantel' },
        });
        fireEvent.input(getBirthday(), {
            target: { value: '2001-02-01' },
        });
        fireEvent.input(getCourse(), {
            target: { value: 'React Native Advanced' },
        });
        fireEvent.input(getHour(), {
            target: { value: 100 },
        });
        fireEvent.input(getPrice(), {
            target: { value: 110.22 },
        });
        await act(async () => {
            fireEvent.submit(getForm());
        });
        expect(onHandleCreate).toHaveBeenCalled();
    });
    it('check if when the form was submited execute the function update', async () => {
        await act(async () => {
            render(
                <StudentForm
                    editing={editionData}
                    setEditing={onSetEdition}
                    handleCreate={onHandleCreate}
                    handleUpdate={onHandleUpdate}
                />,
            );
        });
        await act(async () => {
            fireEvent.submit(getForm());
        });
        expect(onHandleUpdate).toHaveBeenCalled();
    });
});
