import 'package:flutter/material.dart';
import 'View/Auth/sign_up.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'MedOCare',
      theme: ThemeData(
          scaffoldBackgroundColor: const Color(0xFFE9F8F9),
          inputDecorationTheme: const InputDecorationTheme(
            enabledBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF82AAE3)),
                borderRadius: BorderRadius.all(Radius.circular(50))),
            focusedBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xFF537FE7)),
                borderRadius: BorderRadius.all(Radius.circular(50))),
            errorBorder: OutlineInputBorder(
                borderSide: BorderSide(color: Color(0xA6AF0D0D)),
                borderRadius: BorderRadius.all(Radius.circular(50))),
          )),
      home: const SignUpScreen(),
    );
  }
}
