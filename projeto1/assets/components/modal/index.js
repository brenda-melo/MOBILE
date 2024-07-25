import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export function ModalAdd({ addTarefa, fecharModal }) {
  const [novaTarefa, setNovaTarefa] = useState('');

  const handleAddTarefa = () => {
    addTarefa(novaTarefa);
    setNovaTarefa('');
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Adicionar tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a nova tarefa"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTarefa}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={fecharModal}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function ModalDel({ tarefaAtual, delTarefa, fecharModal }) {
  const handleDelTarefa = () => {
    delTarefa();
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Deletar tarefa</Text>
        <TouchableOpacity style={styles.delButton} onPress={handleDelTarefa}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={fecharModal}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function ModalEdit({ tarefaAtual, editTarefa, fecharModal, delTarefa }) {
  const [tarefaEditada, setTarefaEditada] = useState(tarefaAtual.key);

  const handleEditTarefa = () => {
    editTarefa(tarefaEditada);
    setTarefaEditada('');
    fecharModal();
  };

  const handleDelTarefa = () => {
    delTarefa();
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Editar tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a tarefa editada"
          value={tarefaEditada}
          onChangeText={setTarefaEditada}
        />
        <TouchableOpacity style={styles.button} onPress={handleEditTarefa}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.delButton]} onPress={handleDelTarefa}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={fecharModal}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conteudo: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#03989e',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  delButton: {
    backgroundColor: '#ff0000',
  },
});
