import React, { CSSProperties, useState } from 'react';
import ReactDropzone, { DropzoneProps } from 'react-dropzone';
import {
  StyleSheet,
  Image,
  View,
  StyleProp,
  ImageStyle,
  Text,
  ActivityIndicator,
} from 'react-native';

import { colors, fonts } from '../constants/theme';
import { uploadPlaceholder } from '../../assets';

export type FileWithPreview = { file: File; preview: string };

type Props = DropzoneProps & {
  note?: string;
  type?: 'image';
  source?: FileWithPreview | string | null;
  getPreview?: (withPreview: FileWithPreview) => void;
  loading?: boolean;
  containerStyle?: StyleProp<ImageStyle>;
  imageSize?: {
    height: number;
    width: number;
  };
  maxFileSize?: number;
  bottomNote?: string;
  topNote?: string;
  withBorder?: boolean;
  fileOrientation?: 'landscape' | 'potrait';
};

export default function Dropzone(props: Props) {
  let {
    note,
    source,
    bottomNote,
    getPreview,
    loading,
    fileOrientation = 'potrait',
    containerStyle,
    withBorder = true,
    maxFileSize = 10000000,
    type = 'image',
    imageSize = {
      height: 4032,
      width: 4032,
    },
    ...dropzoneProps
  } = props;
  let [isSizeBigger, setIsSizeBigger] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [errorMessage, setErrorMessage] = useState<string>('');

  let getImageSize = (uri: string) => {
    Image.getSize(
      uri,
      (width, height) => {
        if (uri === '') {
          return;
        }
        if (width > imageSize.width || height > imageSize.height) {
          setIsSizeBigger(true);
        } else {
          setIsSizeBigger(false);
        }
      },
      (error) => {
        setErrorMessage(error);
      },
    );
  };

  return (
    <View>
      <ReactDropzone
        accept={'image/*'}
        multiple={false}
        preventDropOnDocument
        onDrop={(acceptedFiles: Array<File>) => {
          let files = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
          }));
          getPreview && getPreview(files[0]);
        }}
        {...dropzoneProps}
        maxSize={maxFileSize}
      >
        {({ getRootProps, getInputProps }) => {
          let newSource = !!source
            ? typeof source === 'string'
              ? { uri: source }
              : { uri: (source && source.preview) || undefined }
            : undefined;
          let content;
          if (loading) {
            content = <ActivityIndicator />;
          } else if (type === 'image' && newSource) {
            getImageSize(newSource.uri || '');
            content = (
              <Image
                source={{ uri: newSource.uri }}
                style={[
                  styles.preview,
                  {
                    height: 400,
                    width: 600,
                  },
                ]}
                resizeMode="contain"
              />
            );
          } else {
            content = (
              <Image
                source={uploadPlaceholder}
                style={[styles.preview, { height: 100, width: 100 }]}
                resizeMode="contain"
              />
            );
          }
          return withBorder ? (
            <>
              {note && (
                <Text
                  style={[
                    styles.blueText,
                    { marginBottom: 12 },
                    isSizeBigger ? { borderColor: colors.border.error } : {},
                  ]}
                >
                  {note}
                </Text>
              )}
              <div
                {...getRootProps({
                  style: StyleSheet.flatten([
                    styles.root,
                    containerStyle,
                    isSizeBigger
                      ? { borderColor: colors.border.error }
                      : { borderColor: colors.border.primary },
                  ]) as CSSProperties,
                })}
              >
                <input {...getInputProps()} />
                {content}
              </div>
              {bottomNote && (
                <Text
                  style={[
                    styles.blueText,
                    { marginTop: 12 },
                    isSizeBigger ? { color: colors.text.error } : {},
                  ]}
                >
                  {bottomNote}
                </Text>
              )}
            </>
          ) : (
            <>
              <div
                {...getRootProps({
                  style: StyleSheet.flatten([
                    styles.withoutBorder,
                    containerStyle,
                  ]) as CSSProperties,
                })}
              >
                <input {...getInputProps()} />
                <Image
                  source={uploadPlaceholder}
                  style={[styles.preview, { height: 100, width: 100 }]}
                  resizeMode="contain"
                />
                <Text style={styles.blueText}>Upload File</Text>
              </div>
            </>
          );
        }}
      </ReactDropzone>
    </View>
  );
}

const styles = StyleSheet.create({
  withoutBorder: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  root: {
    alignItems: 'center',
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  preview: {
    borderRadius: 4,
  },
  blueText: {
    color: colors.text.link,
    fontSize: fonts.sizes.small,
    fontWeight: '700',
  },
});
