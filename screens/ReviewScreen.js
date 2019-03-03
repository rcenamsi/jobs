import React, {Component} from 'react';
import {Linking, Platform, ScrollView, Text, View} from 'react-native';
import {Button, Card} from "react-native-elements";
import {connect} from 'react-redux';
import {MapView} from "expo/build/Expo";

class ReviewScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: "Review Jobs",
        headerRight: (
            <Button
                title="Settings"
                onPress={() => {
                    navigation.navigate("settings");
                }}
                backgroundColor='rgba(0, 0, 0, 0)'
                color='rgba(0, 122, 255, 1)'
            />
        ),
        style: {
            marginTop: Platform.OS === 'android' ? 24 : 0,
        },
    });

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        )
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const initialRegion = {
                longitude: job.longitude,
                latitude: job.latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02,
            };

            return (
                <Card key={job.jobkey} title={job.jobtitle}>
                    <View style={{height: 200}}>
                        <MapView
                            scrollEnabled={false}
                            style={{flex: 1}}
                            cacheEnabled={Platform.OS === 'android'}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.header}>
                            <Text style={styles.headerText}>{job.company}</Text>
                            <Text style={styles.headerText}>{job.formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title={'Apply Now'}
                            onPress={() => Linking.openURL(job.url)}
                            style={styles.applyButton}
                        />
                    </View>
                </Card>
            )
        })
    }
}

const styles = {
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10,
    },
    headerText: {
        fontStyle: 'italic',
    },
    applyButton: {
        backgroundColor: '#03A9F4',
    }
};

const mapStateToProps = ({likedJobs}) => {
    return {likedJobs};
};

export default connect(mapStateToProps)(ReviewScreen);
