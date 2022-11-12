import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AppContainer from './src/components/app-container';
import Main from './src/screens/main-screen';
import Navigator from './src/';

export default function App() {
	return (
		<AppContainer>
			<Navigator />
		</AppContainer>
	);
}
