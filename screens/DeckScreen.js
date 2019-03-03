import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button, Icon} from 'react-native-elements';
import Swipe from '../components/Swipe';
import {MapView} from 'expo';
import {likedJob} from '../actions';

class DeckScreen extends Component{

    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({tintColor}) => {
            return <Icon name={'description'} size={30} color={tintColor}/>
        }
    };

    renderCard = (job) => {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02,
        };

        return (
            <Card title={job.jobtitle}>
                <View style={{height: 300}}>
                    <MapView
                        scrollEnabled={false}
                        style={{flex: 1}}
                        cacheEnabled={Platform.OS === 'android'}
                        initialRegion={initialRegion}
                    />
                </View>
                <View style={styles.header}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
            </Card>
        );
    };

    renderNoMoreCards = () => {
        return (
            <Card title={'No more jobs'} >
                <Button
                    title={'Search Again'}
                    onPress={() => this.props.navigation.navigate('map')}
                    large
                    backgroundColor={'#03A9F4'}
                    icon={{name: 'my-location'}}
                />
            </Card>
        );
    };

    render() {
        return (
            <View>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    renderNoMoreCards={this.renderNoMoreCards}
                    keyProp={'jobkey'}
                    onSwipeRight={job => this.props.likedJob(job)}
                    style={{marginTop: 10}}
                />
            </View>
        )
    }
}

const styles = {
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
};

const mapStateToProps = ({jobs}) => {
    return {jobs: jobs.results};
};

export default connect(mapStateToProps, {likedJob})(DeckScreen);
