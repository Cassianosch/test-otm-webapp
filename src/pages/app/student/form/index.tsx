import React, { useCallback, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Text, useToast } from '@chakra-ui/react';
import * as yup from 'yup';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StudentData, StudentFormData } from '../../../../interfaces/student';
import { FormInput } from '../../../../components/Form/Input';
import { FormInputCurrency } from '../../../../components/Form/Input/Currency';
// import { FormSelect } from '../../../../components/Form/Select';
import { extractCurrencyInputValue } from '../../../../utils/helpers';

const studentFormSchema: yup.SchemaOf<StudentFormData> = yup.object().shape({
    first_name: yup.string().required('First name is mandatory'),
    last_name: yup.string().required('Last name is mandatory'),
    birthday: yup.string().required('Birthday is mandatory'),
    course: yup.string().required('Course is mandatory'),
    hour: yup.number().min(1).required('Hour is mandatory'),
    price: yup
        .number()
        .min(0.01)
        .required('Price is mandatory')
        .typeError('Price is mandatory'),
});

interface StudentFormProps {
    editing: StudentData | null;
    setEditing: React.Dispatch<React.SetStateAction<StudentData | null>>;
    handleCreate(values: StudentFormData): Promise<void>;
    handleUpdate(id_master: number, values: StudentFormData): Promise<void>;
}

export const StudentForm = (props: StudentFormProps): JSX.Element => {
    const { editing, setEditing, handleCreate, handleUpdate } = props;

    const toast = useToast();

    const {
        register,
        control,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<StudentFormData>({
        resolver: yupResolver(studentFormSchema),
    });

    const handleReset = useCallback(() => {
        reset();
        setValue('first_name', '');
        setValue('last_name', '');
        setValue('birthday', '');
        setValue('course', '');
        setValue('hour', 0);
        setValue('price', 0);
    }, [reset, setValue]);

    const onSubmit = useCallback<SubmitHandler<StudentFormData>>(
        async (data) => {
            try {
                if (editing) await handleUpdate(editing.id, data);
                else await handleCreate(data);

                handleReset();
                setEditing(null);
            } catch (err) {
                toast({
                    status: 'error',
                    title: `Erro`,
                    description: err,
                    isClosable: true,
                });
            }
        },
        [editing, handleCreate, handleReset, handleUpdate, setEditing, toast],
    );

    useEffect(() => {
        if (editing) {
            Object.keys(editing).forEach((key: keyof StudentFormData) => {
                if (key in studentFormSchema.fields) {
                    setValue(key, editing[key]);
                }
            });
        } else reset();
    }, [editing, setValue, reset]);

    const handleChangePrice = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue('price', extractCurrencyInputValue(event.target.value));
        },
        [setValue],
    );

    return (
        <Grid
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            templateColumns="repeat(6, 1fr)"
            gridColumnGap="4"
            gridGap="4">
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="first_name"
                    label="First Name"
                    error={errors.first_name}
                    placeholder="Mary"
                    {...register('first_name')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="last_name"
                    label="Last Name"
                    error={errors.last_name}
                    placeholder="Miller"
                    {...register('last_name')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 3 }}>
                <FormInput
                    name="birthday"
                    label="Birthday"
                    error={errors.birthday}
                    autoComplete="off"
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    {...register('birthday')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    name="course"
                    label="Course"
                    error={errors.course}
                    placeholder="React Complete Advanced"
                    {...register('course')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, sm: 3 }}>
                <FormInput
                    type="number"
                    name="hour"
                    label="Hour"
                    error={errors.hour}
                    placeholder="50"
                    rightContent="H"
                    {...register('hour')}
                />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 3 }}>
                <Controller
                    render={({ field }) => (
                        <FormInputCurrency
                            name="price"
                            label="Price"
                            error={errors.price}
                            {...field}
                            onChange={handleChangePrice}
                        />
                    )}
                    name="price"
                    control={control}
                />
            </GridItem>
            <GridItem colSpan={6}>
                <Flex
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    gridGap="4">
                    {editing && (
                        <Button
                            type="button"
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => setEditing(null)}>
                            <Text fontSize="sm" fontWeight="normal">
                                Cancel edit
                            </Text>
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="form-submit"
                        isLoading={isSubmitting}>
                        <Text>Save</Text>
                    </Button>
                </Flex>
            </GridItem>
        </Grid>
    );
};
