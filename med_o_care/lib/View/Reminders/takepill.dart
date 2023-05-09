import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class TakePill extends StatelessWidget {
  const TakePill({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Image.asset(
                  "assets/images/med-o-care.png",
                  height: 65,
                  width: 65,
                ),
                IconButton(
                    onPressed: () {},
                    icon: SvgPicture.asset("assets/icons/icon _menu_.svg"))
              ],
            ),
            SizedBox(
              height: 20,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 38.0),
              child: Text(
                'Set Reminder',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
            SizedBox(
              height: 14,
            ),
            TextFormField(keyboardType: TextInputType.emailAddress,
                  //controller: emailcontroller,
                  decoration: const InputDecoration(
                    labelText: "Email",
                    hintText: 'Enter your email',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(50))),
                    prefixIcon: Icon(Icons.email),
                    fillColor: Colors.white,
                    filled: true,
                  ),)

          ]),
        ),
      ),
    );
  }
}
