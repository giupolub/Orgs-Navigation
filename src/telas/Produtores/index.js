import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';
import Texto from '../../componentes/Texto';

export default function Produtores({ melhoresProdutores }) {
  const [exibeMensagem, setExibeMensagem] = useState(false)
  const navigation = useNavigation()
  const route = useRoute()
  const lista = useProdutores(melhoresProdutores);
  const { tituloProdutores, mensagemCompra } = useTextos();

  const nomeCompra = route.params?.compra.nome
  const timeStampCompra = route.params?.compra.timestamp
  const mensagemCompleta = mensagemCompra?.replace('$NOME', nomeCompra)

  useEffect(() => {
    setExibeMensagem(!!nomeCompra)
    let timeout

    if (nomeCompra) {
      timeout = setTimeout(() => {
        setExibeMensagem(false)
      }, 3000)
    }
  }, [timeStampCompra])

  const TopoLista = () => {
    return <>
      <Topo melhoresProdutores={melhoresProdutores} />
      {exibeMensagem && <Texto style={estilos.compra}>{mensagemCompleta}</Texto>}
      <Texto style={estilos.titulo}>{tituloProdutores}</Texto>
    </>
  }

  return <FlatList
    data={lista}
    renderItem={
      ({ item }) => <Produtor
        {...item}
        aoPressionar={() => {
          navigation.navigate("Produtor", item)
        }} />
    }
    keyExtractor={({ nome }) => nome}
    ListHeaderComponent={TopoLista}
    style={estilos.lista} />
}

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },
  compra: {
    backgroundColor: "#EAF5F3",
    fontSize: 16,
    lineHeight: 26,
    padding: 16,
    color: "#464646"
  }
})
