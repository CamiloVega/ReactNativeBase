import React, { Component } from 'react';

import {
    View,
    ListView, StyleSheet
} from 'react-native';

import { fetchSuggestionList } from '../../redux/actions/SuggestionActions'
import SuggestionListItem from './SuggestionListItem'
import { connect } from 'react-redux'
export class SuggestionListView extends Component {

    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        return {
            title: 'Suggested Places',
        }
    }

    componentWillMount() {
        this.props.fetchSuggestionList()
        this.createNewDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createNewDataSource(nextProps)
    }

    navigateToSuggestion(suggestion) {
        console.log("Suggestion", suggestion)
        this.props.navigation.navigate('SuggestionView', { suggestion })
    }

    renderRow(suggestion) {

        return <SuggestionListItem
            suggestion={suggestion}
            onPress={this.navigateToSuggestion.bind(this)}
        />
    }

    createNewDataSource({ suggestionList }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.dataSource = ds.cloneWithRows(suggestionList)
    }

    render() {
        const { labelStyle, main_container_style, picture_style } = styles
        return (
            <View style={main_container_style}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}>
                </ListView>
            </View>)
    }
}



const styles = StyleSheet.create({
    main_container_style: {
        backgroundColor: '#E1E1E1',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10
    },

    labelStyle: {
        fontSize: 30,
        color: '#717171',
        backgroundColor: 'rgba(0,0,0,0)'
    }
})


function mapStateToProps(state) {
    return {
        suggestionList: state.suggestionList.suggestionList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSuggestionList: () => dispatch(fetchSuggestionList())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SuggestionListView)