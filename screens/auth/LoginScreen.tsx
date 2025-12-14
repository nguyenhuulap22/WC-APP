import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginProps = {
  navigation: any;
  setRole: (role: "user" | "provider") => void;
};

export default function LoginScreen({ navigation, setRole }: LoginProps) {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"user" | "provider">("user");

  const handleLogin = async () => {
    try {
      const json = await AsyncStorage.getItem("user");
      if (!json) {
        Alert.alert("Thông báo", "Chưa có tài khoản, vui lòng đăng ký trước.");
        return;
      }

      const user = JSON.parse(json);

      const isMatch =
        (emailOrPhone === user.email || emailOrPhone === user.phone) &&
        password === user.password;

      if (!isMatch) {
        Alert.alert("Sai thông tin", "Email / SĐT hoặc mật khẩu không đúng.");
        return;
      }

      // Đăng nhập thành công → vào app với vai trò đã chọn
      setRole(selectedRole);
    } catch (e) {
      console.log(e);
      Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/door-bg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Label WC trên cửa */}
      <View style={styles.wcBox}>
        <Text style={styles.wcText}>WC</Text>
      </View>

      <View style={styles.overlay}>
        {/* Icon + tiêu đề */}
        <Ionicons name="log-in-outline" size={36} color="#ffffff" />
        <Text style={styles.title}>ĐĂNG NHẬP</Text>

        {/* Ô nhập email / sđt */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Email / SĐT"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
        </View>

        {/* Ô nhập mật khẩu */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Chọn vai trò */}
        <View style={styles.roleRow}>
          <TouchableOpacity
            style={[
              styles.roleBtn,
              selectedRole === "user" && styles.roleBtnActive,
            ]}
            onPress={() => setSelectedRole("user")}
          >
            <Ionicons
              name="person-outline"
              size={18}
              color={selectedRole === "user" ? "#fff" : "#111827"}
            />
            <Text
              style={[
                styles.roleText,
                selectedRole === "user" && styles.roleTextActive,
              ]}
            >
              Người dùng
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleBtn,
              selectedRole === "provider" && styles.roleBtnActive,
            ]}
            onPress={() => setSelectedRole("provider")}
          >
            <Ionicons
              name="business-outline"
              size={18}
              color={selectedRole === "provider" ? "#fff" : "#111827"}
            />
            <Text
              style={[
                styles.roleText,
                selectedRole === "provider" && styles.roleTextActive,
              ]}
            >
              Nhà cung cấp
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nút đăng nhập */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>

        {/* Quên mật khẩu / Đăng ký */}
        <View style={styles.footerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot")}
            style={{ paddingVertical: 8 }}
          >
            <Text style={styles.footerText}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{ paddingVertical: 8 }}
          >
            <Text style={styles.footerText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Khung "WC" trên cửa
  wcBox: {
    position: "absolute",
    top: 80,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "#000000aa",
    borderWidth: 2,
    borderColor: "#facc15",
  },
  wcText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  overlay: {
    width: "88%",
    padding: 20,
    borderRadius: 24,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    alignItems: "center",
  },
  title: {
    marginTop: 8,
    marginBottom: 16,
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffcc",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },

  roleRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
  },
  roleBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  roleBtnActive: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },
  roleText: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#111827",
  },
  roleTextActive: {
    color: "#fff",
  },

  loginBtn: {
    marginTop: 16,
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#d97706",
    borderRadius: 999,
    alignItems: "center",
    elevation: 3,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  footerRow: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    color: "#e5e7eb",
    fontSize: 14,
  },
});
