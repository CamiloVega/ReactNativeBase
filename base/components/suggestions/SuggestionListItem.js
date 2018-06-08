import React from 'react'
import { Text, ImageBackground, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Card from '../general_purpose/Card'
import CardSection from '../general_purpose/CardSection'
import { Rating } from 'react-native-elements';
export default SuggestionListItem = (props) => {
    const { pictures, name, description, rating } = props.suggestion
    const {
        main_container_style,
        picture_style,
        image_container,
        backdrop_view,
        name_container_style,
        record_label_style,
        card_heading_label,
        rating_style
 } = styles
    return (
        <TouchableWithoutFeedback onPress={() => { props.onPress(props.suggestion) }}>
            <View>
                <Card >

                    <View style={main_container_style}>
                        
                            <View style={image_container}>
                                <ImageBackground resizeMode="cover" style={picture_style} source={{ uri: pictures[0] }}>
                                    <View style={backdrop_view}>
                                        <Text style={card_heading_label}>{name}</Text>
                                    </View>
                                </ImageBackground>
                            </View>
                        
                        <CardSection>
                            <View style ={{ flex: 1}}>
                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={rating}
                                ratingBackgroundColor='#7F002F'
                                style={rating_style}
                            />
                            </View>
                        </CardSection>
                        <CardSection>
                            <View style={name_container_style}>
                                <Text style={record_label_style} numberOfLines={2}>
                                    {description}
                                </Text>
                            </View>
                        </CardSection>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    main_container_style: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginBottom: 2,
        alignItems: 'center'
    },
    picture_style: {
        flex: 1,
        height: 250,
        alignSelf: 'stretch',
        width: undefined,
        justifyContent: 'flex-end',
    },
    backdrop_view: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'flex-end',
    },
    image_container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#000000',
    },

    name_container_style: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
        justifyContent: 'center',
    },
    record_label_style: {
        flex: 1,
        textAlign: 'left',
        color: '#505050',
        fontSize: 16,
    },
    card_heading_label: {
        fontSize: 30,
        margin: 15,
        color: '#FFFFFF',
    },
    rating_style: {
        margin: 10,
        
    }
})