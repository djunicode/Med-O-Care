import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:intl/intl.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Screens/myprofile.dart';
import 'login.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  var items = [
    'Male',
    'Female',
    'Others',
  ];
  String password = '';
  bool pass1 = true;
  bool pass2 = true;
  String errorMessage = '';
  final _formkey = GlobalKey<FormState>();
  TextEditingController emailcontroller = TextEditingController();
  TextEditingController passcontroller = TextEditingController();
  TextEditingController repasscontroller = TextEditingController();
  TextEditingController usercontroller = TextEditingController();
  TextEditingController dobcontroller = TextEditingController();
  TextEditingController phonecontroller = TextEditingController();
  TextEditingController locationcontroller = TextEditingController();
  TextEditingController gendercontroller = TextEditingController();

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
                Row(
                  children: [
                    Flexible(flex: 1, child: Image.asset(logo)),
                    Flexible(flex: 3, child: Image.asset(text))
                  ],
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
                  keyboardType: TextInputType.emailAddress,
                  controller: usercontroller,
                  decoration: const InputDecoration(
                    labelText: "User Name",
                    hintText: 'Enter your name',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(50))),
                    prefixIcon: Icon(Icons.person),
                    fillColor: Colors.white,
                    filled: true,
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                    keyboardType: TextInputType.emailAddress,
                    controller: phonecontroller,
                    decoration: const InputDecoration(
                      labelText: "Phone No",
                      hintText: 'Enter your number',
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(50))),
                      prefixIcon: Icon(Icons.phone),
                      fillColor: Colors.white,
                      filled: true,
                    ),
                    validator: MultiValidator([
                      RequiredValidator(errorText: "   " '*Required'),
                      PatternValidator(r'^[0-9]+$',
                          errorText: 'Enter correct number'),
                      MaxLengthValidator(10, errorText: 'Enter a valid number'),
                      MinLengthValidator(10, errorText: 'Enter a valid number'),
                    ])),
                const SizedBox(
                  height: 30,
                ),
                Row(
                  children: [
                    Flexible(
                      flex: 2,
                      child: TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        controller: dobcontroller,
                        decoration: const InputDecoration(
                          label: Text("Date of Birth"),
                          hintText: 'DD/MM/YYYY',
                          border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50))),
                          fillColor: Colors.white,
                          filled: true,
                        ),
                        readOnly: true,
                        //set it true, so that user will not able to edit text
                        onTap: () async {
                          DateTime? pickedDate = await showDatePicker(
                              context: context,
                              initialDate: DateTime.now(),
                              firstDate: DateTime(1950),
                              //DateTime.now() - not to allow to choose before today.
                              lastDate: DateTime(2100));

                          if (pickedDate != null) {
                            String formattedDate =
                                DateFormat('dd/MM/yyyy').format(pickedDate);
                            setState(() {
                              dobcontroller.text = formattedDate;
                            });
                          } else {}
                        },
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Flexible(
                      flex: 2,
                      child: TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        controller: gendercontroller,
                        readOnly: true,
                        decoration: const InputDecoration(
                          labelText: "Gender",
                          hintText: "Gender",
                          border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50))),
                          suffixIcon: Icon(Icons.arrow_downward_outlined),
                          fillColor: Colors.white,
                          filled: true,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  controller: locationcontroller,
                  decoration: const InputDecoration(
                      labelText: "Location",
                      hintText: 'Location',
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(50))),
                      fillColor: Colors.white,
                      filled: true,
                      prefixIcon: Icon(Icons.location_on),
                      suffixIcon: Icon(Icons.arrow_drop_down_sharp)),
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
                        labelText: "Password",
                        hintText: 'Create password',
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
                          errorText: 'Password must be at least 8 digits long'),
                      PatternValidator(r'(?=.*?[#?!@$%^&*-])',
                          errorText:
                              'Passwords must have at least one special character')
                    ])),
                const SizedBox(
                  height: 30,
                ),
                TextFormField(
                  keyboardType: TextInputType.emailAddress,
                  controller: repasscontroller,
                  obscureText: pass2,
                  decoration: InputDecoration(
                      labelText: "Confirm Password",
                      hintText: 'Enter password',
                      border: const OutlineInputBorder(
                          borderRadius: BorderRadius.all(Radius.circular(50))),
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
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const MyProfile()));
                  },
                  child: Container(
                    height: 50,
                    decoration: BoxDecoration(
                      color: const Color(0xFF537FE7),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: const Center(
                      child: Text(
                        "SignUp",
                        style: TextStyle(color: Colors.white, fontSize: 20),
                      ),
                    ),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("Alredy have an account?"),
                    TextButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const LoginScreen()));
                        },
                        child: const Text("Sign In!"))
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
