import Colors from '../../shared/Colors'
import React from "react"
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'

function Button({ title, onPress,icon,loading=false}) {
    return (
        <TouchableOpacity onPress={onPress} disabled={loading} style={{
            padding: 13,
            backgroundColor: Colors.PRIMARY,
            width: '100%',
            borderRadius: 10
        }}>
            {loading ? <ActivityIndicator color={Colors.WHITE} /> : null}
            <Text style={{
                fontSize: 18,
                color: Colors.WHITE,
                textAlign: 'center'
            }}>
               {icon} {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button