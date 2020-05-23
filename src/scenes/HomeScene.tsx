import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import Dropzone, { FileWithPreview } from '../core-ui/Dropzone';
import { colors, fonts } from '../constants/theme';
import { Button } from '../core-ui';

type Props = {};

export default function HomeScene(props: Props) {
  let [source, setSource] = useState<FileWithPreview | null>(null);
  let [isLoading, setIsLoading] = useState(false);

  let onSubmit = async () => {
    try {
      let data = new FormData();
      data.append('file', source?.file || '');
      setIsLoading(true);
      let response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: data,
      });

      let result = await response.json();
      setIsLoading(false);
      console.log('response data', result);
    } catch (err) {
      throw new Error(err);
    }
  };

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={colors.misc.loadingIndicator} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Files</Text>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContainer}>
          <Dropzone
            bottomNote="** File must be in .jpg, .png, .jpeg format"
            type="image"
            containerStyle={{ width: '100%', height: 400 }}
            source={source}
            getPreview={setSource}
          />
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[styles.text, styles.fileName]}
            numberOfLines={2}
            ellipsizeMode="middle"
          >
            {source?.file.name || 'No Files Uploaded.'}
          </Text>
          <Button title="Upload" style={styles.uploadBtn} onPress={onSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.misc.background,
    justifyContent: 'center',
    padding: 50,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: colors.text.primary,
    fontSize: fonts.sizes.header,
    marginBottom: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 3,
  },
  rightContainer: {
    justifyContent: 'center',
    paddingLeft: 20,
    flex: 1,
  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
  },
  fileName: {
    marginBottom: 20,
    fontSize: fonts.sizes.medium,
  },
  uploadBtn: {
    width: '70%',
  },
  loadingContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});
