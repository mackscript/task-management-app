// import React, {useEffect, useRef, useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import MainLayout from '../../components/layout/MainLayout';
// import {
//   Camera,
//   useCameraDevice,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {Worklets} from 'react-native-worklets-core';

// const AuthWithCamera = props => {
//   const device = useCameraDevice('front');
//   const cameraRef = useRef(null);

//   const [hasPermission, setHasPermission] = useState(false);
//   const [hasFlash, setHasFlash] = useState(false); // Track flash availability
//   const [capturedPhoto, setCapturedPhoto] = useState(null);

//   const requestPermissions = async () => {
//     const cameraPermission = await Camera.requestCameraPermission();
//     const microphonePermission = await Camera.requestMicrophonePermission();

//     if (cameraPermission !== 'authorized') {
//       // Handle permission denial
//     }
//   };

//   useEffect(() => {
//     requestPermissions()
//       .then(res => {
//         setHasPermission(true);
//       })
//       .catch(er => console.log('er', er));
//   }, []);

//   useEffect(() => {
//     if (device) {
//       setHasFlash(device.hasFlash || device.hasTorch);
//     }
//   }, [device]);

//   const takePhoto = async () => {
//     console.log('takePhoto called', hasFlash);
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePhoto({
//           flash: hasFlash ? 'auto' : 'off',
//         });

//         console.log('Photo captured:', photo.path);
//         setCapturedPhoto(photo.path);
//       } catch (error) {
//         console.error('Error capturing photo:', error);
//         Alert.alert('Error', 'Failed to capture photo. Please try again.');
//       }
//     } else {
//       console.warn('Camera reference is null');
//       Alert.alert('Error', 'Camera is not ready. Please try again.');
//     }
//   };
//   //   if (device == null) {
//   //     return <Text>Loading...</Text>;
//   //   }
//   const handleFaceDetection = Worklets.createRunInJsFn(face => {
//     setFaces(face);
//   });
//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     const objects = detectObjects(frame);
//     console.log(`Detected ${objects.length} objects.`);
//   }, []);

//   return (
//     <MainLayout showHeader child={props}>
//       {hasPermission && (
//         <Camera
//           focusable={true}
//           ref={cameraRef}
//           style={StyleSheet.absoluteFill}
//           device={device}
//           frameProcessor={frameProcessor}
//           isActive={true}
//           photo={true} // Enable photo capture
//         />
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
//           <Text style={styles.buttonText}>Capture Photo</Text>
//         </TouchableOpacity>
//       </View>
//       {capturedPhoto && (
//         <View style={styles.previewContainer}>
//           <Text style={styles.previewText}>Captured Photo:</Text>
//           <Image
//             source={{uri: `file://${capturedPhoto.path}`}}
//             style={styles.capturedImage}
//           />
//         </View>
//       )}
//     </MainLayout>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 50,
//     alignSelf: 'center',
//   },
//   captureButton: {
//     width: 150,
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     alignItems: 'center',
//     opacity: 0.7,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   previewContainer: {
//     position: 'absolute',
//     top: 50,
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   previewText: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#fff',
//   },
//   capturedImage: {
//     width: 200,
//     height: 300,
//     borderRadius: 10,
//   },
// });

// export default AuthWithCamera;
