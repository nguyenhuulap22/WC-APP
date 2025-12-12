import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ToiletDetailScreen({ route, navigation }: any) {
  const { toilet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{toilet.name}</Text>

      <Text>🕒 Giờ mở: {toilet.open}</Text>
      <Text>🔒 Giờ đóng: {toilet.close}</Text>

      <Text style={{ marginTop: 10 }}>🛠 Dịch vụ:</Text>
      {toilet.services.map((s: string, i: number) => (
        <Text key={i}>- {s}</Text>
      ))}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Payment")}
      >
        <Text style={styles.btnText}>Sử dụng dịch vụ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Rating")}
      >
        <Text style={styles.btnText}>Đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  button: {
    backgroundColor: "#2563eb",
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
