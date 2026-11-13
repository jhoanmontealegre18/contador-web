import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Registro = { id: string; numero: number; hora: string };

export default function App() {
  const [contador, setContador] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);

  const incrementarContador = () => {
    const nuevoValor = contador + 1;
    const ahora = new Date();
    const hora = [ahora.getHours(), ahora.getMinutes(), ahora.getSeconds()]
      .map((n) => String(n).padStart(2, "0"))
      .join(":");

    setContador(nuevoValor);
    setRegistros((previos) => [
      { id: `${Date.now()}-${nuevoValor}`, numero: nuevoValor, hora },
      ...previos,
    ]);
  };

  const reiniciar = () => {
    setContador(0);
    setRegistros([]);
  };

  const superaDiez = contador > 10;

  return (
    <View style={[estilos.body, superaDiez && estilos.bodyAlerta]}>
      <View style={estilos.card}>
        <Text style={estilos.titulo}>Contador de Likes</Text>
        <Text style={estilos.subtitulo}>
          Toca el botón para sumar un like y registrar la hora exacta.
        </Text>

        <Text style={[estilos.counterBox, superaDiez && estilos.counterAlerta]}>
          {contador}
        </Text>

        <TouchableOpacity style={estilos.btnClick} onPress={incrementarContador}>
          <Text style={estilos.btnText}>¡Dale Like!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.btnReset} onPress={reiniciar}>
          <Text style={estilos.btnResetText}>Reiniciar a cero</Text>
        </TouchableOpacity>

        <View style={estilos.tableContainer}>
          <View style={estilos.tableHeader}>
            <Text style={[estilos.th, estilos.cellNumero]}>Nº Clic</Text>
            <Text style={[estilos.th, estilos.cellHora]}>Hora</Text>
          </View>

          <ScrollView style={estilos.tableBody}>
            {registros.map((item, index) => (
              <View
                key={item.id}
                style={[estilos.tr, index % 2 === 0 && estilos.trEven]}
              >
                <Text style={[estilos.td, estilos.cellNumero]}>{item.numero}</Text>
                <Text style={[estilos.td, estilos.cellHora]}>{item.hora}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#f4f7f6",
    justifyContent: "center",
    padding: 20,
  },
  bodyAlerta: { backgroundColor: "#2c3e50" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  titulo: { fontSize: 24, fontWeight: "800", textAlign: "center", color: "#2c3e50" },
  subtitulo: { fontSize: 14, textAlign: "center", color: "#7f8c8d", marginTop: 6, marginBottom: 16 },
  counterBox: {
    fontSize: 56,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3498db",
    marginVertical: 10,
  },
  counterAlerta: { color: "#f1c40f" },
  btnClick: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  btnReset: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e74c3c",
  },
  btnResetText: { color: "#e74c3c", fontWeight: "600" },
  tableContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableBody: { maxHeight: 170 },
  tr: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  trEven: { backgroundColor: "#fafafa" },
  th: { color: "#7f8c8d", fontWeight: "600", fontSize: 14, padding: 10, textAlign: "center" },
  td: { color: "#333", fontSize: 14, padding: 10, textAlign: "center" },
  cellNumero: { flex: 1 },
  cellHora: { flex: 1.5 },
});