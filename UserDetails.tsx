import React, { useState }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

function capitalizeString(input: string): string {
    if (input.length === 0) {
      return input; // Handle empty strings
    }
    
    const firstChar = input.charAt(0).toUpperCase();
    const restOfString = input.slice(1).toLowerCase();
    
    return firstChar + restOfString;
  }

const DetailsScreen = ({ route }) => {
    var [tableData, setTableData] = useState([['user_name'], ['title'], ['date_of_hire'], ['date_of_exit'], ['salary'], ['education'], ['date_of_birth'], ['address']]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { username } = route.params;
    const username_cap = capitalizeString(username);
    const API_URL = 'https://5gwfi2834f.execute-api.us-east-2.amazonaws.com/user_details';
    const detailsUrl = `${API_URL}?user_name=${encodeURIComponent(username)}`;
    const request = new XMLHttpRequest();
    var jsonObject: string[] = [];
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        console.log('not ready');
        return;
      }
    
      if (request.status === 200) {
        jsonObject = JSON.parse(request.responseText);
        console.log('Received Data:', jsonObject);
        for (const items of jsonObject) {
              var index=0;
              for (const item of items) {
                  tableData[index].push(item);
                  index = index + 1;
              }
          }
        console.log('transposed table Data:', tableData);
        setTableData(tableData);
        setDataLoaded(true);
      } else {
        alert('Server Error');
      }
    };
    // console.log('sent request:', detailsUrl);
    request.open('GET', detailsUrl);
    request.send();



  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {username_cap} to the EETECH</Text>
      {dataLoaded ? (
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Rows data={tableData} />
        </Table>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: 'pink',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'cursive',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  headText: { fontWeight: 'bold' },
  rowText: { textAlign: 'center' },
});

export default DetailsScreen;
