import { StudentFormData, StudentData } from '../../interfaces/student';
import { serviceErrorHandler } from '../../utils/helpers';
import api from '../api';

interface _updateParams {
    id: number;
    data: StudentFormData;
}

interface StudentServiceProps {
    _getAll(): Promise<StudentData[]>;
    _create(data: StudentFormData): Promise<void>;
    _update(params: _updateParams): Promise<void>;
    _delete(id_plan: number): Promise<void>;
}

const _getAll = async (): Promise<StudentData[]> => {
    try {
        const { data: plans } = await api.get('student');

        return plans;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _create = async (data: StudentFormData): Promise<void> => {
    try {
        await api.post(`student`, data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _update = async (params: _updateParams): Promise<void> => {
    try {
        await api.patch(`student/${params.id}`, params.data);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _delete = async (id: number): Promise<void> => {
    try {
        await api.delete(`student/${id}`);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const studentServices = (): StudentServiceProps => ({
    _getAll,
    _create,
    _update,
    _delete,
});
