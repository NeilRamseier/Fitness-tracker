import { format } from "date-fns";
import React from "react";
import { View, Text } from "react-native";
import { Button, useTheme } from 'react-native-paper';
import { de, registerTranslation, DatePickerModal } from 'react-native-paper-dates';
registerTranslation('de', de)

export default function CalendarScreen() {
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = (params: any) => {
    setOpen(false);
    setDate(params.date);
  };

  const formattedDate = date ? format(date, 'dd.MM.yyyy') : ''; 


  return (
    <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button mode="outlined" textColor={theme.colors.secondary} onPress={() => setOpen(true)} style={{
        borderColor: theme.colors.secondary,
        width: 182,
        height: 50,
        marginTop: 50,
        marginBottom: 20
      }}>Wähle ein Datum aus</Button>
      <DatePickerModal
        presentationStyle="pageSheet"
        locale="de"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />

      {date && (
        <Text style={{ marginTop: 20, fontSize: 16, color: theme.colors.secondary }}>
          Keine Daten vom {formattedDate}
        </Text>
      )}
    </View>
  );
}
