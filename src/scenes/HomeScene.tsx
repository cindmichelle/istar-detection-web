import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReactDropzone, { DropzoneProps } from 'react-dropzone';

import Dropzone, { FileWithPreview } from '../core-ui/Dropzone';

type Props = {};

export default function HomeScene(props: Props) {
  let [source, setSource] = useState<FileWithPreview | null | string>('');

  // return (
  //   <View style={styles.container}>
  //     <Text>Open up App.tsx to start working on your app!</Text>
  //   </View>
  // );
  return (
    <Dropzone
      bottomNote="Size: 200 x 200px .eps format"
      imageSize={{ height: 300, width: 300 }}
      type="image"
      containerStyle={{ height: 200, width: 200 }}
      source={source}
      getPreview={setSource}
    />
  );
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
