import type Xterm from "@xterm/xterm"
import { createSignal, type JSX } from "solid-js"
import { Terminal } from "~/components/Terminal"

const Code = (props: { children: JSX.Element }) => <code
	style={{ "background-color": "#070f4a", "border-radius": ".375rem", padding: "2px 4px" }}
>{props.children}</code>

const Table = (props: { columns: number, children: JSX.Element }) =>
	<div style={{
		display: "grid",
		gap: "0 1rem",
		"max-height": "75vh",
		"grid-template-columns": `repeat(${props.columns}, max-content)`
	}}>{props.children}</div>

const Row = (props: { name: string, children: JSX.Element }) => <>
	<div style={{ margin: "4px 0" }}><Code>{props.name}</Code></div>
	<div style={{ margin: "4px 0" }}>=</div>
	<div style={{ margin: "4px 0" }}>{props.children}</div>
</>

export default () => {
	const [ getCharacterCode, setCharacterCode ] = createSignal(65)
	let terminal!: Xterm.Terminal
	let textArea!: HTMLTextAreaElement

	return <>
		<a href="https://github.com/samualtnorman/ansi-docs" target="_blank" rel="noopener noreferrer">Contribute</a>

		<h1>ANSI Escape Code Docs</h1>

		<Table columns={3}>
			<Row name="EndOfText"><Code>U+0003</Code></Row>
			<Row name="Backspace"><Code>U+0008</Code></Row>
			<Row name="Escape"><Code>U+001B</Code></Row>
			<Row name="Delete"><Code>U+007F</Code></Row>
			<Row name="CSI"><Code>Escape</Code> <Code>[</Code></Row>
		</Table>

		<h2>Move Cursor</h2>
		<p>The amount is optional. When missing or <Code>0</Code> it defaults to 1.</p>

		<Table columns={3}>
			<Row name="CursorUp"><Code>CSI</Code> [amount] <Code>A</Code></Row>
			<Row name="CursorDown"><Code>CSI</Code> [amount] <Code>B</Code></Row>
			<Row name="CursorRight"><Code>CSI</Code> [amount] <Code>C</Code></Row>
			<Row name="CursorLeft"><Code>CSI</Code> [amount] <Code>D</Code></Row>
		</Table>

		<textarea cols="30" rows="4" ref={textArea}>
			terminal.write("abc" + CSI + "2D")
		</textarea>

		<button onClick={() => {
			new Function("terminal", "Escape", "CSI", textArea.value)(terminal, "\x1B", "\x1B[")
		}}>Run</button>

		<Terminal options={{ rows: 4 }} onMount={terminal_ => {
			terminal = terminal_
			terminal.onData(data => console.log(JSON.stringify(data)))
		}}/>

		<h2>Set Mode</h2>
		<h3>Insert Mode</h3>
		<p>Insert mode lets insert text between other text instead of overwriting it.</p>

		<Table columns={3}>
			<Row name="SetInsertMode"><Code>CSI</Code> <Code>4</Code> <Code>h</Code></Row>
		</Table>

		<h2>Reset Mode</h2>

		<Table columns={3}>
			<Row name="ResetInsertMode"><Code>CSI</Code> <Code>4</Code> <Code>l</Code></Row>
		</Table>

		<h2>Stupid Byte Format Translator</h2>

		<input
			maxLength={2}
			value={getCharacterCode().toString(16).toUpperCase().padStart(2, "0")}
			onKeyUp={({ currentTarget: { value } }) => value.length == 2 && setCharacterCode(parseInt(value, 16))}
		/>

		<input
			type="number"
			value={getCharacterCode()}
			onKeyUp={event => setCharacterCode(Number(event.currentTarget.value))}
			onChange={event => setCharacterCode(Number(event.currentTarget.value))}
		/>

		<input
			value={`${(getCharacterCode() >> 4).toString().padStart(2, "0")}/${(getCharacterCode() & 0xF).toString().padStart(2, "0")}`}
			onKeyUp={event => {
				if (/\d\d\/\d\d/.test(event.currentTarget.value)) {
					const [ first, second ] = event.currentTarget.value.split("/")
					setCharacterCode((Number(first) << 4) | Number(second))
				}
			}}
		/>

		<input value={String.fromCharCode(getCharacterCode())} maxLength={1} onKeyUp={event => {
			if (event.currentTarget.value)
				setCharacterCode(event.currentTarget.value.charCodeAt(0))
		}}/>
	</>
}
