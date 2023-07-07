import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Auth/reset_password.dart';

class Otp extends StatelessWidget {
  const Otp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Form(
              child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Image.asset(
                logoname,
                height: 250,
                width: 250,
                alignment: Alignment.center,
              ),
              const SizedBox(
                height: 10,
              ),
              const Text(
                "Reset Password",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(
                height: 10,
              ),
              ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 200),
                  child: const Text(
                    "Enter the OTP recieved on your email address.",
                    textAlign: TextAlign.center,
                  )),
              const SizedBox(
                height: 20,
              ),const Text(
                "Enter OTP",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10,),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  OtpFielf(),
                  OtpFielf(),
                  OtpFielf(),
                  OtpFielf(),
                  OtpFielf(),
                  OtpFielf(),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(onPressed: () {}, child: const Text("Resend OTP"))
                ],
              ),
              const SizedBox(
                height: 50,
              ),
              InkWell(
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ResetPassword()));
                },
                child: Container(
                  height: 50,
                  decoration: BoxDecoration(
                    color: const Color(0xFF537FE7),
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: const Center(
                    child: Text("Confirm OTP",style: TextStyle(color: Colors.white,fontSize: 20),),
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
