// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'take.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class TakeReminderAdapter extends TypeAdapter<TakeReminder> {
  @override
  final int typeId = 0;

  @override
  TakeReminder read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return TakeReminder(
      fields[1] as String,
      fields[3] as bool,
      fields[2] as DateTime,
      fields[0] as String,
    );
  }

  @override
  void write(BinaryWriter writer, TakeReminder obj) {
    writer
      ..writeByte(4)
      ..writeByte(0)
      ..write(obj.title)
      ..writeByte(1)
      ..write(obj.day)
      ..writeByte(2)
      ..write(obj.timer)
      ..writeByte(3)
      ..write(obj.everyday);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is TakeReminderAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
