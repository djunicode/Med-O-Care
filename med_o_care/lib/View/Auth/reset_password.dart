import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';
import 'package:med_o_care/View/Auth/services/profile_api.dart';

import '../Screens/home.dart';

class ResetPassword extends StatefulWidget {
  const ResetPassword({super.key});

  @override
  State<ResetPassword> createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  String password = '';
  bool pass1 = true;
  bool pass2 = true;
  final _formkey = GlobalKey<FormState>();
  TextEditingController passcontroller = TextEditingController();
  TextEditingController repasscontroller = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Form(
              key: _formkey,
              autovalidateMode: AutovalidateMode.onUserInteraction,
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
                    height: 30,
                  ),
                  TextFormField(
                      onChanged: (val) => password = val,
                      keyboardType: TextInputType.emailAddress,
                      controller: passcontroller,
                      obscureText: pass1,
                      decoration: InputDecoration(
                          labelText: "Create new Password",
                          hintText: 'Enter new Password',
                          border: const OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50))),
                          prefixIcon: const Icon(Icons.lock),
                          fillColor: Colors.white,
                          filled: true,
                          suffixIcon: GestureDetector(
                            onTap: () {
                              setState(() {
                                pass1 = !pass1;
                              });
                            },
                            child: Icon(
                              pass1 ? Icons.visibility : Icons.visibility_off,
                              color: Colors.black,
                            ),
                          )),
                      validator: MultiValidator([
                        RequiredValidator(errorText: "   " '*Required'),
                        MinLengthValidator(8,
                            errorText:
                                'Password must be at least 8 digits long'),
                        PatternValidator(r'(?=.*?[#?!@$%^&*-])',
                            errorText:
                                'Passwords must have at least one special character')
                      ])),
                  const SizedBox(
                    height: 50,
                  ),
                  TextFormField(
                    keyboardType: TextInputType.emailAddress,
                    controller: repasscontroller,
                    obscureText: pass2,
                    decoration: InputDecoration(
                        labelText: "Confirm Password",
                        hintText: 'Confirm password',
                        border: const OutlineInputBorder(
                            borderRadius:
                                BorderRadius.all(Radius.circular(50))),
                        prefixIcon: const Icon(Icons.lock),
                        fillColor: Colors.white,
                        filled: true,
                        suffixIcon: GestureDetector(
                          onTap: () {
                            setState(() {
                              pass2 = !pass2;
                            });
                          },
                          child: Icon(
                            pass2 ? Icons.visibility : Icons.visibility_off,
                            color: Colors.black,
                          ),
                        )),
                    validator: (val) =>
                        MatchValidator(errorText: 'Passwords do not match')
                            .validateMatch(val!, password),
                  ),
                  const SizedBox(
                    height: 50,
                  ),
                  InkWell(
                    onTap: () {
                      showDialog(
                          context: context,
                          builder: (context) => Center(
                                child: CircularProgressIndicator(),
                              ));
                      AuthService().resetPass(password);
                      Navigator.pop(context);
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const Home()));
                    },
                    child: Container(
                      height: 50,
                      decoration: BoxDecoration(
                        color: const Color(0xFF537FE7),
                        borderRadius: BorderRadius.circular(50),
                      ),
                      child: const Center(
                        child: Text(
                          "Reset Password",
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
