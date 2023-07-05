import 'package:flutter/material.dart';
import 'package:form_field_validator/form_field_validator.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:med_o_care/Constant/constants.dart';
import 'package:med_o_care/View/Auth/services/profile_api.dart';

import '../Screens/home.dart';

class EditProfile extends StatefulWidget {
  late String? name;
  int? phone;
  int? height;
  int? weight;
  String? location;
  String? dob;
  String? gender;
  EditProfile(
      {super.key,
      this.name,
      this.dob,
      this.height,
      this.location,
      this.phone,
      this.gender,
      this.weight});

  @override
  State<EditProfile> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  var items = [
    'Male',
    'Female',
    'Others',
  ];
  String password = '';
  String? dobString;
  bool pass1 = true;
  bool pass2 = true;
  String errorMessage = '';
  final _formkey = GlobalKey<FormState>();
  TextEditingController usercontroller = TextEditingController();
  TextEditingController dobcontroller = TextEditingController();
  TextEditingController emailcontroller = TextEditingController();
  TextEditingController locationcontroller = TextEditingController();
  TextEditingController gendercontroller = TextEditingController();
  TextEditingController weightcontroller = TextEditingController();
  TextEditingController heightcontroller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Form(
            key: _formkey,
            autovalidateMode: AutovalidateMode.onUserInteraction,
            child: Column(
              children: [
                SizedBox(
                  height: size.height,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      SizedBox(height: size.height * 0.01625),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          SizedBox(
                            width: size.width * 0.045,
                          ),
                          Image.asset(
                            logo,
                            height: size.height * 0.08125,
                            width: size.height * 0.08125,
                          ),
                        ],
                      ),
                      SizedBox(height: size.height * 0.015),
                      Row(
                        children: [
                          SizedBox(width: size.width * 0.05),
                          IconButton(
                              onPressed: () {
                                Navigator.pop(context);
                              },
                              icon: const Icon(Icons.arrow_back)),
                          const SizedBox(width: 7.5),
                          Container(
                            child: Text('Edit Profile',
                                style: GoogleFonts.poppins(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                )),
                          ),
                        ],
                      ),
                      SizedBox(height: size.height * 0.05125),
                      TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        controller: usercontroller,
                        decoration: const InputDecoration(
                          labelText: "User Name",
                          hintText: 'Enter your new username',
                          border: OutlineInputBorder(
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50))),
                          prefixIcon: Icon(Icons.person),
                          fillColor: Colors.white,
                          filled: true,
                        ),
                        validator: MultiValidator(
                            [RequiredValidator(errorText: "    " '*Required')]),
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
                              borderRadius:
                                  BorderRadius.all(Radius.circular(50))),
                          prefixIcon: Icon(Icons.email),
                          fillColor: Colors.white,
                          filled: true,
                        ),
                        validator: MultiValidator([
                          EmailValidator(
                              errorText:
                                  "  " 'Please enter a valid email address'),
                          RequiredValidator(errorText: "    " '*Required')
                        ]),
                      ),
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
                                prefixIcon: Icon(Icons.calendar_month),
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
                                      DateFormat('dd/MM/yyyy')
                                          .format(pickedDate);

                                  setState(() {
                                    dobString = pickedDate.toIso8601String();
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
                              // initialValue: 'Harsh',
                              keyboardType: TextInputType.emailAddress,
                              controller: gendercontroller,
                              decoration: const InputDecoration(
                                labelText: "Gender",
                                hintText: 'Gender',
                                border: OutlineInputBorder(
                                    borderRadius:
                                        BorderRadius.all(Radius.circular(50))),
                                // prefixIcon: Icon(Icons.female),
                                fillColor: Colors.white,
                                filled: true,
                              ),
                              validator: MultiValidator([
                                RequiredValidator(errorText: "    " '*Required')
                              ]),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      Row(
                        children: [
                          Flexible(
                            flex: 2,
                            child: TextFormField(
                                keyboardType: TextInputType.phone,
                                controller: heightcontroller,
                                decoration: const InputDecoration(
                                  labelText: "Height",
                                  hintText: 'Enter your number',
                                  border: OutlineInputBorder(
                                      borderRadius: BorderRadius.all(
                                          Radius.circular(50))),
                                  prefixIcon: Icon(Icons.boy_rounded),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                                validator: MultiValidator([
                                  RequiredValidator(
                                      errorText: "   " '*Required'),
                                  PatternValidator(r'^[0-9]+$',
                                      errorText: 'Enter correct number'),
                                  MaxLengthValidator(3,
                                      errorText: 'Enter a valid number'),
                                  MinLengthValidator(0,
                                      errorText: 'Enter a valid number'),
                                ])),
                          ),
                          const SizedBox(width: 10),
                          Flexible(
                            flex: 2,
                            child: TextFormField(
                                keyboardType: TextInputType.number,
                                controller: weightcontroller,
                                decoration: const InputDecoration(
                                  labelText: "Weight",
                                  hintText: 'Enter your number',
                                  border: OutlineInputBorder(
                                      borderRadius: BorderRadius.all(
                                          Radius.circular(50))),
                                  prefixIcon: Icon(Icons.boy),
                                  fillColor: Colors.white,
                                  filled: true,
                                ),
                                validator: MultiValidator([
                                  RequiredValidator(
                                      errorText: "   " '*Required'),
                                  PatternValidator(r'^[0-9]+$',
                                      errorText: 'Enter correct number'),
                                  MaxLengthValidator(3,
                                      errorText: 'Enter a valid number'),
                                  MinLengthValidator(0,
                                      errorText: 'Enter a valid number'),
                                ])),
                          )
                        ],
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      Row(
                        children: [
                          SizedBox(width: size.width * 0.0775),
                          InkWell(
                            child: Text('Submit',
                                style: GoogleFonts.poppins(
                                    fontSize: 20,
                                    fontWeight: FontWeight.w700,
                                    color: colorPrimary)),
                            onTap: () {
                              final edited = Profiles().editProfileData(
                                usercontroller.text.trim(),
                                heightcontroller.text.trim(),
                                weightcontroller.text.trim(),
                                emailcontroller.text.trim(),
                                locationcontroller.text.trim(),
                              );

                              Navigator.of(context).pushReplacement(
                                  MaterialPageRoute(
                                      builder: (context) => const Home()));
                            },
                          )
                        ],
                      )
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
