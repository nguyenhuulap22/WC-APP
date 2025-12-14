import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPasswordScreen({ navigation }: any) {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleReset = () => {
    if (!emailOrPhone) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập Email hoặc SĐT.");
      return;
    }

    // Ở đây chỉ giả lập. Nếu làm thật sẽ gọi API gửi mail / SMS.
    Alert.alert(
      "Đã gửi yêu cầu",
      "Nếu tài khoản tồn tại, hệ thống sẽ hướng dẫn đặt lại mật khẩu.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.desc}>
        Nhập Email hoặc SĐT đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.
      </Text>

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color="#9ca3af" />
        <TextInput
          placeholder="Email / SĐT"
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9fafb" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  desc: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
