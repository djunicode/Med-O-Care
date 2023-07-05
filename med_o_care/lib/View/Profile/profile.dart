import 'package:flutter/material.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: Center(
        child: ElevatedButton(
          child: const Text("Logout"),
          onPressed: () {
            AuthService().deleteAuthToken();
            Navigator.pushReplacementNamed(context, '/login');
          },
        ),
      ),
    );
  }
}
