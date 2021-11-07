import { useCallback, useState } from 'react';
import { StudentFormData, StudentData } from '../interfaces/student';
import { studentServices } from '../services/student';
import useCustomToast from './useCustomToast';

interface useStudentHookData {
    rows: StudentData[];
    handleGetRows(): Promise<void>;
    handleCreate(values: StudentFormData): Promise<void>;
    handleUpdate(id: number, values: StudentFormData): Promise<void>;
    handleDelete(id: number): Promise<void>;
}

export default (): useStudentHookData => {
    const [rows, setRows] = useState<StudentData[]>([]);

    const { showErrorToast, showSuccessToast } = useCustomToast();

    const { _getAll, _create, _update, _delete } = studentServices();

    const handleGetRows = useCallback(async () => {
        try {
            const data = await _getAll();

            setRows(data);
        } catch (err) {
            showErrorToast(err);
        }
    }, [_getAll, showErrorToast]);

    const handleCreate = useCallback(
        async (values: StudentFormData) => {
            try {
                await _create(values);

                await handleGetRows();

                showSuccessToast('Student successfully created');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_create, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleUpdate = useCallback(
        async (id: number, values: StudentFormData) => {
            try {
                await _update({ id, data: values });

                await handleGetRows();

                showSuccessToast('Student successfully updated');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_update, handleGetRows, showErrorToast, showSuccessToast],
    );

    const handleDelete = useCallback(
        async (id: number) => {
            try {
                await _delete(id);
                await handleGetRows();

                showSuccessToast('Student successfully deleted');
            } catch (err) {
                showErrorToast(err);
            }
        },
        [_delete, handleGetRows, showErrorToast, showSuccessToast],
    );

    return {
        rows,
        handleGetRows,
        handleCreate,
        handleUpdate,
        handleDelete,
    };
};
