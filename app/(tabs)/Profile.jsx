import { View, Text, FlatList, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../shared/Colors'
import { auth } from '../../services/FirebaseConfig'
import { UserContext } from '../../context/UserContext'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { Logout01Icon, Book01Icon } from '@hugeicons/core-free-icons'
import Ionicons from '@expo/vector-icons/Ionicons';

const MenuOptions = [
  {
    title: 'Home',
    ionicons: 'home-outline',
    path: '/(tabs)/Home'
  },
  {
    title: 'My Recipes',
    icon: Book01Icon,
    path: '/(tabs)/Meals'
  },
  {
    title: 'My Progress',
    ionicons: 'stats-chart-outline',
    path: '/(tabs)/Progress'
  },
  {
    title: 'Diet Preferences',
    ionicons: 'settings-outline',
    path: '/preferance'
  },
  {
    title: 'Logout',
    icon: Logout01Icon,
    path: 'logout'
  }
]

export default function Profile() {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter();
  
  const OnMenuOptionClick = (menu) => {
    if (menu.path == 'logout') {
      signOut(auth).then(() => {
        console.log('SIGNOUT')
        setUser(null);
        router.replace('/')
      })
      return;
    }
    router.push(menu?.path)
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <FlatList
        data={MenuOptions}
        contentContainerStyle={{
          padding: 20,
          paddingTop: Platform?.OS == 'ios' ? 40 : 25
        }}
        ListHeaderComponent={
          <View>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold'
            }}>Profile</Text>

            <View style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 15
            }}>
              <Image source={require('./../../assets/images/profile.png')}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 99
                }}
              />
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 5
              }}>{user?.name}</Text>

              <Text style={{
                fontSize: 16,
                color: Colors.GRAY,
                marginTop: 5
              }}>{user?.email}</Text>
            </View>
          </View>
        }
        style={{
          marginTop: 20
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => OnMenuOptionClick(item)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
              padding: 15,
              borderWidth: 0.2,
              marginTop: 5,
              borderRadius: 15,
              backgroundColor: Colors.WHITE,
              elevation: 1
            }}>
            {item.icon ? 
                <HugeiconsIcon icon={item.icon} size={35} color={Colors.PRIMARY} /> :
                <Ionicons name={item.ionicons} size={35} color={Colors.PRIMARY} />
            }
            <Text style={{
              fontSize: 20,
              fontWeight: '300',
              marginLeft: item.icon ? 0 : 5 // add a small margin if ionic icon to balance it
            }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}