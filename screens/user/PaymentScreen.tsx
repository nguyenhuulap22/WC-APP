import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation<any>(); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn hình thức thanh toán</Text>

      <TouchableOpacity
         style={styles.paymentBtn}
         onPress={() => navigation.navigate("QRPayment")}
      >
        <Ionicons name="qr-code-outline" size={24} color="#fff" />
        <Text style={styles.text}> Thanh toán QR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentBtn}
         onPress={() => navigation.navigate("Subscription")}
      >
        <Ionicons name="card-outline" size={24} color="#fff" />
        <Text style={styles.text}> Gói thường niên</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.openBtn}
        onPress={() => navigation.navigate("QRScanner")}
      >
        <Ionicons name="scan-outline" size={22} color="#fff" />
        <Text style={styles.text}> Quét QR mở cửa</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  paymentBtn: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  openBtn: {
    flexDirection: "row",
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
