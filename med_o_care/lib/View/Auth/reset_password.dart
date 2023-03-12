import 'package:flutter/material.dart';

import '../Screens/home.dart';

class ResetPassword extends StatelessWidget {
  const ResetPassword({super.key});

  @override
  Widget build(BuildContext context) {
    TextEditingController passcontroller = TextEditingController();
    TextEditingController repasscontroller = TextEditingController();
    return SafeArea(
      child: Scaffold(
        body: SingleChildScrollView(
          child: Form(
              child: Column(
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
                controller: passcontroller,
                decoration: const InputDecoration(
                  labelText: "Password",
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(50))),
                  prefixIcon: Icon(Icons.lock),
                ),
              ),
              const SizedBox(
                height: 50,
              ),
              TextFormField(
                keyboardType: TextInputType.emailAddress,
                controller: repasscontroller,
                decoration: const InputDecoration(
                  labelText: "Password",
                  border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(50))),
                  prefixIcon: Icon(Icons.lock),
                ),
              ),
              const SizedBox(
                height: 50,
              ),
              InkWell(
                onTap: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => const Home()));
                },
                child: Container(
                  height: 50,
                  decoration: BoxDecoration(
                    color: const Color(0xFF537FE7),
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: const Center(
                    child: Text("Reset Password"),
                  ),
                ),
              ),
            ],
          )),
        ),
      ),
    );
  }
}
