import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:med_o_care/View/Auth/otp.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({super.key});

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  TextEditingController emailcontroller = TextEditingController();
  final _formkey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Form(
              key: _formkey,
              autovalidateMode: AutovalidateMode.onUserInteraction,
              child:
                  Column(mainAxisAlignment: MainAxisAlignment.start, children: [
                Image.asset(
                  'assets/images/med-o-care_logofont_wobg.png',
                  height: 250,
                  width: 250,
                  alignment: Alignment.center,
                ),
                const Text(
                  "Reset Password",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text("Confirm your Email address to recieve an OTP"),
                const SizedBox(
                  height: 20,
                ),
                TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  controller: emailcontroller,
                  decoration: const InputDecoration(
                    labelText: "Confirm Email",
                    hintText: 'Enter your email',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(50))),
                    prefixIcon: Icon(Icons.email),
                    fillColor: Colors.white,
                    filled: true,
                  ),
                  validator: MultiValidator([
                    EmailValidator(
                        errorText: "  " 'Please enter a valid email address'),
                    RequiredValidator(errorText: "    " '*Required')
                  ]),
                ),
                const SizedBox(
                  height: 30,
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => const Otp()));
                  },
                  child: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      color: const Color(0xFF537FE7),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: const Center(
                      child: Text("Send OTP",style: TextStyle(color: Colors.white,fontSize: 20),),
                    ),
                  ),
                ),
              ])),
        ),
      ),
    );
  }
}
