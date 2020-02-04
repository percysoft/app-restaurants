import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    setIsLoading,
    setTexLoading,
    toastReft,
    setReloadData,
    userInfo: { uid, displayName, email, photoURL }
  } = props;

  const changeAvatar = async () => {
    const resulPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermissionsCamera =
      resulPermission.permissions.cameraRoll.status;
    if (resultPermissionsCamera === "denied") {
      toastReft.current.show("Es necesario aceptar los permisos");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        toastReft.current.show(
          "Has cerrado la galeria sin seleccionar ninguna imagen"
        );
      } else {
        uploadImage(result.uri, uid)
          .then(() => {
            updatePhotoUrl(uid);
          })
          .catch(() => {});
      }
    }
  };
  const uploadImage = async (uri, nameImage) => {
    setTexLoading("Actualizando avatar");
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
      .storage()
      .ref()
      .child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = uid => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async result => {
        const update = {
          photoURL: result
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setTexLoading("Actualizando avatar");
        setIsLoading(false);
      })
      .catch(() => {
        toastReft.current.show("Error al recuperar el avatar del servidor");
      });
  };
  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={changeAvatar}
        containerStyle={styles.userInfoAvatar}
        source={{
          uri: photoURL
            ? photoURL
            : "https://api.adorable.io/avatars/207/abott@adorable.pngCopy to Clipboard"
        }}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});
