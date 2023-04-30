import 'package:flutter/material.dart';
import 'package:med_o_care/Constant/colors.dart';

class MedicineWidget extends StatelessWidget {
  const MedicineWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.14,
      margin: const EdgeInsets.only(top: 20),
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: Colors.white,
          border: Border.all(color: ResourceColors.colorTertiaryLightTheme)),
      padding: const EdgeInsets.all(19),
      child: Row(children: [
        Image.asset("assets/images/Dolo.jpg"),
        const SizedBox(
          width: 9,
        ),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Dolo 650",
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const Text(
                "Pharmeasy",
                style: TextStyle(fontSize: 12),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Rs. 50",
                    style: TextStyle(fontSize: 12),
                  ),
                  Text(
                    "Contains 10 tablets",
                    style: TextStyle(fontSize: 12),
                  )
                ],
              )
            ],
          ),
        )
      ]),
    );
  }
}
