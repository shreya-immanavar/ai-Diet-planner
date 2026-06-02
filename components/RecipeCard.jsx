import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Fire02Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import Colors from '../shared/Colors';

export default function RecipeCard({ recipe }) {
    const recipeJson = recipe?.jsonData;
    return (
        <Link href={'/recipe-detail?recipeId=' + recipe?._id} asChild>
            <TouchableOpacity style={styles.cardContainer}>
                <Image source={{ uri: recipe?.imageUrl }} style={styles.image} />
                
                <View style={styles.contentContainer}>
                    <Text style={styles.recipeName} numberOfLines={2}>
                        {recipe?.recipeName}
                    </Text>
                    
                    <View style={styles.statsRow}>
                        <View style={styles.infoContainer}>
                            <HugeiconsIcon icon={Fire02Icon} color={Colors.PRIMARY} size={16}/>
                            <Text style={styles.infoText}>{recipeJson?.calories} kCal</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <HugeiconsIcon icon={Clock01Icon} color={Colors.PRIMARY} size={16}/>
                            <Text style={styles.infoText}>{recipeJson?.cookTime} Min</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        margin: 6,
        height: 230, // Force absolute uniform sizing
        backgroundColor: Colors.WHITE,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
        backgroundColor: Colors.LIGHT_GRAY,
    },
    contentContainer: {
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
    },
    recipeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.DARK,
        marginBottom: 8,
        lineHeight: 22,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Spread them out evenly instead of using gap
        alignItems: 'center',
        marginTop: 'auto',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center'
    },
    infoText: {
        fontSize: 11, // Reduced slightly to ensure it fits perfectly
        color: Colors.GRAY,
        fontWeight: '600' // Make it slightly bolder for readability since it's smaller
    }
}
)