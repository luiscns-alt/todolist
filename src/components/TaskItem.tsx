import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';
import { EditTaskArgs } from '../pages/Home';

import { Task } from './TasksList';

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({
    task,
    toggleTaskDone,
    removeTask,
    editTask,
}: TasksItemProps) {
    const [editingTitle, setEditingTitle] = useState(false);
    const [saveTitle, setSaveItem] = useState(task.title);

    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditingTitle(true);
    }

    function handleCancelEditing() {
        setSaveItem(task.title);
        setEditingTitle(false);
    }

    function handleSubmitEditing() {
        editTask({ taskId: task.id, taskNewTitle: saveTitle });
        setEditingTitle(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editingTitle) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [editingTitle]);

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}>
                    <View
                        style={
                            task.done
                                ? styles.taskMarkerDone
                                : styles.taskMarker
                        }>
                        {task.done && (
                            <Icon name="check" size={12} color="#FFF" />
                        )}
                    </View>

                    <TextInput
                        value={saveTitle}
                        onChangeText={setSaveItem}
                        editable={editingTitle}
                        onSubmitEditing={handleSubmitEditing}
                        style={
                            task.done ? styles.taskTextDone : styles.taskText
                        }
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {editingTitle ? (
                    <TouchableOpacity onPress={handleCancelEditing}>
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleStartEditing}>
                        <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    disabled={editingTitle}
                    onPress={() => removeTask(task.id)}>
                    <Image
                        source={trashIcon}
                        style={{ opacity: editingTitle ? 0.2 : 1 }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoContainer: {
        flex: 1,
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12,
    },
});
