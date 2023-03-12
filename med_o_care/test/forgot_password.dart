import 'package:flutter/material.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({super.key});

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  TextEditingController emailcontroller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      body: SingleChildScrollView(
          child: Form(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
            Image.asset(
              "D:\\Flutter_projects\\Med-O-Care\\med_o_care\\assets\\med-o-care_logofont_wobg.png",
              height: 250,
              width: 250,
              alignment: Alignment.center,
            ),
            const SizedBox(
              height: 30,
            ),
            TextFormField(
              keyboardType: TextInputType.emailAddress,
              controller: emailcontroller,
              decoration: const InputDecoration(
                labelText: "Email",
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(50))),
                prefixIcon: Icon(Icons.email),
              ),
            ),
            const SizedBox(
              height: 30,
            ),
          
          ]))),
    ));
  }
}
