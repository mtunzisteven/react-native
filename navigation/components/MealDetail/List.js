import {
    Text,
    View,
    StyleSheet
} from 'react-native';

function Subtitle({ data }){

    return (
        data.map((dataPoint) => (
            <View style={styles.ListItem} key={dataPoint}>
                <Text style={styles.itemText} >{dataPoint}</Text>
            </View>        
        ))
    );
}

export default Subtitle;

const styles = StyleSheet.create({
    ListItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#e2b497'

    },
    itemText: {
        color: '#351401',
        textAlign: 'center'
    }
});