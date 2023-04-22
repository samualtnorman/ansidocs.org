import { onMount } from "solid-js"
import * as Xterm from "xterm"
import "xterm/css/xterm.css"

export const Terminal = (props: {
	options: ConstructorParameters<typeof Xterm.Terminal>[0]
	onMount: (terminal: Xterm.Terminal) => void
}) => {
	let div!: HTMLDivElement

	onMount(() => {
		const terminal = new Xterm.Terminal(props.options)

		terminal.open(div)
		props.onMount(terminal)
	})

	return <div ref={div}/>
}
