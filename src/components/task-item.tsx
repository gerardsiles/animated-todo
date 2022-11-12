import React, { useCallback, useState } from 'react';
import {
	Pressable,
	NativeSyntheticEvent,
	TextInputChangeEventData,
} from 'react-native';
import {
	Box,
	useTheme,
	themeTools,
	useColorModeValue,
	Icon,
	Input,
	HStack,
} from 'native-base';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';
import AnimatedTaskLabel from './animated-task-label';
import SwipableView from './swipable-view';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
	isEditting: boolean;
	isDone: boolean;
	onToggleCheckbox?: () => void;
	onPressLabel?: () => void;
	onRemove?: () => void;
	onChangeSubject?: (subject: string) => void;
	onFinishEditing?: () => void;
	subject: string;
}

function TaskItem(props: Props) {
	const {
		isEditting,
		isDone,
		onToggleCheckbox,
		subject,
		onPressLabel,
		onRemove,
		onChangeSubject,
		onFinishEditing,
		simultaneousHandlers,
	} = props;

	const theme = useTheme();
	const [checked, setChecked] = useState<boolean>(false);

	const handleCheckboxPress = () => {
		setChecked(prev => {
			return !prev;
		});
	};

	const highlightColor = themeTools.getColor(
		theme,
		useColorModeValue('blue.500', 'blue.400')
	);
	const boxStroke = themeTools.getColor(
		theme,
		useColorModeValue('muted.300', 'blue.500')
	);
	const checkmarkColor = themeTools.getColor(
		theme,
		useColorModeValue('white', 'white')
	);
	const activeTextColor = themeTools.getColor(
		theme,
		useColorModeValue('darkText', 'lightText')
	);
	const doneTextColor = themeTools.getColor(
		theme,
		useColorModeValue('muted.400', 'muted.600')
	);

	const handleChangeSubject = useCallback(
		(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
			onChangeSubject && onChangeSubject(e.nativeEvent.text);
		},
		[onChangeSubject]
	);

	return (
		<SwipableView
			simultaneousHandlers={simultaneousHandlers}
			onSwipeLeft={onRemove}
			backView={
				<Box
					w='full'
					h='full'
					bg='red.500'
					alignItems='flex-end'
					justifyContent='center'
					pr={4}
				>
					<Icon color='white' as={<Feather name='trash-2' />} />
				</Box>
			}
		>
			<HStack
				alignItems='center'
				w='full'
				px={4}
				py={2}
				bg={useColorModeValue('warmGray.50', 'primary.900')}
			>
				<Box width={30} height={30} mr={2}>
					<Pressable onPress={onToggleCheckbox}>
						<AnimatedCheckbox
							checked={isDone}
							highlightColor={highlightColor}
							checkmarkColor={checkmarkColor}
							boxOutlineColor={boxStroke}
						/>
					</Pressable>
				</Box>
				{isEditting ? (
					<Input
						placeholder='Task'
						value={subject}
						variant='unstyled'
						fontSize={19}
						px={1}
						py={0}
						autoFocus
						blurOnSubmit
						onChange={handleChangeSubject}
						onBlur={onFinishEditing}
					/>
				) : (
					<AnimatedTaskLabel
						strikethrough={isDone}
						textColor={activeTextColor}
						inactiveTextColor={doneTextColor}
						onPress={onPressLabel}
					>
						{subject}
					</AnimatedTaskLabel>
				)}
			</HStack>
		</SwipableView>
	);
}
export default TaskItem;
