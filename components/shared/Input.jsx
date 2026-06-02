import { Text, TextInput, View } from 'react-native'; // ✅ ADDED

export default function Input({placeholder, password=false, onChangeText, label=''}) {
    return(
        <View style={{
            marginTop:15,
            width:'100%'
        }}>
            <Text style={{
                fontWeight:'500', 
                fontSize: 18// ✅ FIXED
            }}>
                {label}
            </Text>

            <TextInput
                placeholder={placeholder}
                secureTextEntry={password}
                onChangeText={onChangeText}   // ✅ SIMPLIFIED
                style={{
                    padding:15,
                    borderWidth:1,
                    borderRadius:10,
                    fontSize:18,
                    paddingVertical:20,
                    width:'100%',
                    marginTop:2
                }}
            />
        </View>
    )
}