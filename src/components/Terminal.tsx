import type * as Xterm from "@xterm/xterm"
import "@xterm/xterm/css/xterm.css"

export const Terminal = (props: {
	options: ConstructorParameters<typeof Xterm.Terminal>[0]
	onMount: (terminal: Xterm.Terminal) => void
}) => <div ref={async div => {
	const Xterm = await import("@xterm/xterm")
	const terminal = new Xterm.Terminal(props.options)

	terminal.open(div)
	props.onMount(terminal)
}}/>
