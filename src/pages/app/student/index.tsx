import React, { useState, useEffect } from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { Container } from '../../../components/Layout';
import { StudentForm } from './form';
import { Table } from '../../../components/Table';
import { StudentData } from '../../../interfaces/student';
import useStudent from '../../../hooks/useStudent';
import { formatterCurrencyEuro, formatterDate } from '../../../utils/helpers';

export const StudentPage = (): JSX.Element => {
    const [editing, setEditing] = useState<StudentData | null>(null);

    const { rows, handleGetRows, handleCreate, handleUpdate, handleDelete } =
        useStudent();

    useEffect(() => {
        handleGetRows();
    }, [handleGetRows]);

    return (
        <Container title="Student" type="app">
            <Flex direction="column" gridGap="8">
                <Heading fontSize="2xl">Student Edition</Heading>
                <StudentForm
                    editing={editing}
                    setEditing={setEditing}
                    handleCreate={handleCreate}
                    handleUpdate={handleUpdate}
                />
            </Flex>
            <Heading fontSize="2xl">Student List</Heading>
            <Table<StudentData>
                columns={[
                    'id',
                    'first_name',
                    'last_name',
                    'birthday',
                    'course',
                    'hour',
                    'price',
                ]}
                data={rows}
                onClickEdit={(row) => setEditing(row)}
                onClickDelete={({ id }) => handleDelete(id)}
                paginationProps={{ total: 0, current: 1 }}
                customRenderers={{
                    birthday: (value) => (
                        <Text as="span" fontWeight="normal">
                            {formatterDate(value)}
                        </Text>
                    ),
                    hour: (value) => (
                        <Text as="span" fontWeight="normal">
                            {value}H
                        </Text>
                    ),
                    price: (value) => (
                        <Text as="span" fontWeight="normal">
                            {formatterCurrencyEuro.format(Number(value))}
                        </Text>
                    ),
                }}
            />
        </Container>
    );
};
