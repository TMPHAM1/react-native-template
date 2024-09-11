import { View, Text, ScrollView, Image } from 'react-native'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Link} from 'expo-router';

import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    setIsSubmitting(true);
    createUser()
    setTimeout(()=> setIsSubmitting(false), 1000)
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
        keyboardType="email-address"
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