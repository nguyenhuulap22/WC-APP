import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function SubscriptionScreen() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<string | null>(null);

  const plans = [
    { id: "month", name: "Gói tháng", price: "30.000đ" },
    { id: "year", name: "Gói năm", price: "299.000đ" },
  ];

  const payMethods = [
    {
      id: "momo",
      name: "Ví MoMo",
      icon: "https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png",
    },
    {
      id: "zalopay",
      name: "ZaloPay",
      icon: "https://upload.wikimedia.org/wikipedia/vi/0/09/ZaloPay_Logo.png",
    },
    {
      id: "vnpay",
      name: "VNPay",
      icon: "https://seeklogo.com/images/V/vnpay-logo-6E8C9625C2-seeklogo.com.png",
    },
    {
      id: "atm",
      name: "Thẻ ATM / Visa",
      icon: "https://cdn-icons-png.flaticon.com/512/482/482542.png",
    },
    {
      id: "bank",
      name: "Chuyển khoản ngân hàng",
      icon: "https://cdn-icons-png.flaticon.com/512/483/483947.png",
    },
  ];

  const handlePayment = () => {
    if (!selectedPlan || !payMethod) {
      alert("Vui lòng chọn gói dịch vụ và hình thức thanh toán");
      return;
    }

    alert(
      `Thanh toán thành công!\nGói: ${selectedPlan}\nPhương thức: ${payMethod}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn gói dịch vụ</Text>

      {/* Chọn gói dịch vụ */}
      {plans.map((p) => (
        <TouchableOpacity
          key={p.id}
          style={[styles.planBox, selectedPlan === p.id && styles.activeBox]}
          onPress={() => setSelectedPlan(p.id)}
        >
          <Text style={styles.planName}>{p.name}</Text>
          <Text style={styles.planPrice}>{p.price}</Text>
        </TouchableOpacity>
      ))}

      {/* Hiện phương thức thanh toán chỉ sau khi chọn gói */}
      {selectedPlan && (
        <>
          <Text style={styles.subtitle}>Chọn hình thức thanh toán</Text>

          {payMethods.map((pm) => (
            <TouchableOpacity
              key={pm.id}
              style={[
                styles.methodBox,
                payMethod === pm.id && styles.activePayBox,
              ]}
              onPress={() => setPayMethod(pm.id)}
            >
              <Image source={{ uri: pm.icon }} style={styles.icon} />
              <Text style={styles.methodText}>{pm.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Nút thanh toán */}
          <TouchableOpacity
            style={[
              styles.confirmBtn,
              !payMethod && { backgroundColor: "#9bbdf6" },
            ]}
            disabled={!payMethod}
            onPress={handlePayment}
          >
            <Text style={styles.confirmText}>Thanh toán</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  planBox: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  activeBox: {
    borderColor: "#2563eb",
    backgroundColor: "#e6efff",
  },
  planName: { fontSize: 18, fontWeight: "600" },
  planPrice: { fontSize: 16, color: "#555", marginTop: 5 },

  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },

  methodBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  activePayBox: {
    borderColor: "#2563eb",
    backgroundColor: "#e6efff",
  },

  icon: { width: 32, height: 32, marginRight: 12 },
  methodText: { fontSize: 17 },

  confirmBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  confirmText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
