import {useState, useEffect} from 'react';
import React from 'react';
import {Text, Box, Newline, Spacer, Static, Transform} from 'ink';

const HangingIndent = ({indent = 4, children}) => (
	<Transform
		transform={(line, index) =>
			index === 0 ? line : ' '.repeat(indent) + line
		}
	>
		{children}
	</Transform>
);

const text =
	'WHEN I WROTE the following pages, or rather the bulk of them, ' +
	'I lived alone, in the woods, a mile from any neighbor, in a ' +
	'house which I had built myself, on the shore of Walden Pond, ' +
	'in Concord, Massachusetts, and earned my living by the labor ' +
	'of my hands only. I lived there two years and two months. At ' +
	'present I am a sojourner in civilized life again.';

export default function App({name = 'World'}) {
	const [tests, setTests] = useState([]);

	useEffect(() => {
		let completedTests = 0;
		let timer;

		const run = () => {
			// Fake 10 completed tests
			if (completedTests++ < 10) {
				setTests(previousTests => [
					...previousTests,
					{
						id: previousTests.length,
						title: `Test #${previousTests.length + 1}`
					}
				]);

				timer = setTimeout(run, 100);
			}
		};

		run();

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			<Text>
				Hello, <Text color="green">{name}</Text>
			</Text>

			<Spacer />

			<Static items={tests}>
				{test => (
					<Box key={test.id}>
						<Text color="green">✔ {test.title}</Text>
					</Box>
				)}
			</Static>

			<Transform transform={output => output.toUpperCase()}>
				<Text>Hello World</Text>
			</Transform>

			{/* This part keeps updating as state changes */}
			<Box marginTop={1}>
				<Text dimColor>Completed tests: {tests.length}</Text>
			</Box>

				<HangingIndent indent={4}>
					{text}
				</HangingIndent>

			<Newline />

			<Box
				borderStyle={{
					topLeft: '↘',
					top: '↓',
					topRight: '↙',
					left: '→',
					bottomLeft: '↗',
					bottom: '↑',
					bottomRight: '↖',
					right: '←',
				}}
			>
				<Text>Custom</Text>
			</Box>
		</>
	);
}
