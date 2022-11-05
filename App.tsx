import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AppContainer from './src/components/app-container';
import Main from './src/screens/main';

export default function App() {
	return (
		<AppContainer>
			<Main />
		</AppContainer>
	);
}
