import React, { Component } from 'react';

import {
    View,
    ListView, StyleSheet
} from 'react-native';

import { fetchUserList } from '../../redux/actions/UserActions'
import UserListItem from './UserListItem'
import { connect } from 'react-redux'
export class UserListView extends Component {

    static navigationOptions = (navigation) => {
        const { params = {} } = navigation.navigation.state;
        return {
          title: 'Registered Users',
        }
      }

    componentWillMount() {
        this.props.fetchUserList()
        this.createNewDataSource(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.createNewDataSource(nextProps)
    }

    renderRow(user) {
        return <UserListItem user={user} />
    }

    createNewDataSource ({userList}) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        
        this.dataSource = ds.cloneWithRows(userList)
    }
 
    render() {
        const { labelStyle, main_container_style, picture_style } = styles
        return (
        <View style={main_container_style}>
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}>
            </ListView>
        </View>)
    }
}



const styles = StyleSheet.create({
    main_container_style: {
        backgroundColor: '#E1E1E1',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 10
    },
   
    labelStyle: {
        fontSize: 30,
        color: '#717171',
        backgroundColor: 'rgba(0,0,0,0)'
    }
})


function mapStateToProps(state) {
    return {
        userList: state.userList.userList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchUserList: () => dispatch(fetchUserList())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserListView)