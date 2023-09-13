import * as React from 'react';
import { WebView } from 'react-native-webview';


export default function WebViewCustom() {
    return (
        <WebView

            originWhitelist={['*']}
            source={{ html: '<h1><center>Hello world</center></h1>' }}
        />
    );
}
