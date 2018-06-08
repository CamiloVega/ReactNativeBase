import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    View,
    StyleSheet,
    Image,
    Text,
    ScrollView
} from 'react-native';
import ImageSlider from 'react-native-image-slider';
import CardSection from '../general_purpose/CardSection'
import Card from '../general_purpose/Card'
import Button from '../general_purpose/Button'
import { Rating } from 'react-native-elements';

export class SuggestionView extends Component {
    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        console.log("Sugestion params", params)
        return {
           
            headerStyle: {
                backgroundColor: 'rgba(0,0,0,0.2)',
                position: 'absolute',
                height: 50,
                top: 0,
                left: 0,
                right: 0,
                paddingTop: 15
            },
            headerTintColor: '#fff',
            tabBarOptions: {
            style: {
                backgroundColor: 'orange', // Main color
                borderTopWidth: 24,
                borderTopColor: 'red', // StatusBar color
            },
        }
        }
    }

    render() {
        const { pictures, name, description, rating } = this.props.navigation.state.params.suggestion
        const {
        main_container_style,
            picture_style,
            image_container,
            backdrop_view,
            name_container_style,
            record_label_style,
            card_heading_label,
            rating_style,
            rating_container_style,
            rating_label_style
 } = styles
        console.log(pictures)
        return (
            <View style={styles.main_container}>
                <ScrollView>
                    <View style={picture_style}>
                        <ImageSlider style={image_container} images={pictures} />
                    </View>
                    <View style={backdrop_view}>
                        <Text style={card_heading_label}>{name}</Text>

                        <View style={rating_container_style}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={rating_label_style}>{rating}/5</Text>

                                <Rating
                                    imageSize={15}
                                    readonly
                                    startingValue={rating}
                                    ratingBackgroundColor='#7F002F'
                                    style={rating_style}
                                />
                            </View>
                            <Text style={rating_label_style}>0 Reviews</Text>

                            <Text style={rating_label_style}>2.5 Hours</Text>
                        </View>


                    </View>

                    <View style={name_container_style}>
                        <Text style={record_label_style} >
                            {description}
                            {description}
                        </Text>
                    </View>
                </ScrollView>

                <Button style={{ marginBottom: 10 }}>PLAN A TRIP </Button>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'white'
    },
    main_container_style: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginBottom: 2,
        alignItems: 'center'
    },
    picture_style: {
        flex: 1,
        height: 350,
        alignSelf: 'stretch',
        width: undefined,
        justifyContent: 'flex-end',
    },
    backdrop_view: {

        backgroundColor: 'rgb(30,30,30)',
        justifyContent: 'flex-end',
    },
    image_container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#000000',
    },
    rating_container_style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 15
    },
    name_container_style: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 15,
        marginLeft: 15,
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
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
        color: '#FFFFFF',
    },
    rating_label_style: {
        fontSize: 20,
        color: 'rgb(139,139,139)',
    },
    rating_style: {
        alignSelf: 'flex-start',
        margin: 5,
        backgroundColor: 'rgba(0,0,0,0)'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionView)
