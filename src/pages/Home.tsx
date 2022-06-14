import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const toDoTeste = tasks.find((element) => element.title === newTaskTitle)

    if(toDoTeste) {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }

      setTasks(oldState => [...oldState, data])
    }
    //TODO - add new task
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find((element => element.id === id))

    if(!foundItem) 
      return;
      // Se ele não retornar o found item, ele já retorna
      // Essa linha previne o "retorno", caso não encontre nada, assim, não dara erro se for 'nulo'

      foundItem.done = !foundItem.done;
      setTasks(updatedTasks)
      console.log(tasks)
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => setTasks(oldState => oldState.filter(element => element.id !== id)) }
      ]
    ); 
    // COLOQUEI UM ALERT
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})