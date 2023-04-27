import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Auth/forgot_password.dart';
import 'package:med_o_care/View/Auth/services/auth_service.dart';
import 'package:med_o_care/View/Auth/sign_up.dart';
import 'package:med_o_care/View/Screens/home.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController emailcontroller = TextEditingController();
  TextEditingController passcontroller = TextEditingController();
  bool pass = true;
  bool rememberMe = false;
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
                  logoname,
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
                TextFormField(
                  obscureText: pass,
                  keyboardType: TextInputType.text,
                  controller: passcontroller,
                  decoration: InputDecoration(
                    labelText: "Password",
                    hintText: 'Enter your password',
                    border: const OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(50))),
                    prefixIcon: const Icon(Icons.lock),
                    fillColor: Colors.white,
                    filled: true,
                    suffixIcon: GestureDetector(
                      onTap: () {
                        setState(() {
                          pass = !pass;
                        });
                      },
                      child: Icon(
                        pass ? Icons.visibility : Icons.visibility_off,
                        color: Colors.black,
                      ),
                    ),
                  ),
                  validator: RequiredValidator(errorText: "   " '*Required'),
                ),
                const SizedBox(
                  height: 20,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Checkbox(
                            value: rememberMe,
                            onChanged: (bool? value) {
                              setState(() {
                                rememberMe = value!;
                              });
                            }),
                        const Text("Remember Me"),
                      ],
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const ForgotPassword()));
                      },
                      child: const Text("Forgot Password?",
                          style: TextStyle(
                            color: Colors.red,
                          )),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 30,
                ),
                InkWell(
                  onTap: () async {
                    if (_formkey.currentState!.validate()) {
                      showDialog(
                          context: context,
                          builder: (context) => Center(
                                child: CircularProgressIndicator(),
                              ));
                      final success = await AuthService().login(
                          emailcontroller.text.trim(),
                          passcontroller.text.trim());
                      Navigator.pop(context);
                      if (success) {
                        Navigator.pushReplacementNamed(context, '/navbar');
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('There seems to be an issue'),
                            duration: Duration(seconds: 3),
                          ),
                        );
                      }
                    }
                  },
                  child: Container(
                    height: 55,
                    decoration: BoxDecoration(
                      color: const Color(0xFF537FE7),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: const Center(
                      child: Text("Log In",
                          style: TextStyle(color: Colors.white, fontSize: 20)),
                    ),
                  ),
                ),
                const Divider(),
                Container(
                  height: 55,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(50),
                      color: Colors.white),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(50),
                    highlightColor: Colors.white,
                    onTap: () {},
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text("LogIn With GOOGLE"),
                          Image.asset(
                            'assets/images/google.png',
                            height: 35,
                          )
                        ]),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Don't have an account?"),
                      TextButton(
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const SignUpScreen()));
                          },
                          child: const Text("Signup"))
                    ],
                  ),
                )
              ])),
        ),
      ),
    );
  }
}
