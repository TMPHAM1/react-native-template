import { View, Text, ScrollView, Image, Alert } from 'react-native'
import {useState} from 'react'
import { SafeAreaView, router } from 'react-native-safe-area-context'
import {Link} from 'expo-router';
import {useGlobalContext} from "../../context/GlobalProvider"

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const  submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }
    setIsSubmitting(true);
    try {
    const result = await createUser(form.email, form.password, form.username); 
    setUser(result);
    setIsLoggedIn(true);
    // set to global state
    router.replace('/home')
  }
    catch (error) {
      Alert.alert('Error', error.message);
    }
    finally {
      setIsSubmitting(false);
    }
  }
  return (
 <SafeAreaView className="bg-primary h-full">
  <ScrollView>
    <View className="w-full justify-center h-full px-6  my-6">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="w-[115px] h-[35px]"
      />
      <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
        Sign-Up for Aora
      </Text>
      <FormField
        title="Username"
        value={form.username}
        handleChangeText={(e) => setForm({...form, username: e})}
        otherStyles="mt-10"
        keyboardType="text"
        placeholder="Enter Username"
      />
      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setForm({...form, email: e})}
        otherStyles="mt-10"
        keyboardType="email-address"
        placeholder="Enter Email Address"
      />
      <FormField
        title="Password"
        value={form.password}
        handleChangeText={(e) => setForm({...form, password: e})}
        otherStyles="mt-7"
        keyboardType="password"
        placeholder="Enter Password"
        showPassword={true}
      />
      <CustomButton
      title="Sign Up"
      handlePress={submit}
      containerStyles="mt-7"
      isLoading={isSubmitting}
    />
    <View className="justify-center pt-5 flex-row gap-2">
      <Text className="text-lg text-gray-100 font-pregular">
        <Link href="/sign-in">Have an account already?</Link>
      </Text>
    </View>
    </View>
    
  </ScrollView>
 </SafeAreaView>
  )
}

export default SignUp