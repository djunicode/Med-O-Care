import 'dart:convert';
import 'dart:developer';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:med_o_care/View/Auth/otp.dart';
import 'package:med_o_care/View/Auth/reset_password.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../Model/user.dart';

class AuthService extends ChangeNotifier {
  static const String baseUrl = 'https://med-o-care-iedj.onrender.com/user';
  static const String authTokenKey = 'auth_token';
  user? currentUser;
  String? currentUserToken;
  String? forgotPassToken;

  Future<bool> login(String email, String password) async {
    final url = Uri.parse('$baseUrl/login');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'email': email, 'password': password}),
      );
      if (response.statusCode == 200) {
        final token = json.decode(response.body)['token'];
        currentUser = user.fromMap(json.decode(response.body)['data']);
        log(currentUser.toString());
        currentUserToken = token;
        log(token);
        log(currentUser!.email);
        await saveAuthToken(token);
        return true;
      } else {
        log(response.body);
        return false;
      }
    } catch (e) {
      log(e.toString());
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
    log(response.statusCode.toString());
    log(response.body);
    if (response.statusCode == 201) {
      final token = json.decode(response.body)['token'];
      currentUser = user.fromMap(json.decode(response.body)['data']);
      currentUserToken = token;
      log(token);
      log(currentUser!.email);
      await saveAuthToken(token);
      return true;
    } else {
      return false;
    }
  }

  Future<void> forgotPSWD(String email, BuildContext context) async {
    showDialog(
        context: context,
        builder: (context) => Center(
              child: CircularProgressIndicator(),
            ));
    try {
      final response = await http.post(
        Uri.parse("https://med-o-care-hps4.onrender.com/user/forgotPSWD"),
        body: json.encode({'email': email}),
        headers: {'Content-Type': 'application/json'},
      );
      log(response.statusCode.toString());
      log(response.body);
      Navigator.pop(context);
      if (response.statusCode == 200) {
        Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => Otp(
                      email: email,
                    )));
      } else {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("An error occured")));
      }
    } catch (e) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("An error occured")));
    }
  }

  Future<void> verifyOTP(String email, String otp, BuildContext context) async {
    showDialog(
        context: context,
        builder: (context) => Center(
              child: CircularProgressIndicator(),
            ));

    try {
      log(otp);
      final response = await http.post(
        //TODO:
        Uri.parse("https://med-o-care-hps4.onrender.com/user/verifyOTP"),
        body: json.encode({'email': email, 'otp': int.parse(otp)}),
        headers: {'Content-Type': 'application/json'},
      );
      log(response.statusCode.toString());
      log(response.body);
      Navigator.pop(context);
      if (response.statusCode == 200) {
        final token = json.decode(response.body)['token'];
        currentUser = user.fromMap(json.decode(response.body)['data']);
        log(currentUser.toString());
        currentUserToken = token;
        log(token);
        log(currentUser!.email);
        await saveAuthToken(token);
        Navigator.push(context,
            MaterialPageRoute(builder: (context) => const ResetPassword()));
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(json.decode(response.body)['message'])));
      }
    } catch (e) {
      log(e.toString());
      Navigator.pop(context);
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text("An error occured")));
    }
  }

  Future<void> resetPass(String password) async {
    try {
      final token = await getAuthToken();
      final response = await http.patch(
          Uri.parse('https://med-o-care-hps4.onrender.com/user/editUserInfo'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token $token'
          },
          body: json.encode({'password': password}));
      if (response.statusCode == 200) {
        log(response.body);
      } else {
        log(response.body);
      }
    } catch (e) {
      log(e.toString());
    }
  }

  Future<String> getAuthToken() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(authTokenKey);
    currentUserToken = token;
    if (token != null) {
      currentUser = user.fromMap(jsonDecode(prefs.getString('current user')!));
    }
    log(currentUserToken ?? 'no_token');
    return token ?? 'no_token';
  }

  Future<void> saveAuthToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(authTokenKey, token);
    currentUserToken = token;
    await prefs.setString('current user', jsonEncode(currentUser?.toMap()));
  }

  Future<void> deleteAuthToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(authTokenKey);
    await prefs.remove("current user");
    log("DELETED SUCCESSFULLY");
  }
}
