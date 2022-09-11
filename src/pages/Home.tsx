import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
    taskId: number;
    taskNewTitle: string;
};

export function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function handleAddTask(newTaskTitle: string) {
        //TODO - add new task
        const taskAlreadyExists = tasks.find(
            task => task.title === newTaskTitle,
        );

        if (taskAlreadyExists) {
            return Alert.alert(
                'Tarefa já registrada!',
                'Você não pode registrar uma tarefa com o mesmo nome.',
            );
        }

        const newTask = {
            id: new Date().getTime(),
            title: newTaskTitle,
            done: false,
        };

        setTasks(oldTasks => [...oldTasks, newTask]);
    }

    function handleToggleTaskDone(id: number) {
        //TODO - toggle task done if exists
        const updatedTasks = tasks.map(task => ({ ...task }));
        const doneItem = updatedTasks.find(item => item.id === id);

        if (!doneItem) return;
        doneItem.done = !doneItem.done;
        setTasks(updatedTasks);
    }

    function handleRemoveTask(id: number) {
        //TODO - remove task from state
        Alert.alert(
            'Remover item!',
            'Tem certeza de que deseja remover este item?',
            [
                {
                    text: 'Não',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () =>
                        setTasks(oldState =>
                            oldState.filter(task => task.id !== id),
                        ),
                    style: 'destructive',
                },
            ],
        );
    }

    function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
        const updatedTasks = tasks.map(task => ({ ...task }));
        const foundItem = updatedTasks.find(task => task.id === taskId);

        if (!foundItem) return;

        foundItem.title = taskNewTitle;

        setTasks(updatedTasks);
    }

    return (
        <View style={styles.container}>
            <Header tasksCounter={tasks.length} />

            <TodoInput addTask={handleAddTask} />

            <TasksList
                tasks={tasks}
                toggleTaskDone={handleToggleTaskDone}
                removeTask={handleRemoveTask}
                editTask={handleEditTask}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEBEB',
    },
});
