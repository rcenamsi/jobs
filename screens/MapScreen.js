import React, {Component} from 'react';
import {View} from 'react-native';
import {MapView} from 'expo';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {searchJobs} from '../actions';

class MapScreen extends Component {

    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({tintColor}) => {
            return <Icon name={'my-location'} size={30} color={tintColor}/>
        }
    };

    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09,
        }
    };

    onRegionChangeComplete = (region) => {
        this.setState({region});
    };

    render() {

        return (
            <View style={{flex: 1}}>
                <MapView
                    style={{flex: 1}}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.search}>
                    <Button
                        large
                        title={'Search Jobs Here'}
                        onPress={this.searchJobs}
                        backgroundColor={'#009688'}
                        icon={{name: 'search'}}
                    />
                </View>
            </View>
        )
    }

    searchJobs = () => {
        this.props.searchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }
}

const styles = {
    search: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    }
};

export default connect(null, {searchJobs})(MapScreen);
