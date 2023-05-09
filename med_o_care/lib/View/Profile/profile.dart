import 'package:flutter/material.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';

class ProfileTemporary extends StatefulWidget {
  const ProfileTemporary({super.key});

  @override
  State<ProfileTemporary> createState() => _ProfileTemporaryState();
}

class _ProfileTemporaryState extends State<ProfileTemporary> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ElevatedButton(
          child: Text("Logout"),
          onPressed: () {
            AuthService().deleteAuthToken();
            Navigator.pushReplacementNamed(context, '/login');
          },
        ),
      ),
    );
  }
}
