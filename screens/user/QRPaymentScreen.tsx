import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function QRPaymentScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán bằng mã QR</Text>

      <Image
        source={{
          uri: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=payment_demo",
        }}
        style={styles.qr}
      />

      <Text style={styles.desc}>
        Quét mã QR bằng MoMo, ZaloPay hoặc App ngân hàng để thanh toán.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  qr: { width: 250, height: 250, marginBottom: 20 },
  desc: { textAlign: "center", color: "#555", marginBottom: 20 },
  btn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
