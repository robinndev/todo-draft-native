import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {

  interface Task {
    id: number;
    title: string;
    done: boolean;
  }

  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, data])
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
    
    
    // if(itemTrue) {
    // }
    // setTasks(updatedTasks => updatedTasks.find(element => element.id !== id));
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {

    const found = setTasks(oldState => oldState.filter(element => element.id !== id))
    console.log('LENDO')
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