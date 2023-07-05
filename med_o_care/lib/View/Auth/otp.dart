import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:med_o_care/Constant/colors.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Auth/reset_password.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';

class Otp extends StatefulWidget {
  final String email;

  const Otp({super.key, required this.email});

  @override
  State<Otp> createState() => _OtpState();
}

class _OtpState extends State<Otp> {
  String? otp;
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
                  child: Text(
                    "Enter the OTP recieved on ${widget.email}.",
                    textAlign: TextAlign.center,
                  )),
              const SizedBox(
                height: 20,
              ),
              const Text(
                "Enter OTP",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(
                height: 10,
              ),
              // const Row(
              //   mainAxisAlignment: MainAxisAlignment.spaceAround,
              //   children: [
              //     OtpFielf(),
              //     OtpFielf(),
              //     OtpFielf(),
              //     OtpFielf(),
              //     OtpFielf(),
              //     OtpFielf(),
              //   ],
              // ),
              OtpTextField(
                textStyle: const TextStyle(color: Colors.black),
                numberOfFields: 6,
                // disabledBorderColor: Colors.grey,
                // cursorColor: AppColors.primaryLight,
                focusedBorderColor: ResourceColors.colorPrimaryLightTheme,
                //set to true to show as box or false to show as dash
                showFieldAsBox: true,
                fieldWidth: 45,

                //runs when every textfield is filled
                onSubmit: (String verificationCode) {
                  otp = verificationCode;
                }, // end onSubmit
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
                  AuthService().verifyOTP(widget.email, otp ?? "", context);
                },
                child: Container(
                  height: 50,
                  decoration: BoxDecoration(
                    color: const Color(0xFF537FE7),
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: const Center(
                    child: Text(
                      "Confirm OTP",
                      style: TextStyle(color: Colors.white, fontSize: 20),
                    ),
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
