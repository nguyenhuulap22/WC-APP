import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function WalletPaymentScreen({ navigation }: any) {
  const [method, setMethod] = useState<string | null>(null);

  const paymentMethods = [
    { id: "momo", name: "Ví MoMo", icon: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" },
    { id: "zalopay", name: "ZaloPay", icon: "https://upload.wikimedia.org/wikipedia/vi/0/09/ZaloPay_Logo.png" },
    { id: "vnpay", name: "VNPay", icon: "https://seeklogo.com/images/V/vnpay-logo-6E8C9625C2-seeklogo.com.png" },
    { id: "atm", name: "Thẻ ATM / Visa", icon: "https://cdn-icons-png.flaticon.com/512/482/482542.png" },
    { id: "bank", name: "Chuyển khoản ngân hàng", icon: "https://cdn-icons-png.flaticon.com/512/483/483947.png" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán qua ví điện tử</Text>

      {paymentMethods.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.method,
            method === item.id && styles.active,
          ]}
          onPress={() => setMethod(item.id)}
        >
          <Image source={{ uri: item.icon }} style={styles.icon} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.payBtn, { opacity: method ? 1 : 0.5 }]}
        disabled={!method}
        onPress={() => {
          alert(`Thanh toán bằng ${method} thành công!`);
          navigation.goBack();
        }}
      >
        <Text style={styles.payText}>Xác nhận thanh toán</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  method: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  active: {
    borderColor: "#2563eb",
    backgroundColor: "#e6efff",
  },
  icon: { width: 32, height: 32, marginRight: 12 },
  text: { fontSize: 17 },
  payBtn: {
    backgroundColor: "#2563eb",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
  },
  payText: {
    color: "white",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
});
