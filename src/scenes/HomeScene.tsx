import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

import Dropzone, { FileWithPreview } from '../core-ui/Dropzone';
import { colors, fonts } from '../constants/theme';
import { Button } from '../core-ui';

type Navigation = 'Upload' | 'Result';
type UploadResponse = {
  urlInputs: '';
  urlOutputs: '';
};

export default function HomeScene() {
  let [source, setSource] = useState<FileWithPreview | null>(null);
  let [isLoading, setIsLoading] = useState(false);
  let [navigation, setNavigation] = useState<Navigation>('Upload');
  let [response, setResponse] = useState<UploadResponse | null>(null);

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
      setResponse(result);
      setNavigation('Result');
    } catch (err) {
      throw new Error(err);
    }
  };

  let navigateToUpload = useCallback(() => setNavigation('Upload'), []);

  useEffect(() => {
    if (navigation === 'Upload') {
      setResponse(null);
      setSource(null);
    }
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.misc.loadingIndicator} size="large" />
        <Text style={[styles.text, styles.loadingText]}>
          Detecting Object...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {navigation === 'Upload' ? 'Upload Files' : 'Detection Result :'}
      </Text>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContainer}>
          {navigation === 'Upload' ? (
            <Dropzone
              bottomNote="** File must be in .jpg, .png, .jpeg format"
              type="image"
              containerStyle={{ width: '100%', height: 400 }}
              source={source}
              getPreview={setSource}
            />
          ) : (
            <Image
              source={{ uri: response?.urlOutputs }}
              style={{
                width: '100%',
                height: 400,
                borderWidth: 2,
                borderColor: colors.border.primary,
              }}
            />
          )}
        </View>
        <View style={styles.rightContainer}>
          <Text
            style={[styles.text, styles.fileName]}
            numberOfLines={2}
            ellipsizeMode="middle"
          >
            {source?.file.name || 'No Files Attached.'}
          </Text>
          {navigation === 'Upload' ? (
            <Button
              mode="secondary"
              title="Upload"
              style={styles.uploadBtn}
              onPress={onSubmit}
              disabled={!source}
            />
          ) : (
            <Button
              title="Detect more Istar Object"
              style={styles.resultBtn}
              onPress={navigateToUpload}
            />
          )}
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
  resultBtn: {
    height: 50,
  },
  loadingContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  loadingText: {
    textAlign: 'center',
    color: colors.text.primary,
    fontSize: fonts.sizes.xLarge,
    marginTop: 20,
  },
});
