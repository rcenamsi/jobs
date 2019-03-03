import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component{

    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }

    renderSlides() {
        return this.props.data.map( (slide, index) => {
            return (
                <View key={slide.text} style={[styles.slide, {backgroundColor: slide.color}]}>
                    <Text style={styles.text}>{slide.text}</Text>
                    {this.renderProceedButton(index)}
                </View>
            )
        })
    }

    renderProceedButton(index) {
        if (index === this.props.data.length - 1){
            return <Button title={'Proceed'} onPress={this.props.proceed} buttonStyle={styles.proceed}/>
        }
    }
}

const styles = {
    text: {
        fontSize: 30,
        color: 'white',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
    },
    proceed: {
        marginTop: 15,
    }
};

export default Slides;
