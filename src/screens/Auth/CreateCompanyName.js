import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {Button, Div, Flex, Text, Touch} from '../../components/common/UI';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fontScale} from '../../utils/utils';
import * as Yup from 'yup';
import {OtpInput} from 'react-native-otp-entry';
import {submitCreateCompany} from '../../redux/reducer/OtpVerifySlicer';
import {useToast} from 'react-native-toast-notifications';

const CreateCompanyName = props => {
  const toast = useToast();
  const dispatch = useDispatch();
  const {theme} = useSelector(state => state.theme);
  const {isLoadingCreateCompanyDetails} = useSelector(state => state.otp);

  const [formData, setFormData] = useState({
    companyName: '',
  });
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .max(20, 'Company Name is too long.')
      .min(2, 'Company Name is too short.')
      .required('Company Name is required.'),
  });

  const handleInputChange = (name, value) => {
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    // Validate the entire form every time a field changes
    validationSchema
      .validate(updatedFormData, {abortEarly: false})
      .then(() => {
        setErrors({}); // Clear all errors if valid
      })
      .catch(err => {
        const newErrors = {};
        err.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors); // Set errors for all fields
      });
  };

  const handleSubmitCreateCompanyName = async () => {
    try {
      await validationSchema.validate(formData, {abortEarly: false});

      dispatch(submitCreateCompany(formData))
        .unwrap()
        .then(res => {
          toast.hideAll();
          toast.show(res.status.message, {
            type: 'success',
            placement: 'top',
            offset: 30,
            animationType: 'zoom-in',
          });
          props.navigation.navigate('TabView');
        })
        .catch(err => {
          toast.hideAll();
          toast.show(`${err?.status?.message}`, {
            type: 'error',
            placement: 'top',
            duration: 4000,
            offset: 1000,
            animationType: 'zoom-in',
          });
        });
      //
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, err) => {
          return {...acc, [err.path]: err.message};
        }, {});
        setErrors(formErrors);
        return;
      }
    }
  };
  return (
    <MainLayout showHeader child={props}>
      <KeyboardAvoidingScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode="none"
        style={{flex: 1}}>
        <Div style={style.container}>
          <Text size={30} bold mt={50} color={theme.colors.text.primary}>
            Create a Company Name
          </Text>

          <Div mt={60}>
            <Flex
              middle
              p={Platform.OS == 'ios' ? 10 : 0}
              spaceb
              bw={1}
              br={10}
              pl={10}
              pr={10}
              bg={theme.colors.secondary}
              bc={theme.colors.inputBorder}>
              <TextInput
                placeholderTextColor={theme.colors.text.secondary}
                placeholder="Enter Company Name"
                style={[style.inputStyle, {color: theme.colors.text.primary}]}
                onChangeText={value => handleInputChange('companyName', value)}
                autoCapitalize="none" // Disables automatic capitalization
              />
              <Div>{/* <AppleIcon width={23} height={22} /> */}</Div>
            </Flex>
            <Text color={theme.colors.error} mt={4} size={12}>
              {errors.companyName && errors.companyName}
            </Text>
          </Div>
          <View
          // style={{position: 'absolute', width: '100%', bottom: '10%'}}
          >
            {isLoadingCreateCompanyDetails ? (
              <Button
                mt={100}
                width={'100%'}
                child={
                  <Flex middle center p={0}>
                    <ActivityIndicator size={'small'} color={'#fff'} />
                    <Text
                      ml={10}
                      color={theme.colors.text.inverse}
                      bold
                      size={18}>
                      Confirm
                    </Text>
                  </Flex>
                }></Button>
            ) : (
              <Button
                onPress={() => handleSubmitCreateCompanyName()}
                mt={100}
                width={'100%'}
                child={
                  <Text color={theme.colors.text.inverse} bold size={18}>
                    Confirm
                  </Text>
                }></Button>
            )}
          </View>
        </Div>
      </KeyboardAvoidingScrollView>
    </MainLayout>
  );
};

export default CreateCompanyName;
const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  inputStyle: {
    flex: 1,
    fontSize: 16 / fontScale,
    paddingHorizontal: 6,
  },
});
