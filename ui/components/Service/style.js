import { StyleSheet, css } from 'aphrodite';

const pulse = {
    '0%': {
        opacity: 1
    },
    '50%': {
        opacity: 0.9
    },
    '100%': {
        opacity: 1
    }
};

const styles = StyleSheet.create({
    defaultState: {
        background: '#eee',
        color: '#000'
    },
    deadState: {
        background: '#FA435C',
        color: '#fff'
    },
    illState: {
        background: '#EDBA13',
        color: '#000'
    },
    healthyState: {
        background: '#4EE67E',
        color: '#000'
    },
    errorState: {
        background: '#000',
        color: '#fff'
    },
    serviceOuter: {
        width: '25%',
        fontWeight: 400,
        paddingLeft: 20
    },
    serviceInner: {
        background: '#000'
    },
    serviceState: {
        padding: 20,
        opacity: 1
    },
    pulse: {
        animationName: pulse,
        animationDuration: '1s',
        animationIterationCount: 3
    },
    pulse2: {
        animationName: pulse,
        animationDuration: '1s',
        animationIterationCount: 3
    },
    lastBeat: {
        fontSize: 10,
        display: 'block'
    }
});

export {styles};
