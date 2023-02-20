import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

const InvoiceTableRow = ({ items }) => {
    const rows = items.map(item =>
        <View style={styles.row} key={item.sno.toString()}>
            <Text style={styles.description}>{item.desc}</Text>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>{item.rate}</Text>
            <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
        </View>
    );
    return (<Fragment>{rows}</Fragment>)
};

export default InvoiceTableRow;