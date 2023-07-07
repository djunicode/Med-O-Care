import 'dart:convert';
import 'dart:developer';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../../Model/user.dart';

class AuthService {
  static const String baseUrl = 'https://med-o-care.onrender.com/user';
  static const String authTokenKey = 'auth_token';
  user? currentUser;

  Future<bool> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    if (response.statusCode == 200) {
      final token = json.decode(response.body)['token'];
      currentUser = user.fromMap(json.decode(response.body)['data']);
      log(currentUser.toString());
      log(token);
      await saveAuthToken(token);
      return true;
    } else {
      log(response.body);
      return false;
    }
  }

  Future<bool> signup(user newUser) async {
    final url = Uri.parse('$baseUrl/signup');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: json.encode(newUser.toMap()),
    );

    if (response.statusCode == 201) {
      final token = json.decode(response.body)['token'];
      currentUser = user.fromMap(json.decode(response.body)['data']);
      print(response.statusCode);
      log(token);
      await saveAuthToken(token);
      return true;
    } else {
      return false;
    }
  }

  Future<String> getAuthToken() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(authTokenKey);
    if (token != null) {
      currentUser = user.fromMap(jsonDecode(prefs.getString('current user')!));
      log(currentUser!.fName);
    }
    log(token ?? 'no_token');
    return token ?? 'no_token';
  }

  Future<void> saveAuthToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(authTokenKey, token);
    await prefs.setString('current user', jsonEncode(currentUser?.toMap()));
  }

  Future<void> deleteAuthToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(authTokenKey);
    await prefs.remove("current user");
  }
}
