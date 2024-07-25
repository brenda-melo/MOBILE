import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ModalAdd, ModalEdit, ModalDel } from './assets/components/modal';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [delModalVisible, setDelModalVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaAtual, setTarefaAtual] = useState(null);

  const addTarefa = (novaTarefa) => {
    setTarefas([...tarefas, { key: novaTarefa, checked: false }]);
  };

  const toggleCheckbox = (index) => {
    const newTarefas = [...tarefas];
    newTarefas[index].checked = !newTarefas[index].checked;
    setTarefas(newTarefas);
  };

  const openEditModal = (index) => {
    setTarefaAtual(index);
    setEditModalVisible(true);
  };

  const openDelModal = (index) => {
    setTarefaAtual(index);
    setDelModalVisible(true);
  };

  const editTarefa = (tarefaEditada) => {
    const newTarefas = [...tarefas];
    newTarefas[tarefaAtual].key = tarefaEditada;
    setTarefas(newTarefas);
    setEditModalVisible(false);
  };

  const delTarefa = () => {
    const newTarefas = [...tarefas];
    newTarefas.splice(tarefaAtual, 1);
    setTarefas(newTarefas);
    setDelModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>
      <StatusBar style="auto" />
      <View style={styles.subcontainer}>
        <Text style={styles.subtitulo}>Tarefas de hoje</Text>
        <Text style={styles.data}>data atual</Text>
        <FlatList
          data={tarefas}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.taskItemContainer,
                item.checked && styles.checkedTaskItemContainer,
              ]}
              onPress={() => toggleCheckbox(index)}
              onLongPress={() => openEditModal(index)}
            >
              <Text
                style={[
                  styles.taskItem,
                  item.checked && styles.checkedTaskItemText,
                ]}
              >
                {item.key}
              </Text>
              <CheckBox
                checked={item.checked}
                onPress={() => toggleCheckbox(index)}
                containerStyle={styles.checkboxContainer}
                checkedIcon='check-circle'
                uncheckedIcon='circle'
                checkedColor="#fff"
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>ADICIONAR TAREFA</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={modalVisible} animationType='fade'>
        <ModalAdd 
          addTarefa={addTarefa} 
          fecharModal={() => setModalVisible(false)} 
        />
      </Modal>
      <Modal visible={delModalVisible} animationType='fade'>
        <ModalDel 
          tarefaAtual={tarefas[tarefaAtual]} 
          delTarefa={delTarefa} 
          fecharModal={() => setDelModalVisible(false)} 
        />
      </Modal>
      <Modal visible={editModalVisible} animationType='fade'>
        <ModalEdit 
          tarefaAtual={tarefas[tarefaAtual]} 
          editTarefa={editTarefa} 
          delTarefa={delTarefa}  // Adicionando a função delTarefa
          fecharModal={() => setEditModalVisible(false)} 
        />
      </Modal>
    </View>
  );
}

const cor1 = "#03989e";
const cor2 = "#79CCD0";
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subcontainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
  },
  titulo: {
    fontSize: 40,
    paddingTop: 50,
  },
  subtitulo: {
    fontSize: 28,
    paddingTop: 10,
  },
  data: {
    fontSize: 13,
    marginBottom: 20,
  },
  list: {
    width: '100%',
    maxHeight: height / 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: cor1,
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 1,
    borderRadius: 25,
    marginVertical: 5,
  },
  taskItem: {
    textAlign: 'center',
    marginRight: 37,
    fontSize: 18,
    flex: 1,
  },
  checkedTaskItemContainer: {
    backgroundColor: cor2,
  },
  checkedTaskItemText: {
    color: '#fff',
  },
});
