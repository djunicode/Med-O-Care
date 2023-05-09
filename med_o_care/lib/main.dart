import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:med_o_care/View/Auth/login.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';
import 'package:med_o_care/View/Screens/home.dart';
import 'package:med_o_care/View/Upload/add_document.dart';

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
          fontFamily: GoogleFonts.poppins().fontFamily,
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
      home: FutureBuilder<String>(
        future: AuthService().getAuthToken(),
        builder: (context, snapshot) {
          if (snapshot.hasData &&
              snapshot.data!.isNotEmpty &&
              snapshot.data != 'no_token') {
            // User is logged in, navigate to home page
            return const Home();
          } else {
            // User is not logged in, navigate to login page
            return const LoginScreen();
          }
        },
      ),
      routes: {
        '/add_files': (context) => const AddDocument(),
        '/navbar': (context) => const Home(),
        '/login': (context) => const LoginScreen(),
      },
    );
  }
}
